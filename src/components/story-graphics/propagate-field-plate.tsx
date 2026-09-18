"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { FieldStage, WordMark } from "@/components/story-graphics/field-stage";
import { MechanicsShell } from "@/components/story-graphics/mechanics-shell";
import {
  AREA,
  SOURCES,
  buildDots,
  routePath,
  sourcePoint,
} from "@/components/story-graphics/mechanics-field";

const DEST = [
  { mark: "fast", y: AREA.y + 44 },
  { mark: "capable", y: AREA.y + 80 },
  { mark: "sql", y: AREA.y + 116 },
] as const;

const DEST_X = AREA.x + AREA.w - 22;

/**
 * Act 3 — Route.
 * Evidence from the work chooses one model and compute path.
 */
export function PropagateFieldPlate() {
  const uid = useId().replace(/:/g, "");
  const [t, setT] = useState(0.8);
  const spread = 0.28 + ((t % 3.6) / 3.6) * 0.4;
  const dots = useMemo(() => buildDots(spread, t, false, null, null), [spread, t]);
  const hot = ((Math.floor(Math.max(0, t) / 1.9) % DEST.length) + DEST.length) % DEST.length;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const start = performance.now();
    let frame = 0;
    let last = 0;
    const tick = (now: number) => {
      if (now - last >= 32) {
        last = now;
        setT((now - start) / 1000);
      }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const dest = DEST[hot] ?? DEST[0];
  const destPoint = { x: DEST_X, y: dest.y };

  return (
    <MechanicsShell ariaLabel="Route: evidence chooses the model and compute path">
      <FieldStage
        uid={uid}
        dots={dots}
        sources={SOURCES}
        spread={spread}
        sourceMode="emit"
        showLabels={false}
        rightMark=""
      >
        {SOURCES.map((source) => {
          const point = sourcePoint(source);
          return (
            <g key={`src-${source.mark}`}>
              <WordMark x={point.x} y={6} mark={source.mark} />
              <path
                d={routePath(point, destPoint)}
                fill="none"
                stroke="rgba(196,181,253,0.7)"
                strokeWidth="1.25"
                strokeLinecap="round"
              />
            </g>
          );
        })}
        {DEST.map((item, i) => (
          <g key={item.mark}>
            <circle
              cx={DEST_X}
              cy={item.y}
              r={i === hot ? 5.2 : 3.2}
              fill={i === hot ? "#8f55fb" : "rgba(196,181,253,0.28)"}
              stroke="rgba(196,181,253,0.9)"
              strokeWidth="1"
            />
            <text
              x={DEST_X - 10}
              y={item.y + 3.5}
              textAnchor="end"
              fill={
                i === hot ? "rgba(196,181,253,0.95)" : "rgba(255,255,255,0.38)"
              }
              fontFamily="var(--font-inter), system-ui, sans-serif"
              fontSize="10"
              fontWeight="500"
            >
              {item.mark}
            </text>
          </g>
        ))}
        <text
          x={AREA.x + AREA.w / 2 - 24}
          y={AREA.y + AREA.h - 14}
          textAnchor="middle"
          fill="rgba(196,181,253,0.82)"
          fontFamily="var(--font-inter), system-ui, sans-serif"
          fontSize="11"
          letterSpacing="0.6"
        >
          evidence picks the path
        </text>
      </FieldStage>
    </MechanicsShell>
  );
}
