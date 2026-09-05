"use client";

import { useId } from "react";

const W = 560;
const H = 315;

const RAW = [
  { x: 48, y: 108, r: 5.5, tone: "hot" as const },
  { x: 92, y: 86, r: 6, tone: "hot" as const },
  { x: 136, y: 118, r: 6.5, tone: "warm" as const },
  { x: 180, y: 72, r: 7, tone: "warm" as const },
  { x: 224, y: 112, r: 6.5, tone: "warm" as const },
  { x: 268, y: 64, r: 8, tone: "mid" as const },
  { x: 312, y: 104, r: 7, tone: "mid" as const },
  { x: 356, y: 58, r: 8.5, tone: "mid" as const },
  { x: 400, y: 96, r: 8, tone: "lite" as const },
  { x: 444, y: 54, r: 9, tone: "lite" as const },
  { x: 492, y: 82, r: 8, tone: "lite" as const },
] as const;

const OX = 270;
const OY = 86;
const SX = 1.42;
const SY = 4.2;
const CX = W / 2;
const CY = H / 2;
const SR = 1.55;

const mapX = (x: number) => CX + (x - OX) * SX;
const mapY = (y: number) => CY + (y - OY) * SY;
const mapR = (r: number) => r * SR;

const POINTS = RAW.map((point) => ({
  ...point,
  x: mapX(point.x),
  y: mapY(point.y),
  r: mapR(point.r),
}));

const TREND = `M${mapX(48)} ${mapY(108)} C${mapX(92)} ${mapY(86)}, ${mapX(136)} ${mapY(118)}, ${mapX(180)} ${mapY(72)} S${mapX(268)} ${mapY(64)}, ${mapX(312)} ${mapY(104)} S${mapX(400)} ${mapY(96)}, ${mapX(492)} ${mapY(82)}`;

/**
 * Act 2 — field waves specimen.
 * Same diagram, scaled to the plate. Lockup sits on top.
 */
export function WaveFieldPlate() {
  const uid = useId().replace(/:/g, "");
  const rail = `wf-rail-${uid}`;
  const visMask = `wf-vis-${uid}`;
  const visGrad = `wf-vis-grad-${uid}`;

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
          <path className="en-trend" d={TREND} />
          {POINTS.map((point, i) => (
            <circle
              key={`p-${i}`}
              className={`en-point is-${point.tone}`}
              cx={point.x}
              cy={point.y}
              r={point.r}
            />
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
