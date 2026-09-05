"use client";

import { useId } from "react";

type Cube = {
  x: number;
  y: number;
  s: number;
  delay: string;
  hot?: boolean;
};

type Edge = { a: number; b: number; delay: string };

/** Full-plate isometric cube field — soft under copy, clear in open space. */
const CUBES: Cube[] = [
  // Upper
  { x: 56, y: 28, s: 14, delay: "0s" },
  { x: 124, y: 18, s: 16, delay: "0.35s" },
  { x: 198, y: 32, s: 13, delay: "0.7s" },
  { x: 268, y: 16, s: 17, delay: "1.05s" },
  { x: 342, y: 30, s: 14, delay: "0.2s" },
  { x: 416, y: 14, s: 18, delay: "0.55s" },
  { x: 492, y: 28, s: 15, delay: "0.9s" },
  // Mid
  { x: 88, y: 78, s: 15, delay: "0.15s" },
  { x: 162, y: 92, s: 18, delay: "0.5s" },
  { x: 238, y: 76, s: 14, delay: "0.85s" },
  { x: 312, y: 94, s: 19, delay: "1.2s" },
  { x: 388, y: 80, s: 16, delay: "0.3s" },
  { x: 462, y: 96, s: 17, delay: "0.65s" },
  { x: 524, y: 78, s: 13, delay: "1.0s" },
  // Lower — denser / clearer on the right
  { x: 64, y: 148, s: 14, delay: "0.4s" },
  { x: 138, y: 164, s: 16, delay: "0.75s" },
  { x: 214, y: 150, s: 15, delay: "1.1s" },
  { x: 288, y: 168, s: 17, delay: "0.1s" },
  { x: 364, y: 152, s: 18, delay: "0.45s" },
  { x: 438, y: 170, s: 20, delay: "0s", hot: true },
  { x: 510, y: 154, s: 16, delay: "0.8s" },
];

const EDGES: Edge[] = [
  { a: 0, b: 1, delay: "0s" },
  { a: 1, b: 2, delay: "0.25s" },
  { a: 2, b: 3, delay: "0.5s" },
  { a: 3, b: 4, delay: "0.75s" },
  { a: 4, b: 5, delay: "1.0s" },
  { a: 5, b: 6, delay: "1.2s" },
  { a: 0, b: 7, delay: "0.1s" },
  { a: 1, b: 7, delay: "0.35s" },
  { a: 1, b: 8, delay: "0.6s" },
  { a: 2, b: 8, delay: "0.85s" },
  { a: 2, b: 9, delay: "0.15s" },
  { a: 3, b: 9, delay: "0.4s" },
  { a: 3, b: 10, delay: "0.65s" },
  { a: 4, b: 10, delay: "0.9s" },
  { a: 4, b: 11, delay: "0.2s" },
  { a: 5, b: 11, delay: "0.45s" },
  { a: 5, b: 12, delay: "0.7s" },
  { a: 6, b: 12, delay: "0.95s" },
  { a: 6, b: 13, delay: "0.05s" },
  { a: 7, b: 8, delay: "0.3s" },
  { a: 8, b: 9, delay: "0.55s" },
  { a: 9, b: 10, delay: "0.8s" },
  { a: 10, b: 11, delay: "1.05s" },
  { a: 11, b: 12, delay: "0.25s" },
  { a: 12, b: 13, delay: "0.5s" },
  { a: 7, b: 14, delay: "0.75s" },
  { a: 8, b: 14, delay: "1.0s" },
  { a: 8, b: 15, delay: "0.12s" },
  { a: 9, b: 15, delay: "0.38s" },
  { a: 9, b: 16, delay: "0.62s" },
  { a: 10, b: 16, delay: "0.88s" },
  { a: 10, b: 17, delay: "0.18s" },
  { a: 11, b: 17, delay: "0.42s" },
  { a: 11, b: 18, delay: "0.68s" },
  { a: 12, b: 18, delay: "0.92s" },
  { a: 12, b: 19, delay: "0.08s" },
  { a: 13, b: 19, delay: "0.32s" },
  { a: 13, b: 20, delay: "0.58s" },
  { a: 14, b: 15, delay: "0.82s" },
  { a: 15, b: 16, delay: "1.08s" },
  { a: 16, b: 17, delay: "0.22s" },
  { a: 17, b: 18, delay: "0.48s" },
  { a: 18, b: 19, delay: "0.72s" },
  { a: 19, b: 20, delay: "0.98s" },
  { a: 3, b: 12, delay: "0.28s" },
  { a: 8, b: 17, delay: "0.52s" },
  { a: 10, b: 19, delay: "0.78s" },
];

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

