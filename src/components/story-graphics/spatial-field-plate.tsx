"use client";

import { useId } from "react";

const COLS = 16;
const ROWS = 10;
const SRC = { c: 6, r: 5 };
const W = 560;
const H = 315;

type Node = {
  x: number;
  y: number;
  rad: number;
  delay: string;
  source: boolean;
};

type Edge = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

function project(c: number, r: number) {
  const depth = r / (ROWS - 1);
  const scale = 0.7 + depth * 0.48;
  const y = -8 + depth * 332;
  const x = W / 2 + (c - (COLS - 1) / 2) * 44 * scale;
  return { x, y, rad: 1.7 + depth * 2.2 };
}

function buildField() {
  const origin = project(SRC.c, SRC.r);
  const nodes: Node[] = [];

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const point = project(c, r);
      const dist = Math.hypot(point.x - origin.x, point.y - origin.y);
      nodes.push({
        x: point.x,
        y: point.y,
        rad: point.rad,
        delay: `${(dist / 110).toFixed(2)}s`,
        source: c === SRC.c && r === SRC.r,
      });
    }
  }

  const at = (c: number, r: number) => nodes[r * COLS + c];
  const edges: Edge[] = [];

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const node = at(c, r);
      if (c < COLS - 1) {
        const next = at(c + 1, r);
        edges.push({ x1: node.x, y1: node.y, x2: next.x, y2: next.y });
      }
      if (r < ROWS - 1) {
        const next = at(c, r + 1);
        edges.push({ x1: node.x, y1: node.y, x2: next.x, y2: next.y });
      }
    }
  }

  return { nodes, edges };
}

const FIELD = buildField();

/**
 * Act 2 — spatial field specimen.
 * Lattice is full-bleed. Lockup sits on top.
 */
export function SpatialFieldPlate() {
  const uid = useId().replace(/:/g, "");
  const rail = `sf-rail-${uid}`;
  const visMask = `sf-vis-${uid}`;
  const visGrad = `sf-vis-grad-${uid}`;

  return (
    <article
      aria-label="Spatial field"
      className="glass relative aspect-[16/9] overflow-hidden rounded-[1.5rem]"
    >
      <svg
        aria-hidden
        viewBox={`0 0 ${W} ${H}`}
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
            id={visGrad}
            cx="58%"
            cy="46%"
            r="86%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="58%" stopColor="white" stopOpacity="0.94" />
            <stop offset="82%" stopColor="white" stopOpacity="0.55" />
            <stop offset="100%" stopColor="white" stopOpacity="0.22" />
          </radialGradient>
          <mask
            id={visMask}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width={W}
            height={H}
          >
            <rect width={W} height={H} fill={`url(#${visGrad})`} />
            <ellipse cx="108" cy="278" rx="132" ry="62" fill="black" fillOpacity="0.42" />
            <rect x="0" y="0" width={W} height="44" fill="black" fillOpacity="0.28" />
          </mask>
        </defs>

        <g mask={`url(#${visMask})`}>
          {FIELD.edges.map((edge, i) => (
            <line
              key={`e-${i}`}
              className="frontier-net-edge"
              x1={edge.x1}
              y1={edge.y1}
              x2={edge.x2}
              y2={edge.y2}
            />
          ))}
          {FIELD.nodes.map((node, i) => (
            <circle
              key={`n-${i}`}
              className={node.source ? "en-point is-hot" : "en-point is-mid"}
              cx={node.x}
              cy={node.y}
              r={node.source ? node.rad + 2.4 : node.rad}
              style={{ animationDelay: node.delay }}
            />
          ))}
        </g>

        <rect x="0" y="52" width="2" height="210" fill={`url(#${rail})`} />
      </svg>

      <div className="relative z-10 flex h-full flex-col justify-between px-6 py-5 md:px-8 md:py-7">
        <div className="flex items-start justify-between gap-4">
          <p className="text-xs font-light uppercase tracking-[0.28em] text-white/40 md:text-[13px]">
            Field lattice
          </p>
          <p className="shrink-0 text-xs font-light uppercase tracking-[0.22em] text-white/55 md:text-[13px]">
            <span className="text-[#c4b5fd]">Parallel</span>
          </p>
        </div>

        <div className="pb-0.5">
          <p className="font-display text-[2.15rem] font-normal leading-none tracking-[-0.03em] text-white md:text-[2.55rem]">
            Spatial
          </p>
          <p className="mt-2.5 text-sm font-light uppercase tracking-[0.26em] text-white/45 md:text-base">
            Continuous grid
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
