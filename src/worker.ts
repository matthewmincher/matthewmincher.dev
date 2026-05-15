declare const caches: CacheStorage & { default: Cache };

interface Env {
  LASTFM_API_KEY: string;
}

const LASTFM_USER = "matthewmincher";
const LASTFM_API_BASE = "https://ws.audioscrobbler.com/2.0/";
const CACHE_TTL_SECONDS = 120;

async function handleLastfm(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
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
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === "/api/lastfm" && request.method === "GET") {
      return handleLastfm(request, env, ctx);
    }

    return new Response("Not Found", { status: 404 });
  },
} satisfies ExportedHandler<Env>;
