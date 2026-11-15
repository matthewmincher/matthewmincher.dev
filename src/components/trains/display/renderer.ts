// Draws the departure board into a 256x64, 16-level greyscale framebuffer —
// the same geometry as the SSD1322 OLED panels used for DIY UK station boards.
// No DOM dependencies: the simulator, the website and the Pis all use this.

import { GLYPH_HEIGHT, measureText, rasterise } from './font.ts';
import type { BoardData, Train } from './types.ts';

export const WIDTH = 256;
export const HEIGHT = 64;
export const MAX_LEVEL = 15;

/** One byte per pixel, 0 (off) to MAX_LEVEL, row-major. */
export type Framebuffer = Uint8Array;

/** The parts of the API response the renderer needs. */
export type RenderableBoard = Pick<BoardData, 'title' | 'trains' | 'error'>;

const ROW_Y = [1, 12, 23, 34] as const;
const CLOCK_Y = 47;
const SCROLL_PX_PER_SEC = 32;
const SCROLL_PAUSE_MS = 2500;
const ALTERNATE_MS = 5000;
const DUE_WINDOW_MS = 60_000;
const DROP_AFTER_MS = 90_000; // keep showing a train for a while as it passes

const clockFmt = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/London',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
});
const hhmmFmt = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/London',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

export function createFramebuffer(): Framebuffer {
  return new Uint8Array(WIDTH * HEIGHT);
}

/** HH:MM in UK time. */
export function hhmm(iso: string): string {
  return hhmmFmt.format(new Date(iso));
}

interface TextOptions {
  scale?: number;
  level?: number;
}

function drawText(fb: Framebuffer, text: string, x: number, y: number, { scale = 1, level = MAX_LEVEL }: TextOptions = {}) {
  return rasterise(text, x, y, scale, (px, py) => {
    if (px < 0 || px >= WIDTH || py < 0 || py >= HEIGHT) return;
    fb[py * WIDTH + px] = level;
  });
}

function drawTextRight(fb: Framebuffer, text: string, right: number, y: number, opts?: TextOptions) {
  drawText(fb, text, right - measureText(text, opts?.scale), y, opts);
}

function drawTextCentred(fb: Framebuffer, text: string, y: number, opts?: TextOptions) {
  drawText(fb, text, Math.round((WIDTH - measureText(text, opts?.scale)) / 2), y, opts);
}

/** Truncate text to fit `maxWidth` pixels. */
function fit(text: string, maxWidth: number): string {
  if (measureText(text) <= maxWidth) return text;
  let t = text;
  while (t.length > 1 && measureText(`${t}.`) > maxWidth) t = t.slice(0, -1);
  return `${t.trimEnd()}.`;
}

const ORDINALS = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th'];

/** Status text shown at the right of a train's row. */
export function statusText(train: Train, now: number): string {
  if (train.cancelled) return 'Cancelled';
  const delta = Date.parse(train.expectedPass) - now;
  if (delta <= 0 && delta > -DROP_AFTER_MS) return 'Passing';
  if (delta <= DUE_WINDOW_MS) return 'Due';
  if (train.delayMinutes >= 1) return `Exp ${hhmm(train.expectedPass)}`;
  return 'On time';
}

/** Trains still to come (or passing right now) at `now`, soonest first. */
export function upcoming(trains: Train[], now: number): Train[] {
  return trains
    .filter((t) => {
      // expectedPass becomes the actual time once Network Rail reports it.
      const when = Date.parse(t.cancelled ? t.scheduledPass : t.expectedPass);
      return when > now - DROP_AFTER_MS;
    })
    .sort((a, b) => Date.parse(a.expectedPass) - Date.parse(b.expectedPass));
}

