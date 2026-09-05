"use client";

import { useEffect, useId, useState } from "react";

const CARD_W = 640;
const CARD_H = 400;
const FILL = 0.8;
const TILE = {
  cols: 8,
  rows: 8,
  gap: 8,
} as const;

const TILE_COUNT = TILE.cols * TILE.rows;
const START_HOT = 6 + 3 * TILE.cols;

function nextHotIndex(current: number, count: number) {
  if (count <= 1) return current;
  let next = current;
  while (next === current) {
    next = Math.floor(Math.random() * count);
  }
  return next;
}

const TILE_AREA = {
  w: CARD_W * FILL,
  h: CARD_H * FILL,
  x: (CARD_W * (1 - FILL)) / 2,
  y: (CARD_H * (1 - FILL)) / 2,
};

const TILE_W = (TILE_AREA.w - TILE.gap * (TILE.cols - 1)) / TILE.cols;
const TILE_H = (TILE_AREA.h - TILE.gap * (TILE.rows - 1)) / TILE.rows;

/**
 * Act 1 — second graphic, midground.
 * 64-tile compute field. Not a rack drawing.
 */
export function HardwareChassisPlate() {
  const uid = useId().replace(/:/g, "");
  const rail = `hw-rail-${uid}`;
  const mask = `hw-vis-${uid}`;
  const vis = `hw-vis-grad-${uid}`;
  const [hotIndex, setHotIndex] = useState(START_HOT);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const id = window.setInterval(() => {
      setHotIndex((current) => nextHotIndex(current, TILE_COUNT));
    }, 1600);

    return () => window.clearInterval(id);
  }, []);

  const tiles = Array.from({ length: TILE_COUNT }, (_, i) => {
    const col = i % TILE.cols;
    const row = Math.floor(i / TILE.cols);
    return {
      i,
      x: TILE_AREA.x + col * (TILE_W + TILE.gap),
      y: TILE_AREA.y + row * (TILE_H + TILE.gap),
      hot: i === hotIndex,
    };
  });

  return (
    <article
      aria-label="DGX-class server chassis"
      className="glass relative aspect-[16/10] overflow-hidden rounded-[1.5rem]"
    >
      <svg
        aria-hidden
        viewBox="0 0 640 400"
        className="pointer-events-none absolute inset-0 size-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={rail} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8f55fb" stopOpacity="0" />
            <stop offset="35%" stopColor="#8f55fb" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#5b50dd" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#8f55fb" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={vis} cx="70%" cy="40%" r="78%" gradientUnits="objectBoundingBox">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="42%" stopColor="white" stopOpacity="0.92" />
            <stop offset="70%" stopColor="white" stopOpacity="0.42" />
            <stop offset="100%" stopColor="white" stopOpacity="0.16" />
          </radialGradient>
          <radialGradient id={`${uid}-textfade`} cx="20%" cy="80%" r="46%" gradientUnits="objectBoundingBox">
            <stop offset="0%" stopColor="black" stopOpacity="0.42" />
            <stop offset="40%" stopColor="black" stopOpacity="0.2" />
            <stop offset="72%" stopColor="black" stopOpacity="0.06" />
            <stop offset="100%" stopColor="black" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${uid}-topfade`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="black" stopOpacity="0.32" />
            <stop offset="100%" stopColor="black" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={`${uid}-labelfade`} cx="88%" cy="12%" r="28%" gradientUnits="objectBoundingBox">
            <stop offset="0%" stopColor="black" stopOpacity="0.55" />
            <stop offset="55%" stopColor="black" stopOpacity="0.22" />
            <stop offset="100%" stopColor="black" stopOpacity="0" />
          </radialGradient>
          <mask id={mask} maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="400">
            <rect width="640" height="400" fill={`url(#${vis})`} />
            <rect width="640" height="400" fill={`url(#${uid}-textfade)`} />
            <rect width="640" height="96" fill={`url(#${uid}-topfade)`} />
            <rect width="640" height="400" fill={`url(#${uid}-labelfade)`} />
          </mask>
        </defs>

        <g mask={`url(#${mask})`}>
          {tiles.map((tile) => (
            <rect
              key={`tile-${tile.i}`}
              className={tile.hot ? "hw-tile is-hot" : "hw-tile"}
              x={tile.x}
              y={tile.y}
              width={TILE_W}
              height={TILE_H}
              rx="5"
            />
          ))}
        </g>

        <rect x="0" y="56" width="2" height="260" fill={`url(#${rail})`} />
      </svg>

      <div className="relative z-10 flex h-full flex-col justify-between px-6 py-5 md:px-8 md:py-7">
        <div className="flex items-start justify-between gap-4">
          <p className="text-xs font-light uppercase tracking-[0.28em] text-white/40 md:text-[13px]">
            Hardware stack
          </p>
          <p className="shrink-0 rounded-full bg-black/55 px-3 py-1 text-xs font-light uppercase tracking-[0.22em] text-white/80 backdrop-blur-sm md:text-[13px]">
            <span className="text-[#c4b5fd]">64</span>
            <span className="text-white/70"> GPU</span>
          </p>
        </div>

        <div className="pb-0.5">
          <p className="font-display text-[2.15rem] font-normal leading-none tracking-[-0.03em] text-white md:text-[2.55rem]">
            Chassis
          </p>
          <p className="mt-2.5 text-sm font-light uppercase tracking-[0.26em] text-white/45 md:text-base">
            DGX-class
          </p>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
      />
    </article>
  );
}

