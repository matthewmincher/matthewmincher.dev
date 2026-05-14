export interface LastfmTrack {
  name: string;
  artist: string;
  nowPlaying: boolean;
  timestamp: number | null;
  imageUrl: string | null;
}

const LASTFM_USER = "matthewmincher";
const LASTFM_API_BASE = "https://ws.audioscrobbler.com/2.0/";

function extractImage(images: any[]): string | null {
  if (!Array.isArray(images)) return null;
  const extralarge = images.find((img: any) => img.size === "extralarge");
  const url = extralarge?.["#text"] || images[images.length - 1]?.["#text"];
  return url || null;
}

function parseTracks(rawTracks: any[], count: number): LastfmTrack[] {
  return rawTracks.slice(0, count).map((track: any) => ({
    name: track.name,
    artist: track.artist["#text"],
    nowPlaying: track["@attr"]?.nowplaying === "true",
    timestamp: track.date ? parseInt(track.date.uts, 10) : null,
    imageUrl: extractImage(track.image),
  }));
}

export async function getRecentTracks(
  count = 10,
): Promise<LastfmTrack[]> {
  const apiKey = import.meta.env.LASTFM_API_KEY;
  if (!apiKey) return [];

  const url = `${LASTFM_API_BASE}?method=user.getrecenttracks&user=${LASTFM_USER}&api_key=${apiKey}&format=json&limit=${count}`;

  try {
    const response = await fetch(url);
    if (!response.ok) return [];

    const data = await response.json();
    const rawTracks = data.recenttracks?.track ?? [];

    return parseTracks(rawTracks, count);
  } catch {
    return [];
  }
}
