// Browser-only: paints a framebuffer onto a <canvas> so it looks like an amber
// OLED panel. Used by the simulator and the website; the Pis use a hardware
// driver instead.

import { type Framebuffer, HEIGHT, MAX_LEVEL, WIDTH } from './renderer.ts';

const ON = [255, 176, 32]; // amber
const OFF = 'rgb(22, 13, 4)';

export interface Painter {
  /** Re-measure the canvas's container; call when it changes size. */
  resize(): void;
  paint(fb: Framebuffer): void;
}

function context2d(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D is not available');
  return ctx;
}

function makeCanvas(width: number, height: number): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = width;
  c.height = height;
  return c;
}

/** Sizes the canvas to the widest whole-pixel scale that fits its parent. */
export function createPainter(canvas: HTMLCanvasElement): Painter {
  const ctx = context2d(canvas);
  const glowCanvas = makeCanvas(0, 0);
  const glowCtx = context2d(glowCanvas);
  let pitch = 0;
  let background = makeCanvas(0, 0);
  let sprites: HTMLCanvasElement[] = [];

  function resize() {
    const parent = canvas.parentElement;
    if (!parent) return;
    const dpr = window.devicePixelRatio || 1;
    const style = getComputedStyle(parent);
    const cssWidth = parent.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    pitch = Math.max(2, Math.floor((cssWidth * dpr) / WIDTH));
    canvas.width = WIDTH * pitch;
    canvas.height = HEIGHT * pitch;
    canvas.style.width = `${canvas.width / dpr}px`;
    canvas.style.height = `${canvas.height / dpr}px`;
    glowCanvas.width = canvas.width;
    glowCanvas.height = canvas.height;

    // Gap between LEDs. At small sizes (phones) a gap leaves most of each dot
    // dark and the whole board dim, so only show it from 4px per LED up.
    const gap = pitch >= 4 ? Math.max(1, Math.round(pitch * 0.18)) : 0;
    const dot = pitch - gap;
    const radius = dot * 0.28;

    background = makeCanvas(canvas.width, canvas.height);
    const bg = context2d(background);
    bg.fillStyle = '#050302';
    bg.fillRect(0, 0, background.width, background.height);
    bg.fillStyle = OFF;
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        bg.beginPath();
        bg.roundRect(x * pitch, y * pitch, dot, dot, radius);
        bg.fill();
      }
    }

    sprites = [];
    for (let level = 0; level <= MAX_LEVEL; level++) {
      const s = makeCanvas(pitch, pitch);
      const sc = context2d(s);
      const a = level / MAX_LEVEL;
      sc.fillStyle = `rgba(${ON[0]}, ${ON[1]}, ${ON[2]}, ${0.25 + 0.75 * a})`;
      sc.beginPath();
      sc.roundRect(0, 0, dot, dot, radius);
      sc.fill();
      sprites.push(s);
    }
  }

  function paint(fb: Framebuffer) {
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(background, 0, 0);
    glowCtx.clearRect(0, 0, glowCanvas.width, glowCanvas.height);
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        const level = fb[y * WIDTH + x];
        if (level) glowCtx.drawImage(sprites[level], x * pitch, y * pitch);
      }
    }
    // Soft bloom, then the crisp pixels on top.
    ctx.globalCompositeOperation = 'lighter';
    ctx.filter = `blur(${pitch * 0.9}px)`;
    ctx.globalAlpha = 0.55;
    ctx.drawImage(glowCanvas, 0, 0);
    ctx.filter = 'none';
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(glowCanvas, 0, 0);
  }

  resize();
  return { resize, paint };
}
