"use client";

import { useId } from "react";
import { Mark, ThesisHeroPlate, ThesisSvg } from "@/components/iota/thesis-graphics/chrome";
import { useThesisTime } from "@/components/iota/thesis-graphics/clock";
import { svgNum } from "@/components/iota/thesis-graphics/draw";

const BINDS = [
  { label: "Cortex", hint: "context" },
  { label: "Routes", hint: "models" },
  { label: "Policy", hint: "gates" },
  { label: "Behavior", hint: "loop" },
] as const;

const CYCLE = 2.25;
const FADE = 0.7;

function easeInOut(u: number) {
  const t = Math.min(1, Math.max(0, u));
  return t * t * (3 - 2 * t);
}

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function bindWeights(time: number) {
  const n = BINDS.length;
  const local = (time / CYCLE) % n;
  const i0 = Math.floor(local) % n;
  const i1 = (i0 + 1) % n;
  const u = local - Math.floor(local);
  const fadeStart = 1 - FADE / CYCLE;
  const blend = u <= fadeStart ? 0 : easeInOut((u - fadeStart) / (1 - fadeStart));
  return BINDS.map((_, i) => {
    if (i === i0) return 1 - blend;
    if (i === i1) return blend;
    return 0;
  });
}

function Arrow({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M${x - 5} ${y - 4} L${x} ${y} L${x - 5} ${y + 4}`}
      fill="none"
      stroke="rgba(180,175,255,0.75)"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

export function IqHero() {
  const uid = useId().replace(/:/g, "");
  const t = useThesisTime();
  const weights = bindWeights(t);
  const pulse = 0.55 + 0.45 * (0.5 + 0.5 * Math.sin(t * 1.7));
  const callTravel = easeInOut((t * 0.38) % 1);

  const bindTop = 42;
  const bindGap = 38;
  const bindX = 430;
  const bindW = 108;
  const spineX = 382;
  const hubRight = 308;

  return (
    <ThesisHeroPlate
      ariaLabel="An application calls IQ01. Behind the name are Cortex, routes, policy, and behavior."
      eyebrow="The contract"
      line="The application calls a name. The system binds the rest."
    >
      <ThesisSvg uid={uid}>
        <defs>
          <radialGradient id={`${uid}-hub`} cx="50%" cy="48%" r="58%">
            <stop offset="0%" stopColor="#5B50DD" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#5B50DD" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#5B50DD" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Column rails */}
        <line x1="148" y1="28" x2="148" y2="196" stroke="rgba(255,255,255,0.08)" />
        <line x1="330" y1="28" x2="330" y2="196" stroke="rgba(255,255,255,0.08)" />

        <Mark x={78} y={24} anchor="middle" size={10} fill="rgba(255,255,255,0.45)">
          01 Caller
        </Mark>
        <Mark x={236} y={24} anchor="middle" size={10} fill="rgba(255,255,255,0.45)">
          02 Contract
        </Mark>
        <Mark x={448} y={24} anchor="middle" size={10} fill="rgba(255,255,255,0.45)">
          03 Bindings
        </Mark>

        {/* 01 app */}
        <rect
          x="34"
          y="86"
          width="84"
          height="48"
          rx="12"
          fill="rgba(255,255,255,0.05)"
          stroke="rgba(255,255,255,0.22)"
        />
        <Mark x={76} y={108} anchor="middle" fill="rgba(255,255,255,0.88)" size={13}>
          app
        </Mark>
        <Mark x={76} y={124} anchor="middle" fill="rgba(255,255,255,0.35)" size={9}>
          request
        </Mark>

        {/* connector app → IQ01 */}
        <line
          x1="118"
          y1="110"
          x2="156"
          y2="110"
          stroke="rgba(180,175,255,0.45)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle
          cx={svgNum(118 + (156 - 118) * callTravel)}
          cy={110}
          r={2.4}
          fill="rgba(180,175,255,0.95)"
          filter={`url(#${uid}-glow)`}
        />
        <Arrow x={164} y={110} />

        {/* 02 IQ01 */}
        <ellipse
          cx={236}
          cy={110}
          rx={78}
          ry={50}
          fill={`url(#${uid}-hub)`}
          opacity={svgNum(0.55 + pulse * 0.28)}
        />
        <rect
          x="164"
          y="72"
          width="144"
          height="76"
          rx="16"
          fill={`rgba(91,80,221,${svgNum(0.22 + pulse * 0.08, 3)})`}
          stroke={`rgba(180,175,255,${svgNum(0.55 + pulse * 0.25, 3)})`}
          strokeWidth="1.3"
        />
        <Mark x={236} y={104} anchor="middle" fill="rgba(255,255,255,0.96)" size={18}>
          IQ01
        </Mark>
        <Mark x={236} y={124} anchor="middle" fill="rgba(255,255,255,0.4)" size={10}>
          profile
        </Mark>

        {/* connector IQ01 → bindings spine */}
        <line
          x1={hubRight}
          y1="110"
          x2={spineX}
          y2="110"
          stroke="rgba(180,175,255,0.35)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <Arrow x={spineX} y={110} />
        <circle
          cx={spineX}
          cy={110}
          r={3.2}
          fill="rgba(91,80,221,0.55)"
          stroke="rgba(180,175,255,0.7)"
          strokeWidth="1"
        />

        {/* spine */}
        <line
          x1={spineX}
          y1={bindTop + 12}
          x2={spineX}
          y2={bindTop + bindGap * 3 + 12}
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="1.2"
        />

        {/* 03 bindings */}
        {BINDS.map((bind, i) => {
          const w = weights[i];
          const cy = bindTop + i * bindGap + 12;
          const fillA = mix(0.04, 0.3, w);
          const borderA = mix(0.14, 0.75, w);
          const labelA = mix(0.45, 0.96, w);
          const hintA = mix(0.28, 0.55, w);
          const spokeA = mix(0.14, 0.7, w);

          return (
            <g key={bind.label}>
              <line
                x1={spineX}
                y1={cy}
                x2={bindX - 6}
                y2={cy}
                stroke={
                  w > 0.08
                    ? `rgba(180,175,255,${svgNum(spokeA, 3)})`
                    : `rgba(255,255,255,${svgNum(spokeA, 3)})`
                }
                strokeWidth={svgNum(mix(1, 1.6, w), 2)}
                strokeLinecap="round"
              />
              <circle
                cx={spineX}
                cy={cy}
                r={svgNum(mix(2, 3.4, w), 2)}
                fill={
                  w > 0.1
                    ? `rgba(91,80,221,${svgNum(0.35 + w * 0.45, 3)})`
                    : "rgba(255,255,255,0.12)"
                }
                stroke={
                  w > 0.1
                    ? `rgba(180,175,255,${svgNum(0.4 + w * 0.4, 3)})`
                    : "rgba(255,255,255,0.2)"
                }
                strokeWidth="0.9"
              />
              <rect
                x={bindX}
                y={cy - 14}
                width={bindW}
                height={28}
                rx="9"
                fill={
                  w > 0.08
                    ? `rgba(91,80,221,${svgNum(fillA, 3)})`
                    : `rgba(255,255,255,${svgNum(fillA, 3)})`
                }
                stroke={
                  w > 0.08
                    ? `rgba(180,175,255,${svgNum(borderA, 3)})`
                    : `rgba(255,255,255,${svgNum(borderA, 3)})`
                }
                strokeWidth={svgNum(1 + w * 0.4, 2)}
              />
              <Mark
                x={bindX + 12}
                y={cy + 4}
                fill={
                  w > 0.1
                    ? `rgba(180,175,255,${svgNum(labelA, 3)})`
                    : `rgba(255,255,255,${svgNum(labelA, 3)})`
                }
                size={11}
              >
                {bind.label}
              </Mark>
              <Mark
                x={bindX + bindW - 10}
                y={cy + 4}
                anchor="end"
                fill={`rgba(255,255,255,${svgNum(hintA, 3)})`}
                size={9}
              >
                {bind.hint}
              </Mark>
            </g>
          );
        })}
      </ThesisSvg>
    </ThesisHeroPlate>
  );
}
