"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { FieldStage, WordMark } from "@/components/story-graphics/field-stage";
import { MechanicsShell } from "@/components/story-graphics/mechanics-shell";
import {
  AREA,
  SOURCES,
  buildDots,
  dropPacket,
  dropPath,
  dropProgress,
  sourcePoint,
} from "@/components/story-graphics/mechanics-field";

/**
 * Act 3 — deposit.
 * Words condense onto the sequence as tight local signals.
 */
export function DepositFieldPlate() {
  const uid = useId().replace(/:/g, "");
  const [t, setT] = useState(0.9);
  const [live, setLive] = useState(true);
  const dots = useMemo(() => buildDots(0.17, t, false, null, null), [t]);
  const { index, fall } = dropProgress(t);
  const active = SOURCES[index];
  const activePoint = sourcePoint(active);
  const packet = dropPacket(activePoint.x, activePoint.y, t, live ? fall : 1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLive(false);
      return;
    }
    const start = performance.now();
    let frame = 0;
    let last = 0;
    const tick = (now: number) => {
      if (now - last >= 32) {
        last = now;
        setT((now - start) / 1000 + 0.9);
      }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <MechanicsShell ariaLabel="Deposit: words drop onto the field as local signals">
      <FieldStage
        uid={uid}
        dots={dots}
        sources={SOURCES}
        spread={0.17}
        sourceMode="emit"
        showLabels={false}
      >
        {SOURCES.map((source, sourceIndex) => {
          const point = sourcePoint(source);
          return (
            <g key={`word-${source.mark}`}>
              <WordMark
                x={point.x}
                y={6}
                mark={source.mark}
                active={sourceIndex === index}
              />
              <path
                d={`M${point.x - 4} 26 L${point.x} 31 L${point.x + 4} 26`}
                fill="none"
                stroke={
                  sourceIndex === index
                    ? "rgba(196,181,253,0.9)"
                    : "rgba(196,181,253,0.45)"
                }
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          );
        })}
        {SOURCES.flatMap((source, sourceIndex) => {
          const point = sourcePoint(source);
          const hot = sourceIndex === index && live;
          return ([1, -1] as const).map((dir) => (
            <path
              key={`${source.mark}-${dir}`}
              d={dropPath(point.x, point.y, t, dir)}
              fill="none"
              stroke={
                hot ? "rgba(196,181,253,0.82)" : "rgba(196,181,253,0.5)"
              }
              strokeWidth={hot ? 1.35 : 1.15}
              strokeLinecap="round"
            />
          ));
        })}
        {live && fall < 1 ? (
          <g>
            <circle
              cx={packet.x}
              cy={packet.y}
              r="9"
              fill="rgba(143,85,251,0.28)"
            />
            <circle
              cx={packet.x}
              cy={packet.y}
              r="4.6"
              fill="#8f55fb"
              stroke="rgba(196,181,253,0.95)"
              strokeWidth="1"
            />
          </g>
        ) : null}
        <text
          x={AREA.x + AREA.w / 2}
          y={AREA.y + AREA.h - 14}
          textAnchor="middle"
          fill="rgba(196,181,253,0.82)"
          fontFamily="var(--font-inter), system-ui, sans-serif"
          fontSize="11"
          letterSpacing="0.6"
        >
          stays local
        </text>
      </FieldStage>
    </MechanicsShell>
  );
}
