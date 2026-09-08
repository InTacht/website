"use client";

import { useEffect, useId, useMemo, useState } from "react";

const W = 640;
const H = 300;
const PAGE = { x: 36, y: 36, w: 148, h: 228 };
const LINE_X = PAGE.x + 18;
const WAVE_X0 = PAGE.x + PAGE.w;
const WAVE_X1 = 612;
const READ_X = 502;
const LINE_GAP = 26;
const LINE_H = 6;

const LINES = [108, 102, 110, 86, 74] as const;
const LINE_BLOCK = (LINES.length - 1) * LINE_GAP + LINE_H;
const LINE_START = (PAGE.h - LINE_BLOCK) / 2;

const WAVES = [
  {
    line: 1,
    amp: 16,
    freq: 0.034,
    speed: 1.02,
    stroke: "rgba(196,181,253,0.95)",
    width: 2.3,
    bar: "rgba(196,181,253,0.92)",
  },
  {
    line: 2,
    amp: 11,
    freq: 0.05,
    speed: 1.22,
    stroke: "rgba(143,85,251,0.72)",
    width: 1.65,
    bar: "rgba(143,85,251,0.58)",
  },
  {
    line: 3,
    amp: 8,
    freq: 0.023,
    speed: 0.8,
    stroke: "rgba(226,212,255,0.72)",
    width: 1.4,
    bar: "rgba(226,212,255,0.52)",
  },
] as const;

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function lineY(index: number) {
  return PAGE.y + LINE_START + index * LINE_GAP + LINE_H / 2;
}

function envelope(x: number) {
  const grow = clamp01((x - WAVE_X0) / 118);
  return grow * grow * (3 - 2 * grow);
}

function fieldY(x: number, t: number, wave: (typeof WAVES)[number]) {
  const base = lineY(wave.line);
  return (
    base +
    wave.amp *
      envelope(x) *
      Math.sin(wave.freq * (x - WAVE_X0) + t * wave.speed)
  );
}

function fieldPath(t: number, wave: (typeof WAVES)[number]) {
  const y0 = lineY(wave.line);
  const xStart = LINE_X + LINES[wave.line];
  let d = `M${xStart.toFixed(1)} ${y0.toFixed(1)}`;
  for (let x = xStart + 2; x <= WAVE_X1; x += 2) {
    d += ` L${x.toFixed(1)} ${fieldY(x, t, wave).toFixed(1)}`;
  }
  return d;
}

/**
 * Act 4 — holographic wave fields.
 * Every line of the page writes into one field. One sample reads it.
 */
