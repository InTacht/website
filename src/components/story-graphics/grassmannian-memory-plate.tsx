"use client";

import { useEffect, useId, useState } from "react";

const W = 640;
const H = 300;
const CX = 428;
const CY = 152;
const HAYSTACK = [
  [58, 72],
  [86, 64],
  [74, 98],
  [112, 86],
  [48, 118],
  [96, 124],
  [128, 108],
  [68, 148],
  [108, 152],
  [140, 136],
  [54, 176],
  [90, 180],
  [124, 172],
  [152, 90],
  [160, 158],
  [78, 208],
  [116, 204],
  [148, 196],
  [42, 148],
  [168, 120],
] as const;
const NEEDLE = 6;
const PIN_LOCAL = { x: CX + 74, y: CY - 22 };

function rotate(x: number, y: number, cx: number, cy: number, deg: number) {
  const r = (deg * Math.PI) / 180;
  const dx = x - cx;
  const dy = y - cy;
  return {
    x: cx + dx * Math.cos(r) - dy * Math.sin(r),
    y: cy + dx * Math.sin(r) + dy * Math.cos(r),
  };
}

/**
 * Act 4 — Grassmannian precision memory.
 * A long conversation is a haystack. Memory is a fixed-size map. One pin finds the needle.
 */
export function GrassmannianMemoryPlate() {
  const uid = useId().replace(/:/g, "");
  const glow = `gm-glow-${uid}`;
  const wash = `gm-wash-${uid}`;
  const [t, setT] = useState(0.6);
  const tilt = 7.5 * Math.sin(t * 0.32);
  const pin = rotate(PIN_LOCAL.x, PIN_LOCAL.y, CX, CY, tilt);
  const hay = HAYSTACK[NEEDLE];
  const pulse = 0.55 + 0.35 * (0.5 + 0.5 * Math.sin(t * 1.7));

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const start = performance.now();
    let frame = 0;
    let last = 0;
    const tick = (now: number) => {
      if (now - last >= 32) {
        last = now;
        setT((now - start) / 1000 + 0.6);
      }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <article
      aria-label="A long conversation is a haystack of details. Grassmannian memory maps it into a fixed-size geometry and pins the needle."
      className="relative mt-6 overflow-hidden rounded-[1.5rem] border border-[rgba(255,255,255,0.18)] pb-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22)] md:pb-5"
    >
      <header className="grid grid-cols-[0.38fr_1fr] items-end gap-3 px-5 pt-4 md:px-6 md:pt-5">
        <div className="min-w-0">
          <p className="text-[10px] font-light uppercase tracking-[0.2em] text-white/40">
            Haystack
          </p>
          <p className="mt-1 truncate text-[13px] font-light text-white/85 md:text-sm">
            the conversation
          </p>
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-light uppercase tracking-[0.2em] text-white/40">
            Fixed memory
          </p>
          <p className="mt-1 truncate text-[13px] font-light text-white/85 md:text-sm">
            one pin, same size
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
              <stop offset="0%" stopColor="#8f55fb" stopOpacity="0.42" />
              <stop offset="62%" stopColor="#8f55fb" stopOpacity="0.1" />
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
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
            </filter>
          </defs>

          <ellipse
            cx={CX}
            cy={CY}
            rx="128"
            ry="72"
            fill={`url(#${wash})`}
            filter={`url(#${glow})`}
          />

          <path
            d={`M${hay[0]} ${hay[1]} C${hay[0] + 86} ${hay[1] - 10}, ${pin.x - 70} ${pin.y + 8}, ${pin.x.toFixed(1)} ${pin.y.toFixed(1)}`}
            fill="none"
            stroke={`rgba(196,181,253,${(0.18 + pulse * 0.28).toFixed(3)})`}
            strokeWidth="1.3"
            strokeLinecap="round"
          />

          {HAYSTACK.map(([x, y], i) => {
            const needle = i === NEEDLE;
            return (
              <circle
                key={`${x}-${y}`}
                cx={x}
                cy={y}
                r={needle ? 3.1 : 1.7 + (i % 3) * 0.25}
                fill={
                  needle
                    ? `rgba(196,181,253,${pulse.toFixed(3)})`
                    : "rgba(255,255,255,0.22)"
                }
                stroke={
                  needle ? "rgba(196,181,253,0.9)" : "rgba(255,255,255,0.08)"
                }
                strokeWidth={needle ? 1 : 0.5}
              />
            );
          })}

          <rect
            x="292"
            y="36"
            width="312"
            height="228"
            rx="12"
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1.1"
          />

          <g transform={`rotate(${tilt.toFixed(2)} ${CX} ${CY})`}>
            <ellipse
              cx={CX}
              cy={CY}
              rx="96"
              ry="46"
              fill="none"
              stroke="rgba(196,181,253,0.88)"
              strokeWidth="1.7"
            />
            <ellipse
              cx={CX}
              cy={CY}
              rx="62"
              ry="98"
              fill="none"
              stroke="rgba(143,85,251,0.7)"
              strokeWidth="1.35"
              transform={`rotate(28 ${CX} ${CY})`}
            />
            <ellipse
              cx={CX}
              cy={CY}
              rx="88"
              ry="38"
              fill="none"
              stroke="rgba(255,255,255,0.32)"
              strokeWidth="1.15"
              transform={`rotate(-24 ${CX} ${CY})`}
            />
          </g>

          <circle
            cx={pin.x}
            cy={pin.y}
            r={11.5 + Math.sin(t * 1.7) * 1.3}
            fill="none"
            stroke="rgba(196,181,253,0.34)"
            strokeWidth="1"
          />
          <circle
            cx={pin.x}
            cy={pin.y}
            r="7.8"
            fill="rgba(143,85,251,0.4)"
            stroke="rgba(196,181,253,0.95)"
            strokeWidth="1.3"
          />
          <circle cx={pin.x} cy={pin.y} r="2.3" fill="#ffffff" />

          <text
            x={pin.x + 16}
            y={pin.y + 5}
            fill="rgba(196,181,253,0.95)"
            fontFamily="var(--font-inter), system-ui, sans-serif"
            fontSize="13"
            letterSpacing="1.6"
          >
            PIN
          </text>
        </svg>
      </div>
    </article>
  );
}