/**
 * Act 1 — first graphic.
 * Frontier plate with a living isometric cube field.
 */
export function FrontierModelPlate() {
  const uid = useId().replace(/:/g, "");
  const edgeGrad = `frontier-edge-${uid}`;
  const visMask = `frontier-vis-${uid}`;
  const visGrad = `frontier-vis-grad-${uid}`;

  const geometry = CUBES.map((c) => ({ ...c, ...cubeFaces(c.x, c.y, c.s) }));

  return (
    <article
      aria-label="Kimi / Moonshot frontier model reference"
      className="glass relative aspect-[16/7] overflow-hidden rounded-[1.5rem]"
    >
      <svg
        aria-hidden
        viewBox="0 0 560 245"
        className="frontier-lattice pointer-events-none absolute inset-0 size-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={edgeGrad} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8f55fb" stopOpacity="0" />
            <stop offset="35%" stopColor="#8f55fb" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#5b50dd" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#8f55fb" stopOpacity="0" />
          </linearGradient>

          <radialGradient
            id={visGrad}
            cx="78%"
            cy="72%"
            r="72%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="42%" stopColor="white" stopOpacity="0.88" />
            <stop offset="68%" stopColor="white" stopOpacity="0.36" />
            <stop offset="100%" stopColor="white" stopOpacity="0.1" />
          </radialGradient>
          <mask
            id={visMask}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="560"
            height="245"
          >
            <rect width="560" height="245" fill={`url(#${visGrad})`} />
            <ellipse cx="120" cy="188" rx="130" ry="70" fill="black" fillOpacity="0.55" />
            <rect x="0" y="0" width="560" height="52" fill="black" fillOpacity="0.4" />
          </mask>
        </defs>

        <g className="frontier-net-drift" mask={`url(#${visMask})`}>
          {EDGES.map((edge, i) => {
            const from = geometry[edge.a].anchor;
            const to = geometry[edge.b].anchor;
            return (
              <line
                key={`e-${i}`}
                className="frontier-net-edge"
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                style={{ animationDelay: edge.delay }}
              />
            );
          })}

          {geometry.map((cube, i) => (
            <g
              key={`c-${i}`}
              className={cube.hot ? "frontier-cube is-hot" : "frontier-cube"}
              style={{ animationDelay: cube.delay }}
            >
              <polygon className="frontier-cube-left" points={cube.left} />
              <polygon className="frontier-cube-right" points={cube.right} />
              <polygon className="frontier-cube-top" points={cube.top} />
            </g>
          ))}
        </g>

        <rect x="0" y="36" width="2" height="172" fill={`url(#${edgeGrad})`} />
      </svg>

      <div className="relative z-10 flex h-full flex-col justify-between px-6 py-5 md:px-8 md:py-7">
        <div className="flex items-start justify-between gap-4">
          <p className="text-xs font-light uppercase tracking-[0.28em] text-white/40 md:text-[13px]">
            Frontier reference
          </p>
          <p className="shrink-0 text-xs font-light uppercase tracking-[0.22em] text-white/35 md:text-[13px]">
            <span className="text-[#c4b5fd]">~3T</span>
            <span className="text-white/30"> params</span>
          </p>
        </div>

        <div className="pb-0.5">
          <p className="font-display text-[2.35rem] font-normal leading-none tracking-[-0.03em] text-white md:text-[2.85rem]">
            Kimi
          </p>
          <p className="mt-2.5 text-sm font-light uppercase tracking-[0.26em] text-white/45 md:text-base">
            Moonshot AI
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
