declare const caches: CacheStorage & { default: Cache };

interface Env {
  LASTFM_API_KEY: string;
}

interface PagesContext {
  request: Request;
  env: Env;
  waitUntil(promise: Promise<unknown>): void;
}

const LASTFM_USER = "matthewmincher";
const LASTFM_API_BASE = "https://ws.audioscrobbler.com/2.0/";
const CACHE_TTL_SECONDS = 120;

export async function onRequestGet(
  context: PagesContext,
): Promise<Response> {
  const cache = caches.default;
  const cacheKey = new Request(new URL(context.request.url).toString());

  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const apiKey = context.env.LASTFM_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ tracks: [] }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const url = `${LASTFM_API_BASE}?method=user.getrecenttracks&user=${LASTFM_USER}&api_key=${apiKey}&format=json&limit=10`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      return new Response(JSON.stringify({ tracks: [] }), {
        headers: { "Content-Type": "application/json" },
      });
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

    context.waitUntil(cache.put(cacheKey, response.clone()));

    return response;
  } catch {
    return new Response(JSON.stringify({ tracks: [] }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
