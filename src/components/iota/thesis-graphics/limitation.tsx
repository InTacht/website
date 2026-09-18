"use client";

import { useId } from "react";
import { Mark, ThesisHeroPlate, ThesisSvg } from "@/components/iota/thesis-graphics/chrome";
import { useThesisTime } from "@/components/iota/thesis-graphics/clock";
import { cubeFaces, svgNum } from "@/components/iota/thesis-graphics/draw";

const JOBS = [
  { x: 86, y: 54, label: "data" },
  { x: 112, y: 166, label: "files" },
  { x: 448, y: 48, label: "tools" },
  { x: 474, y: 160, label: "policy" },
  { x: 280, y: 32, label: "memory" },
] as const;

const HUB = { x: 280, y: 108 };
const CYCLE = 2.1;
const FADE = 0.65;

function easeInOut(u: number) {
  const t = Math.min(1, Math.max(0, u));
  return t * t * (3 - 2 * t);
}

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function jobWeights(time: number) {
  const n = JOBS.length;
  const local = (time / CYCLE) % n;
  const i0 = Math.floor(local) % n;
  const i1 = (i0 + 1) % n;
  const u = local - Math.floor(local);
  const fadeStart = 1 - FADE / CYCLE;
  const blend = u <= fadeStart ? 0 : easeInOut((u - fadeStart) / (1 - fadeStart));
  return JOBS.map((_, i) => {
    if (i === i0) return 1 - blend;
    if (i === i1) return blend;
    return 0;
  });
}

export function LimitationHero() {
  const uid = useId().replace(/:/g, "");
  const t = useThesisTime();
  const cube = cubeFaces(HUB.x, 78, 26);
  const weights = jobWeights(t);
  const pulse = 0.55 + 0.45 * (0.5 + 0.5 * Math.sin(t * 2.1));
  const caretOn = Math.floor(t * 1.8) % 2 === 0;
  const phase = (t / CYCLE) % JOBS.length;
  const travel = easeInOut(phase - Math.floor(phase));

  return (
    <ThesisHeroPlate
      ariaLabel="A chat box hides the work. One model is asked to do every job."
      eyebrow="The interface"
      line="One model. The system stays implicit."
    >
      <ThesisSvg uid={uid}>
        <defs>
          <radialGradient id={`${uid}-halo`} cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#5B50DD" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#5B50DD" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#5B50DD" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse
          cx={HUB.x}
          cy={HUB.y}
          rx={78}
          ry={52}
          fill={`url(#${uid}-halo)`}
          opacity={svgNum(0.55 + pulse * 0.35)}
        />

        {JOBS.map((job, i) => {
          const w = weights[i];
          const dx = job.x - HUB.x;
          const dy = job.y - HUB.y;
          const len = Math.hypot(dx, dy) || 1;
          const nx = dx / len;
          const ny = dy / len;
          const strokeA = mix(0.1, 0.78, w);
          const strokeW = mix(1, 1.75, w);
          const ringR = mix(5.2, 7.2, w);
          const ringA = mix(0, 0.45, w);
          const coreR = mix(3.2, 4.4, w);
          const coreFillA = mix(0.14, 1, w);
          const coreStrokeA = mix(0.22, 0.85, w);
          const labelA = mix(0.38, 0.92, w);
          const beadX = HUB.x + dx * travel;
          const beadY = HUB.y + dy * travel;

          return (
            <g key={job.label}>
              <line
                x1={HUB.x + nx * 18}
                y1={HUB.y + ny * 14}
                x2={job.x}
                y2={job.y}
                stroke={
                  w > 0.04
                    ? `rgba(180,175,255,${svgNum(strokeA, 3)})`
                    : `rgba(255,255,255,${svgNum(strokeA, 3)})`
                }
                strokeWidth={svgNum(strokeW, 2)}
                strokeLinecap="round"
              />
              {w > 0.08 ? (
                <circle
                  cx={svgNum(beadX)}
                  cy={svgNum(beadY)}
                  r={svgNum(1.6 + w * 1.1, 2)}
                  fill={`rgba(180,175,255,${svgNum(0.35 + w * 0.6, 3)})`}
                  filter={`url(#${uid}-glow)`}
                />
              ) : null}
              <circle
                cx={job.x}
                cy={job.y}
                r={svgNum(ringR, 2)}
                fill={`rgba(91,80,221,${svgNum(0.28 * w, 3)})`}
                stroke={`rgba(180,175,255,${svgNum(ringA, 3)})`}
                strokeWidth="1"
              />
              <circle
                cx={job.x}
                cy={job.y}
                r={svgNum(coreR, 2)}
                fill={
                  w > 0.12
                    ? `rgba(91,80,221,${svgNum(coreFillA, 3)})`
                    : `rgba(255,255,255,${svgNum(coreFillA, 3)})`
                }
                stroke={
                  w > 0.12
                    ? `rgba(180,175,255,${svgNum(coreStrokeA, 3)})`
                    : `rgba(255,255,255,${svgNum(coreStrokeA, 3)})`
                }
                strokeWidth={svgNum(0.8 + w * 0.3, 2)}
              />
              <Mark
                x={
                  job.x < HUB.x - 20
                    ? job.x - 12
                    : job.x > HUB.x + 20
                      ? job.x + 12
                      : job.x
                }
                y={Math.abs(job.x - HUB.x) < 20 ? job.y - 14 : job.y + 4}
                anchor={
                  job.x < HUB.x - 20
                    ? "end"
                    : job.x > HUB.x + 20
                      ? "start"
                      : "middle"
                }
                size={10}
                fill={`rgba(255,255,255,${svgNum(labelA, 3)})`}
              >
                {job.label}
              </Mark>
            </g>
          );
        })}

        <g filter={`url(#${uid}-glow)`} opacity={svgNum(0.35 + pulse * 0.4)}>
          <polygon points={cube.top} fill="rgba(180,175,255,0.55)" />
        </g>
        <polygon points={cube.left} fill="rgba(52,46,110,0.95)" />
        <polygon points={cube.right} fill="rgba(91,80,221,0.88)" />
        <polygon
          points={cube.top}
          fill={`rgba(196,190,255,${svgNum(0.62 + pulse * 0.28, 3)})`}
        />
        <polygon
          points={cube.top}
          fill="none"
          stroke="rgba(255,255,255,0.28)"
          strokeWidth="0.6"
        />

        <g>
          <rect
            x="168"
            y="150"
            width="224"
            height="44"
            rx="22"
            fill="rgba(255,255,255,0.045)"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1"
          />
          <circle
            cx="190"
            cy="172"
            r="7"
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1.4"
          />
          <line
            x1="195.2"
            y1="177.2"
            x2="200"
            y2="182"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <Mark x={210} y={176} fill="rgba(255,255,255,0.45)" size={12}>
            ask anything
          </Mark>
          {caretOn ? (
            <rect
              x="292"
              y="163"
              width="1.6"
              height="18"
              rx="0.6"
              fill="rgba(255,255,255,0.85)"
            />
          ) : null}
          <circle
            cx="368"
            cy="172"
            r="11"
            fill="rgba(91,80,221,0.28)"
            stroke="rgba(180,175,255,0.45)"
            strokeWidth="1"
          />
          <path
            d="M364 172 H372 M369 168 L373 172 L369 176"
            fill="none"
            stroke="rgba(180,175,255,0.9)"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </ThesisSvg>
    </ThesisHeroPlate>
  );
}

