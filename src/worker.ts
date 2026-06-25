declare const caches: CacheStorage & { default: Cache };

interface Env {
  LASTFM_API_KEY: string;
  INFLUXDB_TOKEN: string;
  INFLUXDB_ORG: string;
}

const LASTFM_USER = "matthewmincher";
const LASTFM_API_BASE = "https://ws.audioscrobbler.com/2.0/";
const CACHE_TTL_SECONDS = 120;

const INFLUXDB_URL = "https://eu-central-1-1.aws.cloud2.influxdata.com";
const INFLUXDB_BUCKET = "home-climate";

const RANGE_CONFIG: Record<
  string,
  { fluxRange: string; aggregate?: string; cacheTTL: number; compareRange?: string; compareStop?: string }
> = {
  "1h": { fluxRange: "-1h", cacheTTL: 300, compareRange: "-2h", compareStop: "-1h" },
  "24h": { fluxRange: "-24h", cacheTTL: 600, compareRange: "-48h", compareStop: "-24h" },
  "7d": { fluxRange: "-7d", aggregate: "30m", cacheTTL: 1800, compareRange: "-14d", compareStop: "-7d" },
  "30d": { fluxRange: "-30d", aggregate: "1h", cacheTTL: 3600 },
};

interface ClimateDataPoint {
  time: string;
  entityId: string;
  deviceClass: string;
  value: number;
}

interface ForecastData {
  temperature: number | null;
  humidity: number | null;
  windSpeed: number | null;
  uvIndex: number | null;
  condition: string | null;
  time: string | null;
}

function buildFluxQuery(range: string, start: string, stop?: string): string {
  const config = RANGE_CONFIG[range];
  const stopClause = stop ? `, stop: ${stop}` : "";

  let query = `from(bucket: "${INFLUXDB_BUCKET}")
  |> range(start: ${start}${stopClause})
  |> filter(fn: (r) => r._field == "value")
  |> filter(fn: (r) => r._measurement == "°C" or r._measurement == "%")
  |> filter(fn: (r) => r.domain == "sensor")`;

  if (config.aggregate) {
    query += `\n  |> aggregateWindow(every: ${config.aggregate}, fn: mean, createEmpty: false)`;
  }

  return query;
}

function buildForecastQuery(): string {
  return `from(bucket: "${INFLUXDB_BUCKET}")
  |> range(start: -24h)
  |> filter(fn: (r) => r.entity_id == "forecast_home")
  |> filter(fn: (r) => r.domain == "weather")
  |> filter(fn: (r) => r._field == "temperature" or r._field == "humidity" or r._field == "wind_speed" or r._field == "uv_index" or r._field == "state")
  |> last()`;
}

function parseForecastCSV(csv: string): ForecastData {
  const lines = csv.split("\n");
  const forecast: ForecastData = {
    temperature: null,
    humidity: null,
    windSpeed: null,
    uvIndex: null,
    condition: null,
    time: null,
  };
  let headers: string[] = [];

  for (const line of lines) {
    if (line.startsWith("#") || line.trim() === "") {
      if (line.trim() === "") headers = [];
      continue;
    }

    const values = line.split(",");

    if (headers.length === 0) {
      headers = values.map((h) => h.trim());
      continue;
    }

    const row: Record<string, string> = {};
    headers.forEach((h, i) => {
      row[h] = values[i]?.trim() ?? "";
    });

    const field = row["_field"];
    const value = row["_value"];
    const time = row["_time"];

    if (time) forecast.time = time;

    switch (field) {
      case "temperature":
        forecast.temperature = parseFloat(value);
        break;
      case "humidity":
        forecast.humidity = parseFloat(value);
        break;
      case "wind_speed":
        forecast.windSpeed = parseFloat(value);
        break;
      case "uv_index":
        forecast.uvIndex = parseFloat(value);
        break;
      case "state":
        forecast.condition = value;
        break;
    }
  }

  return forecast;
}

function parseFluxCSV(csv: string): ClimateDataPoint[] {
  const lines = csv.split("\n");
  const points: ClimateDataPoint[] = [];
  let headers: string[] = [];

  for (const line of lines) {
    if (line.startsWith("#") || line.trim() === "") {
      if (line.trim() === "") headers = [];
      continue;
    }

    const values = line.split(",");

    if (headers.length === 0) {
      headers = values.map((h) => h.trim());
      continue;
    }

    const row: Record<string, string> = {};
    headers.forEach((h, i) => {
      row[h] = values[i]?.trim() ?? "";
    });

    const time = row["_time"];
    const value = parseFloat(row["_value"]);
    const entityId = row["entity_id"];
    const measurement = row["_measurement"];
    const deviceClass =
      measurement === "°C" ? "temperature" : measurement === "%" ? "humidity" : null;

    if (time && !isNaN(value) && entityId && deviceClass) {
      points.push({ time, entityId, deviceClass, value });
    }
  }

  return points;
}

