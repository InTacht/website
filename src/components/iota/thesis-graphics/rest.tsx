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

const STEPS = [
  { x: 70, label: "01" },
  { x: 154, label: "02" },
  { x: 238, label: "03" },
  { x: 322, label: "04" },
  { x: 406, label: "05" },
  { x: 490, label: "06" },
] as const;

const Y = 110;
const POINT = 3.2;
const CYCLE = 2.15;
const FADE = 0.65;

function stepState(time: number) {
  const n = STEPS.length;
  const t = safeTime(time);
  const local = (t / CYCLE) % n;
  const i0 = clampIndex(Math.floor(local), n);
  const i1 = clampIndex(i0 + 1, n);
  const u = local - Math.floor(local);
  const fadeStart = 1 - FADE / CYCLE;
  const blend = u <= fadeStart ? 0 : easeInOut((u - fadeStart) / (1 - fadeStart));
  const weights = STEPS.map((_, i) => {
    if (i === i0) return 1 - blend;
    if (i === i1) return blend;
    return 0;
  });
  return { i0, i1, blend, weights, wraps: i0 === n - 1 && i1 === 0 };
}

export function LearningHero() {
  const uid = useId().replace(/:/g, "");
  const t = safeTime(useThesisTime());
  const { i0, i1, weights, wraps } = stepState(t);
  const pulse = 0.55 + 0.45 * (0.5 + 0.5 * Math.sin(t * 1.7));
  const travel = easeInOut((t / CYCLE) % 1);
  const activeIndex = clampIndex(
    weights.reduce((best, w, i, arr) => (w > arr[best] ? i : best), 0),
    STEPS.length,
  );
  const from = STEPS[i0];
  const to = STEPS[i1];
  const active = STEPS[activeIndex];
  const beadX = wraps ? to.x : mix(from.x, to.x, travel);
  const completedThrough = wraps ? 0 : activeIndex;

  return (
    <ThesisHeroPlate
      ariaLabel="Self-learning is an auditable ladder from recorded traces to validated promotion."
      eyebrow="The ladder"
      line="Record. Confirm. Reuse. Do not promote silence."
    >
      <ThesisSvg uid={uid}>
        <defs>
          <radialGradient id={`${uid}-step`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5B50DD" stopOpacity="0.4" />
            <stop offset="55%" stopColor="#5B50DD" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#5B50DD" stopOpacity="0" />
          </radialGradient>
          <linearGradient
            id={`${uid}-path`}
            gradientUnits="userSpaceOnUse"
            x1={from.x}
            y1={Y}
            x2={to.x}
            y2={Y}
          >
            <stop offset="0%" stopColor="#B4AFFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#5B50DD" stopOpacity="0.55" />
          </linearGradient>
        </defs>

        <ellipse
          cx={active.x}
          cy={Y}
          rx={42}
          ry={36}
          fill={`url(#${uid}-step)`}
          opacity={svgNum(0.45 + pulse * 0.3)}
        />

        {/* quiet rail */}
        {STEPS.slice(0, -1).map((step, i) => (
          <line
            key={`rail-${step.label}`}
            x1={step.x}
            y1={Y}
            x2={STEPS[i + 1].x}
            y2={Y}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
        ))}

        {/* completed path */}
        {STEPS.slice(0, -1).map((step, i) => {
          if (i >= completedThrough) return null;
          return (
            <line
              key={`done-${step.label}`}
              x1={step.x}
              y1={Y}
              x2={STEPS[i + 1].x}
              y2={Y}
              stroke="rgba(180,175,255,0.35)"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          );
        })}

        {/* active segment + bead (no reverse jump on wrap) */}
        {!wraps ? (
          <>
            <line
              x1={from.x}
              y1={Y}
              x2={to.x}
              y2={Y}
              stroke={`url(#${uid}-path)`}
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity={svgNum(0.55 + pulse * 0.35)}
            />
            <circle
              cx={svgNum(beadX)}
              cy={Y}
              r={1.8}
              fill="rgba(255,255,255,0.9)"
              filter={`url(#${uid}-glow)`}
            />
          </>
        ) : (
          <circle
            cx={STEPS[0].x}
            cy={Y}
            r={1.8}
            fill="rgba(255,255,255,0.9)"
            filter={`url(#${uid}-glow)`}
            opacity={svgNum(0.4 + pulse * 0.5)}
          />
        )}

        {/* fixed points — Experts language */}
        {STEPS.map((step, i) => {
          const w = weights[i];
          const labelA = mix(0.32, 0.92, Math.max(w, i < completedThrough ? 0.45 : 0));
          return (
            <g key={step.label}>
              <circle
                cx={step.x}
                cy={Y}
                r={POINT}
                fill={
                  w > 0.15 || i < completedThrough
                    ? `rgba(255,255,255,${svgNum(0.82 + Math.max(w, 0.2) * 0.15)})`
                    : "rgba(255,255,255,0.22)"
                }
              />
              <Mark
                x={step.x}
                y={Y + 22}
                anchor="middle"
                fill={`rgba(255,255,255,${svgNum(labelA)})`}
                size={10}
              >
                {step.label}
              </Mark>
            </g>
          );
        })}
      </ThesisSvg>
    </ThesisHeroPlate>
  );
}

const STACK = [
  { x: 110, label: "Field-IQ", role: "research" },
  { x: 280, label: "IOTA", role: "composition" },
  { x: 450, label: "XQUA", role: "infrastructure" },
] as const;

function stackWeights(time: number) {
  const n = STACK.length;
  const t = safeTime(time);
  const local = (t / CYCLE) % n;
  const i0 = clampIndex(Math.floor(local), n);
  const i1 = clampIndex(i0 + 1, n);
  const u = local - Math.floor(local);
  const fadeStart = 1 - FADE / CYCLE;
  const blend = u <= fadeStart ? 0 : easeInOut((u - fadeStart) / (1 - fadeStart));
  return STACK.map((_, i) => {
    if (i === i0) return 1 - blend;
    if (i === i1) return blend;
    return 0;
  });
}

export function CloseHero() {
  const uid = useId().replace(/:/g, "");
  const t = safeTime(useThesisTime());
  const weights = stackWeights(t);
  const pulse = 0.55 + 0.45 * (0.5 + 0.5 * Math.sin(t * 1.7));
  const travel = easeInOut((t / CYCLE) % 1);
  const activeIndex = clampIndex(
    weights.reduce((best, w, i, arr) => (w > arr[best] ? i : best), 0),
    STACK.length,
  );
  const i0 = clampIndex(Math.floor((t / CYCLE) % STACK.length), STACK.length);
  const i1 = clampIndex(i0 + 1, STACK.length);
  const wraps = i0 === STACK.length - 1 && i1 === 0;
  const from = STACK[i0];
  const to = STACK[i1];
  const active = STACK[activeIndex];
  const beadX = wraps ? STACK[0].x : mix(from.x, to.x, travel);
  const iota = STACK[1];

  return (
    <ThesisHeroPlate
      ariaLabel="Field-IQ explores foundations. IOTA composes them. XQUA runs them."
      eyebrow="The stack"
      line="Research. Composition. Infrastructure."
    >
      <ThesisSvg uid={uid}>
        <defs>
          <radialGradient id={`${uid}-hub`} cx="50%" cy="48%" r="50%">
            <stop offset="0%" stopColor="#5B50DD" stopOpacity="0.42" />
            <stop offset="55%" stopColor="#5B50DD" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#5B50DD" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${uid}-focus`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5B50DD" stopOpacity="0.32" />
            <stop offset="60%" stopColor="#5B50DD" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#5B50DD" stopOpacity="0" />
          </radialGradient>
          <linearGradient
            id={`${uid}-path`}
            gradientUnits="userSpaceOnUse"
            x1={from.x}
            y1={Y}
            x2={to.x}
            y2={Y}
          >
            <stop offset="0%" stopColor="#B4AFFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#5B50DD" stopOpacity="0.55" />
          </linearGradient>
        </defs>

        {/* IOTA stays the composition center */}
        <ellipse
          cx={iota.x}
          cy={Y}
          rx={64}
          ry={44}
          fill={`url(#${uid}-hub)`}
          opacity={svgNum(0.5 + pulse * 0.28)}
        />
        <ellipse
          cx={active.x}
          cy={Y}
          rx={38}
          ry={32}
          fill={`url(#${uid}-focus)`}
          opacity={svgNum(0.35 + pulse * 0.25)}
        />

        {/* quiet rail */}
        <line
          x1={STACK[0].x}
          y1={Y}
          x2={STACK[2].x}
          y2={Y}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
        />

        {/* active segment + bead */}
        {!wraps ? (
          <>
            <line
              x1={from.x}
              y1={Y}
              x2={to.x}
              y2={Y}
              stroke={`url(#${uid}-path)`}
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity={svgNum(0.55 + pulse * 0.35)}
            />
            <circle
              cx={svgNum(beadX)}
              cy={Y}
              r={1.8}
              fill="rgba(255,255,255,0.9)"
              filter={`url(#${uid}-glow)`}
            />
          </>
        ) : (
          <circle
            cx={STACK[0].x}
            cy={Y}
            r={1.8}
            fill="rgba(255,255,255,0.9)"
            filter={`url(#${uid}-glow)`}
            opacity={svgNum(0.4 + pulse * 0.5)}
          />
        )}

        {STACK.map((node, i) => {
          const w = weights[i];
          const isIota = i === 1;
          const labelA = mix(0.38, 0.95, Math.max(w, isIota ? 0.55 : 0));
          return (
            <g key={node.label}>
              <circle
                cx={node.x}
                cy={Y}
                r={POINT}
                fill={
                  w > 0.15 || isIota
                    ? `rgba(255,255,255,${svgNum(0.82 + Math.max(w, isIota ? 0.35 : 0) * 0.15)})`
                    : "rgba(255,255,255,0.22)"
                }
              />
              <Mark
                x={node.x}
                y={Y + 22}
                anchor="middle"
                fill={`rgba(255,255,255,${svgNum(labelA)})`}
                size={11}
              >
                {node.label}
              </Mark>
              <Mark
                x={node.x}
                y={Y + 38}
                anchor="middle"
                fill={`rgba(255,255,255,${svgNum(mix(0.22, 0.55, Math.max(w, isIota ? 0.4 : 0)))})`}
                size={9}
              >
                {node.role}
              </Mark>
            </g>
          );
        })}
      </ThesisSvg>
    </ThesisHeroPlate>
  );
}
