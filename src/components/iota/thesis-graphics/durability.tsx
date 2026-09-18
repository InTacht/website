"use client";

import { useId } from "react";
import {
  IOTA,
  IOTA_LINE,
  IOTA_TEXT,
  Mark,
  ThesisHeroPlate,
  ThesisSvg,
} from "@/components/iota/thesis-graphics/chrome";
import { useThesisTime } from "@/components/iota/thesis-graphics/clock";
import { svgNum } from "@/components/iota/thesis-graphics/draw";

const LAYERS = [
  "application Cortex",
  "workflow Cortex",
  "source fragments",
  "computed results",
  "confirmed paths",
  "recent window",
] as const;

const STACK_X = 56;
const STACK_W = 236;
const ROW_H = 22;
const ROW_GAP = 28;
const ROW0 = 34;
const WINDOW = 2; // layers visible in the working set
const POSITIONS = LAYERS.length - WINDOW + 1; // 5 slides: (0,1) … (4,5)
const CYCLE = 2.35;
const FADE = 0.7;
const CARD_W = 152;
const CARD_H = 72;
const CARD_X = 360;

function easeInOut(u: number) {
  const t = Math.min(1, Math.max(0, u));
  return t * t * (3 - 2 * t);
}

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function slideState(time: number) {
  const local = (time / CYCLE) % POSITIONS;
  const i0 = Math.floor(local) % POSITIONS;
  const i1 = (i0 + 1) % POSITIONS;
  const u = local - Math.floor(local);
  const fadeStart = 1 - FADE / CYCLE;
  const blend = u <= fadeStart ? 0 : easeInOut((u - fadeStart) / (1 - fadeStart));
  return { start: mix(i0, i1, blend), i0, i1, blend };
}

function layerWeight(index: number, start: number) {
  // 1 inside the sliding window, soft falloff just outside
  const lo = start;
  const hi = start + WINDOW - 1;
  if (index >= lo && index <= hi) return 1;
  const dist = index < lo ? lo - index : index - hi;
  return Math.max(0, 1 - dist * 0.85);
}

export function DurabilityHero() {
  const uid = useId().replace(/:/g, "");
  const t = useThesisTime();
  const { start } = slideState(t);
  const pulse = 0.55 + 0.45 * (0.5 + 0.5 * Math.sin(t * 1.65));
  const travel = easeInOut((t / CYCLE) % 1);

  const sliceY = ROW0 + start * ROW_GAP;
  const sliceH = WINDOW * ROW_H + (WINDOW - 1) * (ROW_GAP - ROW_H) + 6;
  const cardY = sliceY + sliceH / 2 - CARD_H / 2;
  const midY = sliceY + sliceH / 2;
  const stackRight = STACK_X + STACK_W;
  const bridgeX = mix(stackRight + 8, CARD_X - 6, travel);

  return (
    <ThesisHeroPlate
      ariaLabel="The model sees a working set. IOTA retains the larger stitched state."
      eyebrow="Working set"
      line="The model sees a slice. Cortex keeps the rest."
    >
      <ThesisSvg uid={uid}>
        <defs>
          <linearGradient
            id={`${uid}-slice`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor={IOTA} stopOpacity="0.28" />
            <stop offset="100%" stopColor={IOTA} stopOpacity="0.08" />
          </linearGradient>
          <linearGradient
            id={`${uid}-bridge`}
            gradientUnits="userSpaceOnUse"
            x1={stackRight}
            y1={midY}
            x2={CARD_X}
            y2={midY}
          >
            <stop offset="0%" stopColor="#B4AFFF" stopOpacity="0.85" />
            <stop offset="100%" stopColor={IOTA} stopOpacity="0.45" />
          </linearGradient>
          <radialGradient id={`${uid}-card`} cx="50%" cy="45%" r="62%">
            <stop offset="0%" stopColor={IOTA} stopOpacity="0.42" />
            <stop offset="55%" stopColor={IOTA} stopOpacity="0.12" />
            <stop offset="100%" stopColor={IOTA} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* quiet stack spine */}
        <line
          x1={STACK_X - 10}
          y1={ROW0 + 4}
          x2={STACK_X - 10}
          y2={ROW0 + (LAYERS.length - 1) * ROW_GAP + ROW_H - 4}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
        />

        {/* durable layers */}
        {LAYERS.map((layer, i) => {
          const w = layerWeight(i, start);
          const y = ROW0 + i * ROW_GAP;
          const fillA = mix(0.04, 0.14, w);
          const strokeA = mix(0.08, 0.55, w);
          const textA = mix(0.28, 0.9, w);
          return (
            <g key={layer}>
              <rect
                x={STACK_X}
                y={y}
                width={STACK_W}
                height={ROW_H}
                rx="6"
                fill={`rgba(255,255,255,${svgNum(fillA)})`}
                stroke={
                  w > 0.55
                    ? `rgba(180,175,255,${svgNum(0.25 + w * 0.45)})`
                    : `rgba(255,255,255,${svgNum(strokeA)})`
                }
              />
              <Mark
                x={STACK_X + 12}
                y={y + 15}
                fill={`rgba(255,255,255,${svgNum(textA)})`}
              >
                {layer}
              </Mark>
              {/* left tick for in-window rows */}
              {w > 0.55 ? (
                <circle
                  cx={STACK_X - 10}
                  cy={y + ROW_H / 2}
                  r={2.4}
                  fill={IOTA}
                  opacity={svgNum(0.45 + w * 0.5)}
                />
              ) : (
                <circle
                  cx={STACK_X - 10}
                  cy={y + ROW_H / 2}
                  r={1.6}
                  fill="rgba(255,255,255,0.18)"
                />
              )}
            </g>
          );
        })}

        {/* sliding slice over the stack */}
        <rect
          x={STACK_X - 4}
          y={svgNum(sliceY - 4)}
          width={STACK_W + 8}
          height={svgNum(sliceH + 2)}
          rx="10"
          fill={`url(#${uid}-slice)`}
          stroke={IOTA_LINE}
          strokeOpacity={svgNum(0.35 + pulse * 0.25)}
          strokeWidth="1"
        />

        {/* bridge from Cortex slice → this turn */}
        <line
          x1={stackRight + 4}
          y1={svgNum(midY)}
          x2={CARD_X - 4}
          y2={svgNum(midY)}
          stroke={`url(#${uid}-bridge)`}
          strokeWidth="1.6"
          opacity={svgNum(0.55 + pulse * 0.35)}
        />
        <circle
          cx={svgNum(bridgeX)}
          cy={svgNum(midY)}
          r={2.8}
          fill="#B4AFFF"
          opacity={svgNum(0.75 + pulse * 0.2)}
        />

        {/* working-set card */}
        <ellipse
          cx={CARD_X + CARD_W / 2}
          cy={svgNum(cardY + CARD_H / 2)}
          rx={78}
          ry={48}
          fill={`url(#${uid}-card)`}
          opacity={svgNum(0.45 + pulse * 0.3)}
        />
        <rect
          x={CARD_X}
          y={svgNum(cardY)}
          width={CARD_W}
          height={CARD_H}
          rx="12"
          fill="rgba(91,80,221,0.18)"
          stroke={IOTA_LINE}
          strokeOpacity={svgNum(0.55 + pulse * 0.35)}
        />
        <Mark
          x={CARD_X + CARD_W / 2}
          y={svgNum(cardY + CARD_H / 2 + 4)}
          anchor="middle"
          fill={IOTA_TEXT}
          size={12}
        >
          this turn
        </Mark>
      </ThesisSvg>
    </ThesisHeroPlate>
  );
}
