"use client";

import { useId } from "react";

const W = 640;
const H = 260;
const PLOT = { x: 4, y: 8, w: 612, h: 236 };

const STANDARD = [1, 1, 0.991, 0.995, 1] as const;
const GRASSMANN = [1, 0.964, 0.945, 0.955, 0.968] as const;
const WAVE = [1, 0.636, 0.409, 0.295, 0.264] as const;
const TS = [0, 0.24, 0.48, 0.72, 1] as const;

function xAt(t: number) {
  return PLOT.x + 8 + t * (PLOT.w - 36);
}

function yAt(pct: number) {
  return PLOT.y + (1 - pct) * PLOT.h;
}

function clampY(y: number) {
  return Math.max(PLOT.y, Math.min(PLOT.y + PLOT.h, y));
}

function curvePath(values: readonly number[]) {
  const pts = values.map((pct, i) => ({ x: xAt(TS[i]), y: yAt(pct) }));
  let d = `M${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = clampY(p1.y + (p2.y - p0.y) / 6);
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = clampY(p2.y - (p3.y - p1.y) / 6);
    d += ` C${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

function areaPath(values: readonly number[]) {
  const last = xAt(1);
  const first = xAt(0);
  const base = PLOT.y + PLOT.h;
  return `${curvePath(values)} L${last.toFixed(1)} ${base} L${first.toFixed(1)} ${base} Z`;
}

const LEGEND = [
  { name: "Standard Attention", value: "100%", swatch: "bg-[#f87171]" },
  { name: "Wave Fields", value: "25%", swatch: "bg-[#fca5a5]" },
  { name: "Grassmann", value: "97.1%", swatch: "bg-[#c4b5fd]" },
] as const;

export function MqarRecallPlate() {
  const uid = useId().replace(/:/g, "");
  const fall = `mqar-fall-${uid}`;

  const x0 = PLOT.x;
  const x1 = PLOT.x + PLOT.w;
  const y0 = PLOT.y;
  const y1 = PLOT.y + PLOT.h;
  const yMid = yAt(0.5);
  const y75 = yAt(0.75);
  const y25 = yAt(0.25);
  const endX = xAt(1);
  const grassY = yAt(GRASSMANN[4]);
  const waveY = yAt(WAVE[4]);
  const standardY = yAt(STANDARD[4]);

  return (
    <article
      className="glass relative flex aspect-[16/10] w-full flex-col overflow-hidden rounded-[1.5rem] p-4 max-md:aspect-auto max-md:min-h-[22rem] md:p-5"
      aria-label="MQAR recall performance. Grassmann memory stays near 97% as context grows, while wave fields drop."
    >
      <header className="flex shrink-0 items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[15px] font-light tracking-tight text-white md:text-base">
            MQAR Recall Performance
          </p>
          <p className="mt-0.5 text-[12px] font-light text-white/40 md:text-[13px]">
            Multi-Query Associative Recall
          </p>
        </div>
        <p className="shrink-0 pb-0.5 text-[11px] font-light uppercase tracking-[0.16em] text-white/30">
          Context length →
        </p>
      </header>

      <div className="relative mt-2.5 min-h-0 flex-1 overflow-hidden px-2.5 py-2 md:px-3 md:py-2.5">
        <div className="pointer-events-none absolute inset-y-2 left-2 z-10 flex w-9 flex-col justify-between text-[11px] font-light text-white/50 md:left-2.5 md:w-10 md:text-[12px]">
          <span>100%</span>
          <span>50%</span>
          <span>0</span>
        </div>

        <div className="absolute inset-2 left-11 right-2 md:left-12">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="size-full"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient
                id={fall}
                x1="0"
                y1={y0}
                x2="0"
                y2={y1}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#f87171" stopOpacity="0" />
                <stop offset="35%" stopColor="#f87171" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#f87171" stopOpacity="0.28" />
              </linearGradient>
            </defs>

            {[y0, y75, yMid, y25, y1].map((y) => (
              <line
                key={y}
                x1={x0}
                y1={y}
                x2={x1}
                y2={y}
                stroke="rgba(255,255,255,0.1)"
              />
            ))}
            {TS.map((t) => (
              <line
                key={t}
                x1={xAt(t)}
                y1={y0}
                x2={xAt(t)}
                y2={y1}
                stroke="rgba(255,255,255,0.05)"
              />
            ))}
            <line
              x1={x0}
              y1={y1}
              x2={x1}
              y2={y1}
              stroke="rgba(255,255,255,0.28)"
            />
            <line
              x1={x0}
              y1={y0}
              x2={x0}
              y2={y1}
              stroke="rgba(255,255,255,0.28)"
            />

            <path d={areaPath(WAVE)} fill={`url(#${fall})`} />

            <path
              d={curvePath(STANDARD)}
              stroke="#f87171"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeDasharray="5 6"
            />
            <path
              d={curvePath(WAVE)}
              stroke="#fca5a5"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={curvePath(GRASSMANN)}
              stroke="#c4b5fd"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <circle cx={endX} cy={standardY} r="4" fill="#f87171" />
            <circle cx={endX} cy={waveY} r="4.6" fill="#fca5a5" />
            <circle
              cx={endX}
              cy={grassY}
              r="5.6"
              fill="#c4b5fd"
              stroke="rgba(255,255,255,0.75)"
              strokeWidth="1.2"
            />
          </svg>

          <span
            className="pointer-events-none absolute text-[12px] font-light text-[#c4b5fd] md:text-[13px]"
            style={{
              right: 0,
              top: `${(grassY / H) * 100}%`,
              transform: "translate(-2px, -130%)",
            }}
          >
            97.1%
          </span>
          <span
            className="pointer-events-none absolute text-[12px] font-light text-[#fca5a5] md:text-[13px]"
            style={{
              right: 0,
              top: `${(waveY / H) * 100}%`,
              transform: "translate(-2px, 40%)",
            }}
          >
            25%
          </span>
        </div>
      </div>

      <ul className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1.5 text-[12px] font-light text-white/60 md:text-[13px]">
        {LEGEND.map((item) => (
          <li key={item.name} className="inline-flex items-center gap-2">
            <span aria-hidden className={`size-2 rounded-full ${item.swatch}`} />
            {item.name}
            <span className="text-white/40">· {item.value}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