export function HolographicWavePlate() {
  const uid = useId().replace(/:/g, "");
  const glow = `hf-glow-${uid}`;
  const wash = `hf-wash-${uid}`;
  const fade = `hf-fade-${uid}`;
  const emerge = `hf-emerge-${uid}`;
  const lineGlow = `hf-line-${uid}`;
  const [t, setT] = useState(0.8);
  const paths = useMemo(() => WAVES.map((wave) => fieldPath(t, wave)), [t]);
  const readYs = WAVES.map((wave) => fieldY(READ_X, t, wave));
  const readY = readYs[0];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const start = performance.now();
    let frame = 0;
    let last = 0;
    const tick = (now: number) => {
      if (now - last >= 32) {
        last = now;
        setT((now - start) / 1000 + 0.8);
      }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <article
      aria-label="Context is the document. A holographic wave field stores that whole document as one wave, so one read gets the page."
      className="relative mt-6 overflow-hidden rounded-[1.5rem] border border-[rgba(255,255,255,0.18)] pb-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22)] md:pb-5"
    >
      <header className="grid grid-cols-[0.38fr_1fr] items-end gap-3 px-5 pt-4 md:px-6 md:pt-5">
        <div className="min-w-0">
          <p className="text-[10px] font-light uppercase tracking-[0.2em] text-white/40">
            Context
          </p>
          <p className="mt-1 truncate text-[13px] font-light text-white/85 md:text-sm">
            the document
          </p>
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-light uppercase tracking-[0.2em] text-white/40">
            Holographic wave field
          </p>
          <p className="mt-1 truncate text-[13px] font-light text-white/85 md:text-sm">
            the whole page, as a wave
          </p>
        </div>
      </header>

      <div className="relative aspect-[2.15/1] min-h-[168px] w-full">
        <svg
          aria-hidden
          viewBox={`0 0 ${W} ${H}`}
          className="pointer-events-none absolute inset-0 size-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <radialGradient id={wash} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8f55fb" stopOpacity="0.44" />
              <stop offset="62%" stopColor="#8f55fb" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#8f55fb" stopOpacity="0" />
            </radialGradient>
            <linearGradient
              id={fade}
              x1={WAVE_X0}
              y1="0"
              x2={WAVE_X1}
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#fff" />
              <stop offset="88%" stopColor="#fff" />
              <stop offset="100%" stopColor="#000" />
            </linearGradient>
            <mask
              id={emerge}
              maskUnits="userSpaceOnUse"
              x={LINE_X}
              y="0"
              width={WAVE_X1 - LINE_X}
              height={H}
            >
              <rect
                x={LINE_X}
                y="0"
                width={WAVE_X1 - LINE_X}
                height={H}
                fill={`url(#${fade})`}
              />
            </mask>
            <filter
              id={glow}
              x="-80%"
              y="-80%"
              width="260%"
              height="260%"
              colorInterpolationFilters="sRGB"
            >
              <feGaussianBlur in="SourceGraphic" stdDeviation="12" />
            </filter>
            <filter
              id={lineGlow}
              x="-20%"
              y="-80%"
              width="140%"
              height="260%"
              colorInterpolationFilters="sRGB"
            >
              <feGaussianBlur in="SourceGraphic" stdDeviation="3.4" />
            </filter>
          </defs>

          <ellipse
            cx="424"
            cy={lineY(2)}
            rx="170"
            ry="78"
            fill={`url(#${wash})`}
            filter={`url(#${glow})`}
          />

          <rect
            x={PAGE.x + 14}
            y={PAGE.y + 14}
            width={PAGE.w}
            height={PAGE.h}
            rx="11"
            fill="rgba(255,255,255,0.03)"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
          <rect
            x={PAGE.x + 7}
            y={PAGE.y + 7}
            width={PAGE.w}
            height={PAGE.h}
            rx="11"
            fill="rgba(255,255,255,0.05)"
            stroke="rgba(255,255,255,0.11)"
            strokeWidth="1"
          />
          <rect
            x={PAGE.x}
            y={PAGE.y}
            width={PAGE.w}
            height={PAGE.h}
            rx="11"
            fill="rgba(255,255,255,0.08)"
            stroke="rgba(255,255,255,0.24)"
            strokeWidth="1.1"
          />
          {LINES.map((width, i) => {
            const live = WAVES.find((wave) => wave.line === i);
            return (
              <rect
                key={`${width}-${i}`}
                x={LINE_X}
                y={PAGE.y + LINE_START + i * LINE_GAP}
                width={width}
                height={LINE_H}
                rx="3"
                fill={live ? live.bar : "rgba(255,255,255,0.2)"}
              />
            );
          })}

          <g mask={`url(#${emerge})`}>
            <path
              d={paths[0]}
              fill="none"
              stroke="rgba(143,85,251,0.5)"
              strokeWidth="7"
              strokeLinecap="round"
              filter={`url(#${lineGlow})`}
            />
            {paths.map((d, i) => (
              <path
                key={WAVES[i].freq}
                d={d}
                fill="none"
                stroke={WAVES[i].stroke}
                strokeWidth={WAVES[i].width}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </g>

          <line
            x1={READ_X}
            y1={Math.min(...readYs) - 6}
            x2={READ_X}
            y2={Math.max(...readYs) + 6}
            stroke="rgba(196,181,253,0.28)"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <circle
            cx={READ_X}
            cy={readY}
            r={12.2 + Math.sin(t * 2.05) * 1.4}
            fill="none"
            stroke="rgba(196,181,253,0.34)"
            strokeWidth="1"
          />
          <circle
            cx={READ_X}
            cy={readY}
            r="8.2"
            fill="rgba(143,85,251,0.38)"
            stroke="rgba(196,181,253,0.95)"
            strokeWidth="1.3"
          />
          <circle cx={READ_X} cy={readY} r="2.3" fill="#ffffff" />

          <text
            x={READ_X + 16}
            y={readY + 5}
            fill="rgba(196,181,253,0.95)"
            fontFamily="var(--font-inter), system-ui, sans-serif"
            fontSize="13"
            letterSpacing="1.6"
          >
            READ
          </text>
        </svg>
      </div>
    </article>
  );
}
