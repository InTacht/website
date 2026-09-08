"use client";

import { useEffect, useId, useMemo, useState } from "react";

const W = 560;
const H = 315;
const COLS = 32;
const ROWS = 20;
const SX = 19.4;
const RX = 9.1;
const SY = 13.4;
const RY = 2.05;
const RAW_W = (COLS - 1) * SX + (ROWS - 1) * RX;
const RAW_H = (ROWS - 1) * SY + (COLS - 1) * RY;
const SCALE = Math.max((W + 168) / RAW_W, (H + 132) / RAW_H);
const OX = (W - RAW_W * SCALE) / 2;
const OY = (H - RAW_H * SCALE) / 2;
const K = 0.82;
const OMEGA = 1.28;
const AMP = 15;
const CREST = 4.2;
const SOURCES = [
  { c: 10.6, r: 8.0 },
  { c: 22.1, r: 11.8 },
] as const;

type Pt = { x: number; y: number; z: number };

function height(c: number, r: number, t: number) {
  let z = 0;
  for (const src of SOURCES) {
    const d = Math.hypot(c - src.c, r - src.r) + 0.4;
    z += AMP * Math.exp(-d * 0.038) * Math.sin(K * d - OMEGA * t);
  }
  return z;
}

function project(c: number, r: number, z: number) {
  return {
    x: OX + (c * SX + r * RX) * SCALE,
    y: OY + (r * SY + c * RY) * SCALE - z * SCALE,
    z,
  };
}

function strokePath(points: Pt[], crestOnly: boolean) {
  let d = "";
  let drawing = false;
  for (const p of points) {
    if (crestOnly && p.z < CREST) {
      drawing = false;
      continue;
    }
    d += `${drawing ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
    drawing = true;
  }
  return d;
}

function buildMesh(t: number) {
  const grid: Pt[][] = [];
  for (let r = 0; r < ROWS; r += 1) {
    const row: Pt[] = [];
    for (let c = 0; c < COLS; c += 1) {
      row.push(project(c, r, height(c, r, t)));
    }
    grid.push(row);
  }

  const rows = grid.map((row) => strokePath(row, false));
  const cols: string[] = [];
  for (let c = 0; c < COLS; c += 1) {
    cols.push(strokePath(grid.map((row) => row[c]), false));
  }

  const crests = [
    ...grid.map((row) => strokePath(row, true)),
    ...Array.from({ length: COLS }, (_, c) => strokePath(grid.map((row) => row[c]), true)),
  ].filter(Boolean);

  const sources = SOURCES.map((src) => project(src.c, src.r, height(src.c, src.r, t) + 2));

  const plane = [
    project(0, 0, 0),
    project(COLS - 1, 0, 0),
    project(COLS - 1, ROWS - 1, 0),
    project(0, ROWS - 1, 0),
  ];

  return { rows, cols, crests, sources, plane };
}

/**
 * Act 2 — field waves specimen.
 * Two-source superposition on a membrane. The carpet.
 */
export function WaveFieldPlate() {
  const uid = useId().replace(/:/g, "");
  const rail = `wf-rail-${uid}`;
  const visMask = `wf-vis-${uid}`;
  const visGrad = `wf-vis-grad-${uid}`;
  const glow = `wf-glow-${uid}`;
  const [t, setT] = useState(0);
  const mesh = useMemo(() => buildMesh(t), [t]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const start = performance.now();
    let frame = 0;
    let last = 0;

    const tick = (now: number) => {
      if (now - last >= 32) {
        last = now;
        setT((now - start) / 1000);
      }
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <article
      aria-label="Continuous field waves"
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
            cx="50%"
            cy="50%"
            r="92%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="78%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0.82" />
          </radialGradient>
          <radialGradient id={`${uid}-src`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#8f55fb" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#8f55fb" stopOpacity="0" />
          </radialGradient>
          <filter
            id={glow}
            x="-80%"
            y="-80%"
            width="260%"
            height="260%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
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
            <ellipse cx="112" cy="282" rx="128" ry="56" fill="black" fillOpacity="0.28" />
            <rect x="0" y="0" width={W} height="40" fill="black" fillOpacity="0.16" />
          </mask>
        </defs>

        <g mask={`url(#${visMask})`}>
          <path
            d={`M${mesh.plane[0].x.toFixed(1)} ${mesh.plane[0].y.toFixed(1)}L${mesh.plane[1].x.toFixed(1)} ${mesh.plane[1].y.toFixed(1)}L${mesh.plane[2].x.toFixed(1)} ${mesh.plane[2].y.toFixed(1)}L${mesh.plane[3].x.toFixed(1)} ${mesh.plane[3].y.toFixed(1)}Z`}
            fill="rgba(255,255,255,0.03)"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.8"
          />

          {mesh.rows.map((d, i) => (
            <path
              key={`r-${i}`}
              d={d}
              fill="none"
              stroke="rgba(255,255,255,0.28)"
              strokeWidth="1"
              strokeLinejoin="round"
            />
          ))}
          {mesh.cols.map((d, i) => (
            <path
              key={`c-${i}`}
              d={d}
              fill="none"
              stroke="rgba(255,255,255,0.16)"
              strokeWidth="0.85"
              strokeLinejoin="round"
            />
          ))}
          {mesh.crests.map((d, i) => (
            <path
              key={`k-${i}`}
              d={d}
              fill="none"
              stroke="#8f55fb"
              strokeWidth="1.55"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

          {mesh.sources.map((src, i) => (
            <g key={`s-${i}`} filter={`url(#${glow})`}>
              <ellipse
                cx={src.x}
                cy={src.y}
                rx="11"
                ry="7"
                fill={`url(#${uid}-src)`}
              />
              <ellipse cx={src.x} cy={src.y} rx="2.4" ry="1.6" fill="#c4b5fd" />
            </g>
          ))}
        </g>

        <rect x="0" y="52" width="2" height="210" fill={`url(#${rail})`} />
      </svg>

      <div className="relative z-10 flex h-full flex-col justify-between px-6 py-5 md:px-8 md:py-7">
        <div className="flex items-start justify-between gap-4">
          <p className="text-xs font-light uppercase tracking-[0.28em] text-white/40 md:text-[13px]">
            Field waves
          </p>
          <p className="shrink-0 text-xs font-light uppercase tracking-[0.22em] text-white/55 md:text-[13px]">
            <span className="text-[#c4b5fd]">Continuous</span>
          </p>
        </div>

        <div className="pb-0.5">
          <p className="font-display text-[2.15rem] font-normal leading-none tracking-[-0.03em] text-white md:text-[2.55rem]">
            Waves
          </p>
          <p className="mt-2.5 text-sm font-light uppercase tracking-[0.26em] text-white/45 md:text-base">
            Wave physics
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