async function queryInfluxDB(env: Env, query: string): Promise<string> {
  const url = `${INFLUXDB_URL}/api/v2/query?org=${encodeURIComponent(env.INFLUXDB_ORG)}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Token ${env.INFLUXDB_TOKEN}`,
      "Content-Type": "application/vnd.flux",
      Accept: "application/csv",
    },
    body: query,
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`InfluxDB query failed (${res.status}): ${body.slice(0, 200)}`);
  }

  return res.text();
}

async function handleClimate(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
): Promise<Response> {
  const cache = caches.default;
  const cacheKey = new Request(new URL(request.url).toString());

  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const url = new URL(request.url);
  const range = url.searchParams.get("range") || "24h";
  const compare = url.searchParams.get("compare") === "true";

  const config = RANGE_CONFIG[range];
  if (!config) {
    return Response.json({ error: "Invalid range" }, { status: 400 });
  }

  if (!env.INFLUXDB_TOKEN || !env.INFLUXDB_ORG) {
    return Response.json(
      { error: "InfluxDB not configured", detail: `token=${!!env.INFLUXDB_TOKEN}, org=${!!env.INFLUXDB_ORG}` },
      { status: 503 },
    );
  }

  try {
    const currentQuery = buildFluxQuery(range, config.fluxRange);
    const currentCSV = await queryInfluxDB(env, currentQuery);
    const current = parseFluxCSV(currentCSV);

    let previous: ClimateDataPoint[] | null = null;
    if (compare && config.compareRange && config.compareStop) {
      const previousQuery = buildFluxQuery(range, config.compareRange, config.compareStop);
      const previousCSV = await queryInfluxDB(env, previousQuery);
      previous = parseFluxCSV(previousCSV);
    }

    const body = JSON.stringify({ current, previous });
    const response = new Response(body, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": `public, s-maxage=${config.cacheTTL}`,
      },
    });

    ctx.waitUntil(cache.put(cacheKey, response.clone()));
    return response;
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return Response.json({ error: "Failed to fetch climate data", detail: message }, { status: 502 });
  }
}

async function handleForecast(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
): Promise<Response> {
  const cache = caches.default;
  const cacheKey = new Request(new URL(request.url).toString());

  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  if (!env.INFLUXDB_TOKEN || !env.INFLUXDB_ORG) {
    return Response.json(
      { error: "InfluxDB not configured" },
      { status: 503 },
    );
  }

  try {
    const query = buildForecastQuery();
    const csv = await queryInfluxDB(env, query);
    const forecast = parseForecastCSV(csv);

    const body = JSON.stringify(forecast);
    const response = new Response(body, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=600",
      },
    });

    ctx.waitUntil(cache.put(cacheKey, response.clone()));
    return response;
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return Response.json({ error: "Failed to fetch forecast", detail: message }, { status: 502 });
  }
}

async function handleLastfm(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
): Promise<Response> {
  const cache = caches.default;
  const cacheKey = new Request(new URL(request.url).toString());

  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const apiKey = env.LASTFM_API_KEY;
  if (!apiKey) {
    return Response.json({ tracks: [] });
  }

  const url = `${LASTFM_API_BASE}?method=user.getrecenttracks&user=${LASTFM_USER}&api_key=${apiKey}&format=json&limit=10`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      return Response.json({ tracks: [] });
    }

    const data: any = await res.json();
    const rawTracks = data.recenttracks?.track ?? [];

    const tracks = rawTracks.slice(0, 10).map((track: any) => {
      const images = track.image;
      const extralarge = Array.isArray(images)
        ? images.find((img: any) => img.size === "extralarge")
        : null;
      const imageUrl =
        extralarge?.["#text"] ||
        (Array.isArray(images)
          ? images[images.length - 1]?.["#text"]
          : null) ||
        null;

      return {
        name: track.name,
        artist: track.artist["#text"],
        nowPlaying: track["@attr"]?.nowplaying === "true",
        timestamp: track.date ? parseInt(track.date.uts, 10) : null,
        imageUrl,
      };
    });

    const response = new Response(JSON.stringify({ tracks }), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": `public, s-maxage=${CACHE_TTL_SECONDS}`,
      },
    });

    ctx.waitUntil(cache.put(cacheKey, response.clone()));
    return response;
  } catch {
    return Response.json({ tracks: [] });
  }
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === "/api/lastfm" && request.method === "GET") {
      return handleLastfm(request, env, ctx);
    }

    if (pathname === "/api/climate" && request.method === "GET") {
      return handleClimate(request, env, ctx);
    }

    if (pathname === "/api/forecast" && request.method === "GET") {
      return handleForecast(request, env, ctx);
    }

    return new Response("Not Found", { status: 404 });
  },
} satisfies ExportedHandler<Env>;
