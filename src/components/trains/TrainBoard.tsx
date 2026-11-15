import { useEffect, useRef, useState } from "react";
import { createPainter } from "@matthewmincher/departure-board/paint";
import {
  createFramebuffer,
  detailText,
  hhmm,
  renderBoard,
  statusText,
  upcoming,
} from "@matthewmincher/departure-board/renderer";
import type { BoardData, Train } from "@matthewmincher/departure-board/types";

const POLL_MS = 30_000;
const FRAME_MS = 1000 / 30;
const LIST_REFRESH_MS = 5_000;

export default function TrainBoard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boardRef = useRef<BoardData | null>(null);
  const [board, setBoard] = useState<BoardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      if (document.hidden) return;
      try {
        const res = await fetch("/api/trains", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as BoardData;
        if (cancelled) return;
        boardRef.current = data;
        setBoard(data);
        setError(null);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Unknown error");
      }
    }

    const onVisibilityChange = () => {
      if (!document.hidden) poll();
    };

    poll();
    const id = setInterval(poll, POLL_MS);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      cancelled = true;
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const painter = createPainter(canvas);
    const fb = createFramebuffer();
    let raf = 0;
    let lastFrame = 0;
    const frame = (ts: number) => {
      if (ts - lastFrame >= FRAME_MS) {
        lastFrame = ts;
        painter.paint(renderBoard(fb, boardRef.current, Date.now()));
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    let width = 0;
    const observer = new ResizeObserver(([entry]) => {
      const w = Math.round(entry.contentRect.width);
      if (w === width) return;
      width = w;
      requestAnimationFrame(() => painter.resize());
    });
    observer.observe(container);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), LIST_REFRESH_MS);
    return () => clearInterval(id);
  }, []);

  const trains = board ? upcoming(board.trains, now) : [];

  return (
    <div>
      <div className="rounded-xl bg-linear-to-b from-zinc-800 to-zinc-900 p-3 sm:p-5 shadow-lg">
        <div className="rounded bg-[#050302] p-2 sm:p-3 shadow-[inset_0_2px_8px_rgba(0,0,0,0.9)]">
          <div className="aspect-[4/1] flex items-center justify-center">
            <canvas
              ref={canvasRef}
              role="img"
              aria-label="Departure board showing the next trains. The same trains are listed below."
              className="block w-0 h-0 [image-rendering:pixelated]"
            />
          </div>
        </div>
      </div>

      <StatusLine board={board} error={error} />

      <h2 className="font-display text-emerald-900 text-xl font-bold mt-10 mb-4">
        Coming up
      </h2>

      {!board && !error ? (
        <div className="flex items-center justify-center py-10">
          <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : trains.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          {board ? "No trains expected in the next two hours." : "Train information is unavailable right now."}
        </div>
      ) : (
        <ul className="bg-white border border-stone-200 rounded-xl divide-y divide-stone-200">
          {trains.map((train) => (
            <TrainRow key={train.id} train={train} now={now} />
          ))}
        </ul>
      )}
    </div>
  );
}

function StatusLine({ board, error }: { board: BoardData | null; error: string | null }) {
  const credit = (
    <>
      Data from{" "}
      <a
        href="https://www.realtimetrains.co.uk"
        className="text-emerald-600 hover:text-emerald-500 transition-colors"
      >
        Realtime Trains
      </a>
    </>
  );

  if (error && !board) {
    return (
      <>
        <div className="mt-4 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5">
          Couldn't load train information. It will try again shortly.
        </div>
        <p className="mt-3 text-sm text-gray-500">{credit}</p>
      </>
    );
  }

  const stale = Boolean(board?.stale || error);
  const parts = [
    board?.updatedAt ? `Updated ${hhmm(board.updatedAt)}` : null,
    board?.source === "junction" ? "includes freight and empty trains" : null,
  ].filter(Boolean);

  return (
    <p className={`mt-3 text-sm ${stale ? "text-amber-700" : "text-gray-500"}`}>
      {credit}
      {parts.map((part) => ` · ${part}`)}
      {stale ? " · couldn't refresh just now, showing the last update" : ""}
    </p>
  );
}

function TrainRow({ train, now }: { train: Train; now: number }) {
  const status = statusText(train, now);
  const highlight =
    train.cancelled || train.delayMinutes >= 1
      ? "text-amber-700"
      : status === "Due" || status === "Passing"
        ? "text-emerald-600"
        : "text-gray-500";

  return (
    <li className="grid grid-cols-[3.5rem_1fr_auto] gap-x-4 gap-y-0.5 px-5 py-3 tabular-nums">
      <time
        dateTime={train.scheduledPass}
        className={`font-semibold ${train.cancelled ? "line-through text-gray-400" : "text-gray-800"}`}
      >
        {hhmm(train.scheduledPass)}
      </time>
      <span className={`font-medium ${train.cancelled ? "line-through text-gray-400" : "text-gray-800"}`}>
        {train.kind && train.kind !== "Empty train" ? `${train.kind}: ` : ""}
        {train.destination}
      </span>
      <span className={`text-right text-sm font-medium ${highlight}`}>{status}</span>
      <span className="col-start-2 col-span-2 text-sm text-gray-500">{detailText(train)}</span>
    </li>
  );
}
