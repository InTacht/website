"use client";

import { useId } from "react";

type Tone = "cool" | "warm" | "hot";

type Cell = {
  c: number;
  r: number;
  x: number;
  y: number;
  h: number;
  tone: Tone;
};

/**
 * Back row first, then mid, then front. Heights climb hard to the right.
 * Integers only so Node and the browser hydrate the same SVG.
 */
const CELLS: Cell[] = [
  { c: 0, r: 1, x: 124, y: 158, h: 18, tone: "cool" },
  { c: 1, r: 1, x: 174, y: 155, h: 21, tone: "cool" },
  { c: 2, r: 1, x: 224, y: 146, h: 30, tone: "cool" },
  { c: 3, r: 1, x: 274, y: 132, h: 44, tone: "warm" },
  { c: 4, r: 1, x: 324, y: 114, h: 62, tone: "warm" },
  { c: 5, r: 1, x: 374, y: 90, h: 86, tone: "hot" },
  { c: 6, r: 1, x: 424, y: 62, h: 114, tone: "hot" },
  { c: 7, r: 1, x: 474, y: 30, h: 146, tone: "hot" },
  { c: 0, r: 0, x: 108, y: 172, h: 26, tone: "cool" },
  { c: 1, r: 0, x: 158, y: 169, h: 29, tone: "cool" },
  { c: 2, r: 0, x: 208, y: 160, h: 38, tone: "cool" },
  { c: 3, r: 0, x: 258, y: 146, h: 52, tone: "warm" },
  { c: 4, r: 0, x: 308, y: 128, h: 70, tone: "warm" },
  { c: 5, r: 0, x: 358, y: 104, h: 94, tone: "hot" },
  { c: 6, r: 0, x: 408, y: 76, h: 122, tone: "hot" },
  { c: 7, r: 0, x: 458, y: 44, h: 154, tone: "hot" },
];

const DX = 13;
const DY = 7.5;

function prism(x: number, y: number, h: number) {
  return {
    top: `${x},${y} ${x + DX},${y + DY} ${x},${y + DY * 2} ${x - DX},${y + DY}`,
    left: `${x - DX},${y + DY} ${x},${y + DY * 2} ${x},${y + DY * 2 + h} ${x - DX},${y + DY + h}`,
    right: `${x + DX},${y + DY} ${x},${y + DY * 2} ${x},${y + DY * 2 + h} ${x + DX},${y + DY + h}`,
  };
}

/**
 * Act 1 — energy specimen.
 * Load towers in the open field. Not a Cartesian chart.
 */
export function EnergyChartPlate() {
  const uid = useId().replace(/:/g, "");
  const rail = `en-rail-${uid}`;
  const vis = `en-vis-${uid}`;
  const mask = `en-mask-${uid}`;
  const glow = `en-glow-${uid}`;

  return (
    <article
      aria-label="Energy for Growth chart"
      className="glass relative aspect-[16/9] overflow-hidden rounded-[1.5rem]"
    >
      <svg
        aria-hidden
        viewBox="0 0 560 315"
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
          <radialGradient
            id={glow}
            cx="78%"
            cy="42%"
            r="42%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="#8f55fb" stopOpacity="0.42" />
            <stop offset="55%" stopColor="#5b50dd" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#8f55fb" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id={vis}
            cx="74%"
            cy="46%"
            r="72%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="40%" stopColor="white" stopOpacity="0.9" />
            <stop offset="70%" stopColor="white" stopOpacity="0.38" />
            <stop offset="100%" stopColor="white" stopOpacity="0.12" />
          </radialGradient>
          <mask id={mask} maskUnits="userSpaceOnUse" x="0" y="0" width="560" height="315">
            <rect width="560" height="315" fill={`url(#${vis})`} />
            <rect width="560" height="58" fill="black" fillOpacity="0.45" />
            <rect x="0" y="228" width="300" height="90" fill="black" fillOpacity="0.62" />
            <ellipse cx="132" cy="300" rx="210" ry="88" fill="black" fillOpacity="0.7" />
          </mask>
        </defs>

        <ellipse cx="430" cy="118" rx="168" ry="92" fill={`url(#${glow})`} />

        <g mask={`url(#${mask})`}>
          {CELLS.map((cell) => {
            const faces = prism(cell.x, cell.y, cell.h);
            return (
              <g
                key={`en-${cell.r}-${cell.c}`}
                className={`en-cell is-${cell.tone}`}
                style={{ animationDelay: `${cell.c * 70}ms` }}
              >
                <polygon className="en-cell-left" points={faces.left} />
                <polygon className="en-cell-right" points={faces.right} />
                <polygon className="en-cell-top" points={faces.top} />
              </g>
            );
          })}
        </g>

        <rect x="0" y="48" width="2" height="220" fill={`url(#${rail})`} />
      </svg>

      <div className="relative z-10 flex h-full flex-col justify-between px-6 py-5 md:px-8 md:py-7">
        <div className="flex items-start justify-between gap-4">
          <p className="text-xs font-light uppercase tracking-[0.28em] text-white/40 md:text-[13px]">
            Energy bottleneck
          </p>
          <p className="shrink-0 text-xs font-light uppercase tracking-[0.22em] text-white/55 md:text-[13px]">
            <span className="text-[#c4b5fd]">116</span>
            <span className="text-white/70"> kW</span>
          </p>
        </div>

        <div className="pt-0.5">
          <p className="font-display text-[2.15rem] font-normal leading-none tracking-[-0.03em] text-white md:text-[2.55rem]">
            Energy
          </p>
          <p className="mt-2.5 text-sm font-light uppercase tracking-[0.26em] text-white/45 md:text-base">
            No low-energy, rich countries
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
