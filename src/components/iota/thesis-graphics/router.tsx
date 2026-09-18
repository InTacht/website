"use client";

import { useId } from "react";
import { Mark, ThesisHeroPlate, ThesisSvg } from "@/components/iota/thesis-graphics/chrome";
import { useThesisTime } from "@/components/iota/thesis-graphics/clock";
import {
  clampIndex,
  easeInOut,
  mix,
  safeTime,
  svgNum,
} from "@/components/iota/thesis-graphics/draw";

const ROUTES = [
  { x: 168, y: 158, label: "efficient" },
  { x: 280, y: 168, label: "capable" },
  { x: 392, y: 158, label: "hold" },
] as const;

const PROMPT = { x: 280, y: 42 };
const EVIDENCE = { x: 280, y: 100 };
const POINT = 3.2;
const CYCLE = 2.2;
const FADE = 0.65;

function routeWeights(time: number) {
  const n = ROUTES.length;
  const t = safeTime(time);
  const local = (t / CYCLE) % n;
  const i0 = clampIndex(Math.floor(local), n);
  const i1 = clampIndex(i0 + 1, n);
  const u = local - Math.floor(local);
  const fadeStart = 1 - FADE / CYCLE;
  const blend = u <= fadeStart ? 0 : easeInOut((u - fadeStart) / (1 - fadeStart));
  return ROUTES.map((_, i) => {
    if (i === i0) return 1 - blend;
    if (i === i1) return blend;
    return 0;
  });
}

export function RouterHero() {
  const uid = useId().replace(/:/g, "");
  const t = safeTime(useThesisTime());
  const weights = routeWeights(t);
  const pulse = 0.55 + 0.45 * (0.5 + 0.5 * Math.sin(t * 1.7));
  const travel = easeInOut((t / CYCLE) % 1);
  const callTravel = easeInOut((t * 0.45) % 1);
  const activeIndex = clampIndex(
    weights.reduce((best, w, i, arr) => (w > arr[best] ? i : best), 0),
    ROUTES.length,
  );
  const active = ROUTES[activeIndex];

  return (
    <ThesisHeroPlate
      ariaLabel="Routing inspects evidence during the run and escalates only when it changes the answer."
      eyebrow="During the run"
      line="Inspect first. Escalate only if it changes the answer."
    >
      <ThesisSvg uid={uid}>
        <defs>
          <radialGradient id={`${uid}-hub`} cx="50%" cy="48%" r="50%">
            <stop offset="0%" stopColor="#5B50DD" stopOpacity="0.38" />
            <stop offset="55%" stopColor="#5B50DD" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#5B50DD" stopOpacity="0" />
          </radialGradient>
          <linearGradient
            id={`${uid}-path`}
            gradientUnits="userSpaceOnUse"
            x1={EVIDENCE.x}
            y1={EVIDENCE.y}
            x2={active.x}
            y2={active.y}
          >
            <stop offset="0%" stopColor="#B4AFFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#5B50DD" stopOpacity="0.55" />
          </linearGradient>
        </defs>

        <ellipse
          cx={EVIDENCE.x}
          cy={EVIDENCE.y}
          rx={70}
          ry={48}
          fill={`url(#${uid}-hub)`}
          opacity={svgNum(0.5 + pulse * 0.28)}
        />

        {/* quiet base fan */}
        {ROUTES.map((route) => (
          <line
            key={`base-${route.label}`}
            x1={EVIDENCE.x}
            y1={EVIDENCE.y}
            x2={route.x}
            y2={route.y}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
        ))}

        {/* prompt → evidence */}
        <line
          x1={PROMPT.x}
          y1={PROMPT.y}
          x2={EVIDENCE.x}
          y2={EVIDENCE.y}
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="1"
        />
        <circle
          cx={svgNum(PROMPT.x + (EVIDENCE.x - PROMPT.x) * callTravel)}
          cy={svgNum(PROMPT.y + (EVIDENCE.y - PROMPT.y) * callTravel)}
          r={1.8}
          fill="rgba(255,255,255,0.55)"
        />

        {/* active route */}
        {ROUTES.map((route, i) => {
          const w = weights[i];
          if (w < 0.05) return null;
          const dx = route.x - EVIDENCE.x;
          const dy = route.y - EVIDENCE.y;
          const beadX = EVIDENCE.x + dx * travel;
          const beadY = EVIDENCE.y + dy * travel;
          const isLead = i === activeIndex;
          return (
            <g key={`spoke-${route.label}`}>
              <line
                x1={EVIDENCE.x}
                y1={EVIDENCE.y}
                x2={route.x}
                y2={route.y}
                stroke={
                  isLead
                    ? `url(#${uid}-path)`
                    : `rgba(180,175,255,${svgNum(0.12 + w * 0.35, 3)})`
                }
                strokeWidth={svgNum(isLead ? 1.5 : 1 + w * 0.3, 2)}
                strokeLinecap="round"
                opacity={svgNum(0.35 + w * 0.65, 3)}
              />
              {isLead ? (
                <circle
                  cx={svgNum(beadX)}
                  cy={svgNum(beadY)}
                  r={1.8}
                  fill="rgba(255,255,255,0.9)"
                  filter={`url(#${uid}-glow)`}
                />
              ) : null}
            </g>
          );
        })}

        {/* points — fixed size */}
        <circle
          cx={PROMPT.x}
          cy={PROMPT.y}
          r={POINT}
          fill="rgba(255,255,255,0.35)"
        />
        <Mark
          x={PROMPT.x}
          y={PROMPT.y - 12}
          anchor="middle"
          fill="rgba(255,255,255,0.55)"
          size={10}
        >
          prompt
        </Mark>

        <circle
          cx={EVIDENCE.x}
          cy={EVIDENCE.y}
          r={POINT}
          fill={`rgba(255,255,255,${svgNum(0.82 + pulse * 0.15, 3)})`}
        />
        <Mark
          x={EVIDENCE.x + 42}
          y={EVIDENCE.y + 4}
          fill="rgba(255,255,255,0.5)"
          size={10}
        >
          evidence
        </Mark>

        {ROUTES.map((route, i) => {
          const w = weights[i];
          const labelA = mix(0.32, 0.92, w);
          return (
            <g key={route.label}>
              <circle
                cx={route.x}
                cy={route.y}
                r={POINT}
                fill={
                  w > 0.15
                    ? `rgba(255,255,255,${svgNum(0.82 + w * 0.15, 3)})`
                    : "rgba(255,255,255,0.22)"
                }
              />
              <Mark
                x={route.x}
                y={route.y + 16}
                anchor="middle"
                fill={`rgba(255,255,255,${svgNum(labelA, 3)})`}
                size={10}
              >
                {route.label}
              </Mark>
            </g>
          );
        })}
      </ThesisSvg>
    </ThesisHeroPlate>
  );
}
