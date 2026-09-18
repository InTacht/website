"use client";

import { useId } from "react";
import { Mark, ThesisHeroPlate, ThesisSvg } from "@/components/iota/thesis-graphics/chrome";
import { useThesisTime } from "@/components/iota/thesis-graphics/clock";
import { svgNum } from "@/components/iota/thesis-graphics/draw";

const CELLS = [
  { x: 78, y: 42, title: "Context", hint: "what is known" },
  { x: 292, y: 42, title: "Reasoning", hint: "who decides" },
  { x: 78, y: 124, title: "Execution", hint: "what runs" },
  { x: 292, y: 124, title: "Adaptation", hint: "what remains" },
] as const;

const CYCLE = 2.35;
const FADE = 0.7;

function easeInOut(u: number) {
  const t = Math.min(1, Math.max(0, u));
  return t * t * (3 - 2 * t);
}

function cellWeights(time: number) {
  const n = CELLS.length;
  const local = (time / CYCLE) % n;
  const i0 = Math.floor(local) % n;
  const i1 = (i0 + 1) % n;
  const u = local - Math.floor(local);
  const fadeStart = 1 - FADE / CYCLE;
  const blend = u <= fadeStart ? 0 : easeInOut((u - fadeStart) / (1 - fadeStart));
  return CELLS.map((_, i) => {
    if (i === i0) return 1 - blend;
    if (i === i1) return blend;
    return 0;
  });
}

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function SystemHero() {
  const uid = useId().replace(/:/g, "");
  const t = useThesisTime();
  const weights = cellWeights(t);

  return (
    <ThesisHeroPlate
      ariaLabel="Context, reasoning, execution, and adaptation as one system."
      eyebrow="The unit"
      line="A configured system, not a checkpoint name."
    >
      <ThesisSvg uid={uid}>
        {CELLS.map((cell, i) => {
          const w = weights[i];
          const fillA = mix(0.05, 0.22, w);
          const strokeA = mix(0.12, 0.72, w);
          const titleA = mix(0.55, 0.96, w);
          const hintA = mix(0.28, 0.55, w);
          const r = 91;
          const g = 80;
          const b = 221;
          const fill =
            w > 0.02
              ? `rgba(${r},${g},${b},${svgNum(fillA, 3)})`
              : `rgba(255,255,255,${svgNum(fillA, 3)})`;
          const stroke =
            w > 0.02
              ? `rgba(180,175,255,${svgNum(strokeA, 3)})`
              : `rgba(255,255,255,${svgNum(strokeA, 3)})`;

          return (
            <g key={cell.title}>
              <rect
                x={cell.x}
                y={cell.y}
                width="190"
                height="68"
                rx="14"
                fill={fill}
                stroke={stroke}
                strokeWidth={svgNum(1 + w * 0.6, 2)}
              />
              <Mark
                x={cell.x + 16}
                y={cell.y + 30}
                fill={
                  w > 0.08
                    ? `rgba(180,175,255,${svgNum(titleA, 3)})`
                    : `rgba(255,255,255,${svgNum(titleA, 3)})`
                }
              >
                {cell.title}
              </Mark>
              <Mark
                x={cell.x + 16}
                y={cell.y + 50}
                fill={`rgba(255,255,255,${svgNum(hintA, 3)})`}
              >
                {cell.hint}
              </Mark>
            </g>
          );
        })}
      </ThesisSvg>
    </ThesisHeroPlate>
  );
}

