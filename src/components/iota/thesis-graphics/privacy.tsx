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

/** Subsets that leave the source. Rest stay local. */
const SLICES = [
  [0, 1],
  [4],
  [2, 5],
  [3, 4, 5],
  [6, 7],
  [1, 4, 7],
] as const;

const CELL_W = 44;
const CELL_H = 18;
const COL_GAP = 56;
const ROW_GAP = 32;
const GRID_X = 80;
const GRID_Y = 58;
const SOURCE_X = 64;
const SOURCE_Y = 42;
const SOURCE_W = 200;
const SOURCE_H = 128;
const CARD_X = 348;
const CARD_Y = 78;
const CARD_W = 156;
const CARD_H = 58;
const CYCLE = 2.4;
const FADE = 0.7;

function easeInOut(u: number) {
  const t = Math.min(1, Math.max(0, u));
  return t * t * (3 - 2 * t);
}

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function cellCenter(i: number) {
  const col = i % 3;
  const row = Math.floor(i / 3);
  return {
    x: GRID_X + col * COL_GAP + CELL_W / 2,
    y: GRID_Y + row * ROW_GAP + CELL_H / 2,
  };
}

function sliceWeights(time: number) {
  const n = SLICES.length;
  const local = (time / CYCLE) % n;
  const i0 = Math.floor(local) % n;
  const i1 = (i0 + 1) % n;
  const u = local - Math.floor(local);
  const fadeStart = 1 - FADE / CYCLE;
  const blend = u <= fadeStart ? 0 : easeInOut((u - fadeStart) / (1 - fadeStart));
  return { i0, i1, blend, weights: SLICES.map((_, i) => {
    if (i === i0) return 1 - blend;
    if (i === i1) return blend;
    return 0;
  }) };
}

function cellLit(index: number, weights: number[]) {
  let w = 0;
  for (let s = 0; s < SLICES.length; s++) {
    if (weights[s] < 0.02) continue;
    if ((SLICES[s] as readonly number[]).includes(index)) {
      w = Math.max(w, weights[s]);
    }
  }
  return w;
}

export function PrivacyHero() {
  const uid = useId().replace(/:/g, "");
  const t = useThesisTime();
  const { weights } = sliceWeights(t);
  const pulse = 0.55 + 0.45 * (0.5 + 0.5 * Math.sin(t * 1.7));
  const travel = easeInOut((t / CYCLE) % 1);
  const sourceRight = SOURCE_X + SOURCE_W;
  const bridgeY = CARD_Y + CARD_H / 2;
  const beadX = mix(sourceRight + 6, CARD_X - 6, travel);
  const open = Math.max(...weights);

  return (
    <ThesisHeroPlate
      ariaLabel="Sensitive records can stay local while an approved slice is sent for reasoning."
      eyebrow="Disclosure"
      line="Move the representation required for reasoning. Not necessarily the raw store."
    >
      <ThesisSvg uid={uid}>
        <defs>
          <radialGradient id={`${uid}-vault`} cx="42%" cy="48%" r="55%">
            <stop offset="0%" stopColor={IOTA} stopOpacity="0.22" />
            <stop offset="70%" stopColor={IOTA} stopOpacity="0.04" />
            <stop offset="100%" stopColor={IOTA} stopOpacity="0" />
          </radialGradient>
          <linearGradient
            id={`${uid}-bridge`}
            gradientUnits="userSpaceOnUse"
            x1={sourceRight}
            y1={bridgeY}
            x2={CARD_X}
            y2={CARD_Y + CARD_H / 2}
          >
            <stop offset="0%" stopColor="#B4AFFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor={IOTA} stopOpacity="0.5" />
          </linearGradient>
          <radialGradient id={`${uid}-card`} cx="50%" cy="45%" r="62%">
            <stop offset="0%" stopColor={IOTA} stopOpacity="0.4" />
            <stop offset="55%" stopColor={IOTA} stopOpacity="0.1" />
            <stop offset="100%" stopColor={IOTA} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* source vault */}
        <ellipse
          cx={SOURCE_X + SOURCE_W / 2}
          cy={SOURCE_Y + SOURCE_H / 2}
          rx={118}
          ry={78}
          fill={`url(#${uid}-vault)`}
          opacity={svgNum(0.55 + pulse * 0.2)}
        />
        <rect
          x={SOURCE_X}
          y={SOURCE_Y}
          width={SOURCE_W}
          height={SOURCE_H}
          rx="10"
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.14)"
        />

        {/* 3×3 records: lit = approved for this turn */}
        {Array.from({ length: 9 }, (_, i) => {
          const lit = cellLit(i, weights);
          const x = GRID_X + (i % 3) * COL_GAP;
          const y = GRID_Y + Math.floor(i / 3) * ROW_GAP;
          const fillA = mix(0.07, 0.22, lit);
          const strokeA = mix(0, 0.7, lit);
          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={CELL_W}
                height={CELL_H}
                rx="3"
                fill={`rgba(255,255,255,${svgNum(fillA)})`}
                stroke={lit > 0.08 ? IOTA_LINE : "transparent"}
                strokeOpacity={svgNum(strokeA)}
                strokeWidth="1"
              />
              {lit > 0.35 ? (
                <circle
                  cx={x + CELL_W / 2}
                  cy={y + CELL_H / 2}
                  r={2.2}
                  fill={IOTA}
                  opacity={svgNum(0.5 + lit * 0.45)}
                />
              ) : null}
            </g>
          );
        })}

        <Mark x={SOURCE_X + SOURCE_W / 2} y={SOURCE_Y + SOURCE_H + 22} anchor="middle">
          source
        </Mark>

        {/* quiet stay-local ticks on unselected */}
        {Array.from({ length: 9 }, (_, i) => {
          const lit = cellLit(i, weights);
          if (lit > 0.2) return null;
          const c = cellCenter(i);
          return (
            <circle
              key={`dim-${i}`}
              cx={c.x}
              cy={c.y}
              r={1.4}
              fill="rgba(255,255,255,0.16)"
            />
          );
        })}

        {/* disclosure bridge */}
        <line
          x1={sourceRight + 2}
          y1={svgNum(bridgeY)}
          x2={CARD_X - 2}
          y2={svgNum(CARD_Y + CARD_H / 2)}
          stroke={`url(#${uid}-bridge)`}
          strokeWidth="1.6"
          opacity={svgNum(0.35 + open * 0.55)}
        />
        <circle
          cx={svgNum(beadX)}
          cy={bridgeY}
          r={2.8}
          fill="#B4AFFF"
          opacity={svgNum(0.55 + open * 0.4)}
        />

        {/* approved slice */}
        <ellipse
          cx={CARD_X + CARD_W / 2}
          cy={CARD_Y + CARD_H / 2}
          rx={86}
          ry={44}
          fill={`url(#${uid}-card)`}
          opacity={svgNum(0.35 + open * 0.4 + pulse * 0.15)}
        />
        <rect
          x={CARD_X}
          y={CARD_Y}
          width={CARD_W}
          height={CARD_H}
          rx="10"
          fill={`rgba(91,80,221,${svgNum(0.1 + open * 0.14)})`}
          stroke={IOTA_LINE}
          strokeOpacity={svgNum(0.35 + open * 0.45)}
        />
        <Mark
          x={CARD_X + CARD_W / 2}
          y={CARD_Y + CARD_H / 2 + 4}
          anchor="middle"
          fill={IOTA_TEXT}
          size={11}
        >
          approved slice
        </Mark>
      </ThesisSvg>
    </ThesisHeroPlate>
  );
}

