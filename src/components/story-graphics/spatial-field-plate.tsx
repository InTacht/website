"use client";

import { useEffect, useId, useState } from "react";

const COLS = 16;
const ROWS = 10;
const W = 560;
const H = 315;
const NODE_COUNT = COLS * ROWS;
const HOT_MIN = 3;
const HOT_MAX = 4;
const START_HOT = [5 * COLS + 6, 3 * COLS + 11, 7 * COLS + 3, 2 * COLS + 8];

type Node = {
  x: number;
  y: number;
  rad: number;
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

function pickUnused(used: Set<number>) {
  const pool = VISIBLE.length ? VISIBLE : Array.from({ length: NODE_COUNT }, (_, i) => i);
  let next = pool[Math.floor(Math.random() * pool.length)];
  let guard = 0;
  while (used.has(next) && guard < 48) {
    next = pool[Math.floor(Math.random() * pool.length)];
    guard += 1;
  }
  return next;
}

function stepHot(current: number[]) {
  const size = Math.random() < 0.45 ? HOT_MIN : HOT_MAX;
  const next = [...current];

  while (next.length > size) {
    next.splice(Math.floor(Math.random() * next.length), 1);
  }

  const used = new Set(next);
  const swaps = next.length >= 2 && Math.random() < 0.4 ? 2 : 1;

  for (let i = 0; i < swaps; i += 1) {
    const at = Math.floor(Math.random() * next.length);
    used.delete(next[at]);
    const fresh = pickUnused(used);
    next[at] = fresh;
    used.add(fresh);
  }

  while (next.length < size) {
    const fresh = pickUnused(used);
    next.push(fresh);
    used.add(fresh);
  }

  return next;
}

function buildField() {
  const nodes: Node[] = [];

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const point = project(c, r);
      nodes.push({
        x: point.x,
        y: point.y,
        rad: point.rad,
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
const VISIBLE = FIELD.nodes
  .map((node, i) => ({ i, ...node }))
  .filter((node) => node.x > 56 && node.x < 520 && node.y > 46 && node.y < 248)
  .map((node) => node.i);

/**
 * Act 2 — spatial field specimen.
 * Lattice is full-bleed. Lockup sits on top.
 */
export function SpatialFieldPlate() {
  const uid = useId().replace(/:/g, "");
  const rail = `sf-rail-${uid}`;
  const visMask = `sf-vis-${uid}`;
  const visGrad = `sf-vis-grad-${uid}`;
  const glow = `sf-glow-${uid}`;
  const [hot, setHot] = useState(START_HOT);
  const hotSet = new Set(hot);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const id = window.setInterval(() => {
      setHot((current) => stepHot(current));
    }, 1600);

    return () => window.clearInterval(id);
  }, []);

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
          <filter
            id={glow}
            x="-120%"
            y="-120%"
            width="340%"
            height="340%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
            </feMerge>
          </filter>
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

        {FIELD.nodes.map((node, i) => {
          if (!hotSet.has(i)) return null;
          return (
            <circle
              key={`g-${i}`}
              cx={node.x}
              cy={node.y}
              r={node.rad + 5}
              fill="rgba(143,85,251,0.32)"
              filter={`url(#${glow})`}
            />
          );
        })}

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
          {FIELD.nodes.map((node, i) => {
            const lit = hotSet.has(i);
            return (
              <circle
                key={`n-${i}`}
                className={lit ? "sf-point is-hot" : "sf-point"}
                cx={node.x}
                cy={node.y}
                r={node.rad}
                fill={lit ? "#8f55fb" : "rgba(255,255,255,0.38)"}
                stroke={lit ? "rgba(196,181,253,0.72)" : "rgba(255,255,255,0.22)"}
              />
            );
          })}
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
