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

const NODES = [
  { x: 72, y: 118, label: "series" },
  { x: 154, y: 64, label: "table" },
  { x: 236, y: 150, label: "slm" },
  { x: 324, y: 58, label: "frontier" },
  { x: 406, y: 146, label: "sql" },
  { x: 488, y: 88, label: "python" },
] as const;

const HUB = { x: 280, y: 110 };
const CYCLE = 2.15;
const FADE = 0.65;

function nodeWeights(time: number) {
  const n = NODES.length;
  const t = safeTime(time);
  const local = (t / CYCLE) % n;
  const i0 = clampIndex(Math.floor(local), n);
  const i1 = clampIndex(i0 + 1, n);
  const u = local - Math.floor(local);
  const fadeStart = 1 - FADE / CYCLE;
  const blend = u <= fadeStart ? 0 : easeInOut((u - fadeStart) / (1 - fadeStart));
  return NODES.map((_, i) => {
    if (i === i0) return 1 - blend;
    if (i === i1) return blend;
    return 0;
  });
}

export function ExpertsHero() {
  const uid = useId().replace(/:/g, "");
  const t = safeTime(useThesisTime());
  const weights = nodeWeights(t);
  const pulse = 0.55 + 0.45 * (0.5 + 0.5 * Math.sin(t * 1.7));
  const travel = easeInOut((t / CYCLE) % 1);
  const activeIndex = clampIndex(
    weights.reduce((best, w, i, arr) => (w > arr[best] ? i : best), 0),
    NODES.length,
  );

  return (
    <ThesisHeroPlate
      ariaLabel="Specialist models and runtimes are orchestrated. They are not merged into one checkpoint."
      eyebrow="Composition"
      line="Separate experts. One path for this turn."
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
            x1={HUB.x}
            y1={HUB.y}
            x2={NODES[activeIndex].x}
            y2={NODES[activeIndex].y}
          >
            <stop offset="0%" stopColor="#B4AFFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#5B50DD" stopOpacity="0.55" />
          </linearGradient>
        </defs>

        <ellipse
          cx={HUB.x}
          cy={HUB.y}
          rx={72}
          ry={50}
          fill={`url(#${uid}-hub)`}
          opacity={svgNum(0.5 + pulse * 0.28)}
        />

        {/* quiet mesh */}
        {NODES.map((node, i) => {
          const next = NODES[(i + 1) % NODES.length];
          return (
            <line
              key={`e-${node.label}`}
              x1={node.x}
              y1={node.y}
              x2={next.x}
              y2={next.y}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
          );
        })}

        {/* active route only */}
        {NODES.map((node, i) => {
          const w = weights[i];
          if (w < 0.05) return null;
          const dx = node.x - HUB.x;
          const dy = node.y - HUB.y;
          const beadX = HUB.x + dx * travel;
          const beadY = HUB.y + dy * travel;
          const isLead = i === activeIndex;
          return (
            <g key={`spoke-${node.label}`}>
              <line
                x1={HUB.x}
                y1={HUB.y}
                x2={node.x}
                y2={node.y}
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

        {/* hub */}
        <circle
          cx={HUB.x}
          cy={HUB.y}
          r={3.2}
          fill={`rgba(255,255,255,${svgNum(0.82 + pulse * 0.15, 3)})`}
        />

        {/* experts — fixed point size */}
        {NODES.map((node, i) => {
          const w = weights[i];
          const labelA = mix(0.32, 0.92, w);
          const below = node.y >= HUB.y;
          return (
            <g key={node.label}>
              <circle
                cx={node.x}
                cy={node.y}
                r={3.2}
                fill={
                  w > 0.15
                    ? `rgba(255,255,255,${svgNum(0.82 + w * 0.15, 3)})`
                    : "rgba(255,255,255,0.22)"
                }
              />
              <Mark
                x={node.x}
                y={below ? node.y + 16 : node.y - 12}
                anchor="middle"
                fill={`rgba(255,255,255,${svgNum(labelA, 3)})`}
                size={10}
              >
                {node.label}
              </Mark>
            </g>
          );
        })}
      </ThesisSvg>
    </ThesisHeroPlate>
  );
}