/** The scrolling second line for the first train. */
export function detailText(train: Train): string {
  let route: string;
  if (train.direction === 'west') route = `Westbound to ${train.destination}`;
  else if (train.direction === 'east' && train.destination === 'Chester') route = 'Eastbound, terminating at Chester';
  else if (train.direction === 'east') route = `Eastbound into Chester, then on to ${train.destination}`;
  else route = `To ${train.destination}`;

  const parts: (string | null)[] = [train.kind ? `${train.kind} ${train.headcode ?? ''}`.trim() : null, route];
  if (train.operator) parts.push(train.operator);
  if (train.origin) parts.push(`from ${train.origin}`);
  if (train.vehicles) parts.push(`${train.vehicles} coaches`);
  if (train.chesterTime) {
    const verb = train.direction === 'west' ? 'leaves Chester' : 'arrives Chester';
    const plat = train.platform ? ` plat ${train.platform}` : '';
    parts.push(`${verb}${plat} at ${hhmm(train.chesterTime)}`);
  }
  if (train.cancelled && train.reason) parts.push(train.reason);
  else if (train.delayMinutes >= 1 && train.reason) parts.push(`delayed: ${train.reason}`);
  return parts.filter(Boolean).join('  ·  ');
}

function drawTrainRow(fb: Framebuffer, train: Train, index: number, y: number, now: number) {
  drawText(fb, ORDINALS[index] ?? `${index + 1}th`, 0, y);
  drawText(fb, hhmm(train.scheduledPass), 20, y);
  const status = statusText(train, now);
  drawTextRight(fb, status, WIDTH, y);
  // Freight and empty trains aren't on real station boards; show them dimmer.
  const label = train.kind && train.kind !== 'Empty train' ? `${train.kind}: ${train.destination}` : train.destination;
  drawText(fb, fit(label, WIDTH - measureText(status) - 4 - 50), 50, y, { level: train.kind ? 9 : MAX_LEVEL });
}

function drawScrollingDetail(fb: Framebuffer, text: string, y: number, elapsedMs: number) {
  const width = measureText(text);
  if (width <= WIDTH) {
    drawText(fb, text, 0, y, { level: 10 });
    return;
  }
  // Pause, scroll fully off the left, then start again from the right.
  const travel = width + WIDTH;
  const cycleMs = SCROLL_PAUSE_MS + (travel / SCROLL_PX_PER_SEC) * 1000;
  const t = elapsedMs % cycleMs;
  const offset = t < SCROLL_PAUSE_MS ? 0 : ((t - SCROLL_PAUSE_MS) / 1000) * SCROLL_PX_PER_SEC;
  let x = Math.round(-offset);
  if (x < -width) x += travel;
  drawText(fb, text, x, y, { level: 10 });
}

function drawClock(fb: Framebuffer, now: number) {
  const [h, m, s] = clockFmt.format(new Date(now)).split(':');
  const big = `${h}:${m}`;
  const bigW = measureText(big, 2);
  const smallW = measureText(`:${s}`);
  const x = Math.round((WIDTH - bigW - 1 - smallW) / 2);
  drawText(fb, big, x, CLOCK_Y, { scale: 2 });
  // Small seconds, bottom-aligned with the big digits.
  drawText(fb, `:${s}`, x + bigW + 1, CLOCK_Y + GLYPH_HEIGHT - 1);
}

/** Render one frame at time `now` (epoch ms). `board` is null until data arrives. */
export function renderBoard(fb: Framebuffer, board: RenderableBoard | null, now: number): Framebuffer {
  fb.fill(0);
  drawClock(fb, now);

  if (!board) {
    drawTextCentred(fb, 'Connecting...', ROW_Y[1]);
    return fb;
  }

  const trains = upcoming(board.trains, now);
  if (trains.length === 0) {
    drawTextCentred(fb, board.title, ROW_Y[0]);
    drawTextCentred(fb, board.error ? 'Train information unavailable' : 'No trains expected', ROW_Y[2]);
    return fb;
  }

  drawTrainRow(fb, trains[0], 0, ROW_Y[0], now);
  drawScrollingDetail(fb, detailText(trains[0]), ROW_Y[1], now);
  if (trains[1]) drawTrainRow(fb, trains[1], 1, ROW_Y[2], now);
  if (trains[2]) {
    // Like real boards, the last row cycles through the later trains.
    const later = trains.slice(2, 5);
    const i = Math.floor(now / ALTERNATE_MS) % later.length;
    drawTrainRow(fb, later[i], i + 2, ROW_Y[3], now);
  }
  return fb;
}
