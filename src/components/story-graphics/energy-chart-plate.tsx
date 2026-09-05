"use client";

import { useId } from "react";

const POINTS = [
  { x: 56, y: 138, r: 6, tone: "hot" as const },
  { x: 98, y: 128, r: 5.5, tone: "hot" as const },
  { x: 140, y: 118, r: 7, tone: "warm" as const },
  { x: 184, y: 106, r: 6.5, tone: "warm" as const },
  { x: 228, y: 94, r: 8, tone: "warm" as const },
  { x: 274, y: 82, r: 7.5, tone: "mid" as const },
  { x: 320, y: 70, r: 8.5, tone: "mid" as const },
  { x: 366, y: 60, r: 8, tone: "mid" as const },
  { x: 412, y: 50, r: 9, tone: "lite" as const },
  { x: 456, y: 42, r: 10, tone: "lite" as const },
  { x: 498, y: 36, r: 8.5, tone: "lite" as const },
] as const;

/**
 * Act 1 — third graphic.
 * Energy scatter lives in the open field between lockup and header.
 */
export function EnergyChartPlate() {
  const uid = useId().replace(/:/g, "");
  const rail = `en-rail-${uid}`;

  return (
    <article
      aria-label="Energy for Growth chart"
      className="glass relative aspect-[16/9] overflow-hidden rounded-[1.5rem]"
    >
      <svg
        aria-hidden
        viewBox="0 0 2 240"
        className="pointer-events-none absolute left-0 top-1/2 h-[66%] -translate-y-1/2"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={rail} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8f55fb" stopOpacity="0" />
            <stop offset="35%" stopColor="#8f55fb" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#5b50dd" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#8f55fb" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="2" height="240" fill={`url(#${rail})`} />
      </svg>

      <div className="relative z-10 flex h-full flex-col px-6 py-5 md:px-8 md:py-7">
        <div className="flex items-start justify-between gap-4">
          <p className="text-xs font-light uppercase tracking-[0.28em] text-white/40 md:text-[13px]">
            Energy bottleneck
          </p>
          <p className="shrink-0 text-xs font-light uppercase tracking-[0.22em] text-white/55 md:text-[13px]">
            <span className="text-[#c4b5fd]">116</span>
            <span className="text-white/70"> kW</span>
          </p>
        </div>

        <div className="relative min-h-0 flex-1 px-1 pb-4 pt-5 md:px-2 md:pb-5 md:pt-6">
          <svg
            aria-hidden
            viewBox="0 0 560 176"
            className="pointer-events-none size-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id={`${uid}-area`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#5b50dd" stopOpacity="0.18" />
                <stop offset="70%" stopColor="#8f55fb" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0.28" />
              </linearGradient>
            </defs>
            <line className="en-grid" x1="32" y1="52" x2="528" y2="52" />
            <line className="en-grid" x1="32" y1="104" x2="528" y2="104" />
            <path
              className="en-area"
              d="M56 138 C184 110, 340 66, 498 36 L498 156 L56 156 Z"
              fill={`url(#${uid}-area)`}
            />
            <line className="en-axis" x1="32" y1="20" x2="32" y2="156" />
            <line className="en-axis" x1="32" y1="156" x2="528" y2="156" />
            <path
              className="en-trend"
              d="M56 138 C184 110, 340 66, 498 36"
            />
            {POINTS.map((point, i) => (
              <circle
                key={`p-${i}`}
                className={`en-point is-${point.tone}`}
                cx={point.x}
                cy={point.y}
                r={point.r}
              />
            ))}
          </svg>
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