function cubeFaces(x: number, y: number, s: number) {
  const dx = s * 0.72;
  const dy = s * 0.42;
  const h = s * 0.78;
  const top = `${x},${y} ${x + dx},${y + dy} ${x},${y + dy * 2} ${x - dx},${y + dy}`;
  const left = `${x - dx},${y + dy} ${x},${y + dy * 2} ${x},${y + dy * 2 + h} ${x - dx},${y + dy + h}`;
  const right = `${x + dx},${y + dy} ${x},${y + dy * 2} ${x},${y + dy * 2 + h} ${x + dx},${y + dy + h}`;
  const anchor = { x, y: y + dy * 2 + h * 0.35 };
  return { top, left, right, anchor };
}

const DIE_CUBES = {
  size: 360,
  cols: 3,
  rows: 3,
  s: 52,
  ox: 188,
  oy: 58,
  stepX: 54,
  stepY: 36,
} as const;

const DIE_CUBE_COUNT = DIE_CUBES.cols * DIE_CUBES.rows;

const DIE_LAYOUT = Array.from({ length: DIE_CUBE_COUNT }, (_, i) => {
  const col = i % DIE_CUBES.cols;
  const row = Math.floor(i / DIE_CUBES.cols);
  return {
    i,
    col,
    row,
    x: DIE_CUBES.ox + (col - row) * DIE_CUBES.stepX,
    y: DIE_CUBES.oy + (col + row) * DIE_CUBES.stepY,
  };
});

const DIE_EDGES = DIE_LAYOUT.flatMap((cube) => {
  const edges: { a: number; b: number }[] = [];
  if (cube.col < DIE_CUBES.cols - 1) edges.push({ a: cube.i, b: cube.i + 1 });
  if (cube.row < DIE_CUBES.rows - 1) edges.push({ a: cube.i, b: cube.i + DIE_CUBES.cols });
  return edges;
});

/**
 * Act 1 — second graphic, foreground.
 * Same glass cubes as the Kimi plate. One warm cube walks at random.
 */
export function HardwareGpuPlate() {
  const uid = useId().replace(/:/g, "");
  const mask = `gpu-vis-${uid}`;
  const [hotIndex, setHotIndex] = useState(4);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const id = window.setInterval(() => {
      setHotIndex((current) => nextHotIndex(current, DIE_CUBE_COUNT));
    }, 1600);

    return () => window.clearInterval(id);
  }, []);

  const geometry = [...DIE_LAYOUT]
    .sort((a, b) => a.row + a.col - (b.row + b.col))
    .map((cube) => ({
      ...cube,
      ...cubeFaces(cube.x, cube.y, DIE_CUBES.s),
      hot: cube.i === hotIndex,
    }));

  return (
    <article
      aria-label="Isolated GPU die"
      className="glass relative aspect-square overflow-hidden rounded-[1.5rem]"
    >
      <div
        aria-hidden
        className="absolute inset-[1px] rounded-[calc(1.5rem-1px)] bg-[#070708]"
      />

      <svg
        aria-hidden
        viewBox={`0 0 ${DIE_CUBES.size} ${DIE_CUBES.size}`}
        className="pointer-events-none absolute inset-0 size-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id={`${uid}-tlt`} cx="16%" cy="12%" r="32%" gradientUnits="objectBoundingBox">
            <stop offset="0%" stopColor="black" stopOpacity="0.5" />
            <stop offset="65%" stopColor="black" stopOpacity="0.14" />
            <stop offset="100%" stopColor="black" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${uid}-bl`} cx="16%" cy="88%" r="36%" gradientUnits="objectBoundingBox">
            <stop offset="0%" stopColor="black" stopOpacity="0.48" />
            <stop offset="60%" stopColor="black" stopOpacity="0.14" />
            <stop offset="100%" stopColor="black" stopOpacity="0" />
          </radialGradient>
          <mask id={mask} maskUnits="userSpaceOnUse" x="0" y="0" width={DIE_CUBES.size} height={DIE_CUBES.size}>
            <rect width={DIE_CUBES.size} height={DIE_CUBES.size} fill="white" />
            <rect width={DIE_CUBES.size} height={DIE_CUBES.size} fill={`url(#${uid}-tlt)`} />
            <rect width={DIE_CUBES.size} height={DIE_CUBES.size} fill={`url(#${uid}-bl)`} />
          </mask>
        </defs>

        <g mask={`url(#${mask})`}>
          {DIE_EDGES.map((edge, i) => {
            const from = cubeFaces(DIE_LAYOUT[edge.a].x, DIE_LAYOUT[edge.a].y, DIE_CUBES.s).anchor;
            const to = cubeFaces(DIE_LAYOUT[edge.b].x, DIE_LAYOUT[edge.b].y, DIE_CUBES.s).anchor;
            return (
              <line
                key={`e-${i}`}
                className="frontier-net-edge"
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
              />
            );
          })}

          {geometry.map((cube) => (
            <g
              key={`c-${cube.i}`}
              className={cube.hot ? "gpu-cube is-hot" : "gpu-cube"}
            >
              <polygon className="gpu-cube-left" points={cube.left} />
              <polygon className="gpu-cube-right" points={cube.right} />
              <polygon className="gpu-cube-top" points={cube.top} />
            </g>
          ))}
        </g>
      </svg>

      <div className="relative z-10 flex h-full flex-col justify-between px-4 py-4 md:px-5 md:py-5">
        <p className="text-[10px] font-light uppercase tracking-[0.26em] text-white/55 md:text-xs">
          Die
        </p>
        <p className="font-display text-2xl font-normal leading-none tracking-[-0.03em] text-white md:text-[1.85rem]">
          GPU
        </p>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
      />
    </article>
  );
}
