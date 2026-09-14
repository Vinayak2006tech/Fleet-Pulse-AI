"use client";

import React from "react";

// Interactive canvas trailing particle ribbon with complete TypeScript definitions

interface WaveOptions {
  phase?: number;
  offset?: number;
  frequency?: number;
  amplitude?: number;
}

class WaveGenerator {
  phase: number;
  offset: number;
  frequency: number;
  amplitude: number;

  constructor(options: WaveOptions = {}) {
    this.phase = options.phase || 0;
    this.offset = options.offset || 0;
    this.frequency = options.frequency || 0.001;
    this.amplitude = options.amplitude || 1;
  }

  update(): number {
    this.phase += this.frequency;
    return this.offset + Math.sin(this.phase) * this.amplitude;
  }
}

class ParticleNode {
  x: number = 0;
  y: number = 0;
  vx: number = 0;
  vy: number = 0;
}

interface RibbonLineOptions {
  spring?: number;
}

class RibbonLine {
  spring: number;
  friction: number;
  nodes: ParticleNode[];

  constructor(options: RibbonLineOptions = {}) {
    this.spring = (options.spring || 0.45) + 0.1 * Math.random() - 0.05;
    this.friction = config.friction + 0.01 * Math.random() - 0.005;
    this.nodes = [];
    for (let i = 0; i < config.size; i++) {
      const node = new ParticleNode();
      node.x = mousePos.x;
      node.y = mousePos.y;
      this.nodes.push(node);
    }
  }

  update(): void {
    const s = this.spring;
    const first = this.nodes[0];
    if (!first) return;

    first.vx += (mousePos.x - first.x) * s;
    first.vy += (mousePos.y - first.y) * s;

    let e = s;
    for (let i = 0; i < this.nodes.length; i++) {
      const current = this.nodes[i];
      if (i > 0) {
        const prev = this.nodes[i - 1];
        current.vx += (prev.x - current.x) * e;
        current.vy += (prev.y - current.y) * e;
        current.vx += prev.vx * config.dampening;
        current.vy += prev.vy * config.dampening;
      }
      current.vx *= this.friction;
      current.vy *= this.friction;
      current.x += current.vx;
      current.y += current.vy;
      e *= config.tension;
    }
  }

  draw(context: CanvasRenderingContext2D): void {
    if (this.nodes.length < 2) return;
    const first = this.nodes[0];
    let n = first.x;
    let i = first.y;

    context.beginPath();
    context.moveTo(n, i);

    let a = 1;
    const o = this.nodes.length - 2;
    for (; a < o; a++) {
      const current = this.nodes[a];
      const next = this.nodes[a + 1];
      n = 0.5 * (current.x + next.x);
      i = 0.5 * (current.y + next.y);
      context.quadraticCurveTo(current.x, current.y, n, i);
    }

    if (this.nodes.length > 2) {
      const current = this.nodes[a];
      const next = this.nodes[a + 1];
      if (current && next) {
        context.quadraticCurveTo(current.x, current.y, next.x, next.y);
      }
    }

    context.stroke();
    context.closePath();
  }
}

const config = {
  friction: 0.5,
  trails: 65,
  size: 45,
  dampening: 0.025,
  tension: 0.99,
};

let ctx: CanvasRenderingContext2D | null = null;
let waveGen: WaveGenerator | null = null;
const mousePos = { x: typeof window !== "undefined" ? window.innerWidth / 2 : 0, y: typeof window !== "undefined" ? window.innerHeight / 3 : 0 };
let lines: RibbonLine[] = [];
let isRunning = false;

function onPointerMove(e: MouseEvent | TouchEvent) {
  function initLines() {
    lines = [];
    for (let i = 0; i < config.trails; i++) {
      lines.push(new RibbonLine({ spring: 0.45 + (i / config.trails) * 0.025 }));
    }
  }

  function handleCoord(event: MouseEvent | TouchEvent) {
    if ("touches" in event && event.touches.length > 0) {
      mousePos.x = event.touches[0].pageX;
      mousePos.y = event.touches[0].pageY;
    } else if ("clientX" in event) {
      mousePos.x = event.clientX;
      mousePos.y = event.clientY;
    }
  }

  document.removeEventListener("mousemove", onPointerMove);
  document.removeEventListener("touchstart", onPointerMove);
  document.addEventListener("mousemove", handleCoord as EventListener);
  document.addEventListener("touchmove", handleCoord as EventListener);
  document.addEventListener("touchstart", handleCoord as EventListener);

  handleCoord(e);
  initLines();
  renderLoop();
}

function renderLoop() {
  if (!ctx || !isRunning) return;

  ctx.globalCompositeOperation = "source-over";
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.globalCompositeOperation = "source-over";

  const hue = waveGen ? Math.round(waveGen.update()) : 220;
  ctx.strokeStyle = `hsla(${hue}, 85%, 55%, 0.07)`;
  ctx.lineWidth = 6;

  for (let t = 0; t < config.trails; t++) {
    if (lines[t]) {
      lines[t].update();
      lines[t].draw(ctx);
    }
  }

  window.requestAnimationFrame(renderLoop);
}

function resizeCanvas() {
  if (ctx && ctx.canvas) {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
  }
}

export const renderCanvas = function (): void {
  if (typeof document === "undefined") return;
  const canvasEl = document.getElementById("canvas") as HTMLCanvasElement | null;
  if (!canvasEl) return;

  ctx = canvasEl.getContext("2d");
  if (!ctx) return;

  isRunning = true;
  waveGen = new WaveGenerator({
    phase: Math.random() * 2 * Math.PI,
    amplitude: 35,
    frequency: 0.002,
    offset: 220, // Electric blue / indigo hue
  });

  mousePos.x = window.innerWidth / 2;
  mousePos.y = window.innerHeight / 3;

  lines = [];
  for (let i = 0; i < config.trails; i++) {
    lines.push(new RibbonLine({ spring: 0.45 + (i / config.trails) * 0.025 }));
  }

  document.addEventListener("mousemove", onPointerMove as EventListener);
  document.addEventListener("touchstart", onPointerMove as EventListener);
  window.addEventListener("resize", resizeCanvas);

  window.addEventListener("focus", () => {
    if (!isRunning) {
      isRunning = true;
      renderLoop();
    }
  });

  window.addEventListener("blur", () => {
    isRunning = true;
  });

  resizeCanvas();
  renderLoop();
};

export const CanvasBackground: React.FC = () => {
  return (
    <canvas
      id="canvas"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-60 mix-blend-multiply"
    />
  );
};

