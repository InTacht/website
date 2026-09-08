"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { FieldStage } from "@/components/story-graphics/field-stage";
import { MechanicsShell } from "@/components/story-graphics/mechanics-shell";
import {
  AREA,
  SOURCES,
  buildDots,
  sourcePoint,
  wavePath,
} from "@/components/story-graphics/mechanics-field";

/**
 * Act 3 — propagate.
 * Local signals travel the sequence and combine.
 */
export function PropagateFieldPlate() {
  const uid = useId().replace(/:/g, "");
  const [t, setT] = useState(0.8);
  const spread = 0.34 + ((t % 3.6) / 3.6) * 0.9;
  const dots = useMemo(() => buildDots(spread, t, true, null, null), [spread, t]);
  const clip = `${uid}-clip`;

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

  return (
    <MechanicsShell ariaLabel="Propagate: signals flow and combine across the sequence">
      <FieldStage
        uid={uid}
        dots={dots}
        sources={SOURCES}
        spread={spread}
        sourceMode="emit"
      >
        <g clipPath={`url(#${clip})`}>
          {SOURCES.flatMap((source) => {
            const point = sourcePoint(source);
            return ([1, -1] as const).map((dir) => (
              <path
                key={`${source.mark}-${dir}`}
                d={wavePath(point.x, point.y, t, dir)}
                fill="none"
                stroke="rgba(196,181,253,0.58)"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            ));
          })}
        </g>
        <text
          x={AREA.x + AREA.w / 2}
          y={AREA.y + AREA.h - 14}
          textAnchor="middle"
          fill="rgba(196,181,253,0.82)"
          fontFamily="var(--font-inter), system-ui, sans-serif"
          fontSize="11"
          letterSpacing="0.6"
        >
          mixes with the others
        </text>
      </FieldStage>
    </MechanicsShell>
  );
}
