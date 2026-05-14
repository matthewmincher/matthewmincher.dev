import { useState, useEffect } from "react";
import type { LastfmTrack } from "../data/lastfm";

interface Props {
  initialTracks: LastfmTrack[];
}

function timeAgo(timestamp: number): string {
  const seconds = Math.floor(Date.now() / 1000 - timestamp);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function EqBars() {
  return (
    <div className="flex items-end gap-[2px] h-3">
      <style>{`
        @keyframes eq1 { 0%,100% { height: 30%; } 50% { height: 100%; } }
        @keyframes eq2 { 0%,100% { height: 60%; } 30% { height: 20%; } 70% { height: 90%; } }
        @keyframes eq3 { 0%,100% { height: 50%; } 40% { height: 100%; } 80% { height: 25%; } }
      `}</style>
      <span className="w-[2px] rounded-full bg-emerald-400" style={{ animation: "eq1 0.8s ease-in-out infinite" }} />
      <span className="w-[2px] rounded-full bg-emerald-400" style={{ animation: "eq2 0.7s ease-in-out infinite" }} />
      <span className="w-[2px] rounded-full bg-emerald-400" style={{ animation: "eq3 0.9s ease-in-out infinite" }} />
    </div>
  );
}

export default function RecentListens({ initialTracks }: Props) {
  const [tracks, setTracks] = useState(initialTracks);
  const [, setTick] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    const poll = async () => {
      try {
        const res = await fetch("/api/lastfm");
        if (res.ok) {
          const data = await res.json();
          if (data.tracks?.length) setTracks(data.tracks);
        }
      } catch {}
    };

    const startPolling = () => {
      poll();
      interval = setInterval(poll, 3 * 60 * 1000);
    };

    const events = ["scroll", "mousemove", "click", "keydown", "touchstart"];
    const onInteraction = () => {
      events.forEach((e) => window.removeEventListener(e, onInteraction));
      startPolling();
    };
    events.forEach((e) =>
      window.addEventListener(e, onInteraction, { once: true, passive: true }),
    );

    return () => {
      events.forEach((e) => window.removeEventListener(e, onInteraction));
      if (interval) clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTick((t) => t + 1), 60_000);
    return () => clearInterval(timer);
  }, []);

  if (tracks.length === 0) return null;

  const leftCol = tracks.slice(0, 5);
  const rightCol = tracks.slice(5);

  function TrackRow({ track, i }: { track: LastfmTrack; i: number }) {
    return (
      <li className="flex items-center gap-3 py-1.5">
        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
          {track.imageUrl ? (
            <img src={track.imageUrl} alt="" loading="lazy" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <svg className="w-4 h-4 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
              </svg>
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-gray-700 text-sm font-medium truncate">{track.name}</p>
          <p className="text-gray-400 text-xs truncate">{track.artist}</p>
        </div>
        <span className="text-gray-400 text-xs whitespace-nowrap shrink-0">
          {track.nowPlaying ? (
            <span className="flex items-center gap-1.5 text-emerald-500 font-medium">
              <EqBars />
              Now
            </span>
          ) : track.timestamp ? (
            timeAgo(track.timestamp)
          ) : ""}
        </span>
      </li>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12">
        <ul className="space-y-1">
          {leftCol.map((track, i) => (
            <TrackRow key={`${track.name}-${track.artist}-${i}`} track={track} i={i} />
          ))}
        </ul>
        {rightCol.length > 0 && (
          <ul className="hidden md:block space-y-1">
            {rightCol.map((track, i) => (
              <TrackRow key={`${track.name}-${track.artist}-${i}`} track={track} i={i} />
            ))}
          </ul>
        )}
      </div>
      <a
        href="https://www.last.fm/user/matthewmincher"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1 mt-3 text-sm text-emerald-600 hover:text-emerald-500 transition-colors"
      >
        See more on Last.fm
        <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 3l5 5-5 5" />
        </svg>
      </a>
    </div>
  );
}
