"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { FieldStage, WordMark } from "@/components/story-graphics/field-stage";
import { MechanicsShell } from "@/components/story-graphics/mechanics-shell";
import {
  AREA,
  SOURCES,
  buildDots,
  colX,
  easeOutCubic,
  lerp,
  listenPath,
  nearestSource,
  wavePath,
  sourcePoint,
} from "@/components/story-graphics/mechanics-field";

const STOPS = [SOURCES[0].c, 10, SOURCES[1].c, 18, SOURCES[2].c] as const;
const SLOT = 1.6;
const TRAVEL = 0.85;

function probeX(t: number) {
  const n = STOPS.length;
  const u = t % (n * SLOT);
  const index = Math.floor(u / SLOT);
  const local = u - index * SLOT;
  const from = colX(STOPS[(index - 1 + n) % n]);
  const to = colX(STOPS[index]);
  if (local < TRAVEL) return lerp(from, to, easeOutCubic(local / TRAVEL));
  return to;
}

/**
 * Act 3 — read back.
 * The model listens at one position on a living field.
 */
export function ReadBackFieldPlate() {
  const uid = useId().replace(/:/g, "");
  const clip = `${uid}-clip`;
  const beam = `${uid}-beam`;
  const [t, setT] = useState(2.1);
  const x = probeX(t);
  const answer = nearestSource(x);
  const dots = useMemo(() => buildDots(0.92, t, true, x, null), [t, x]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setT(2.1);
      return;
    }
    const start = performance.now();
    let frame = 0;
    let last = 0;
    const tick = (now: number) => {
      if (now - last >= 32) {
        last = now;
        setT((now - start) / 1000 + 2.1);
      }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <MechanicsShell ariaLabel="Read back: sample the field at the answer">
      <FieldStage
        uid={uid}
        dots={dots}
        sources={SOURCES}
        spread={0.92}
        sourceMode="emit"
      >
        <defs>
          <linearGradient id={beam} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8f55fb" stopOpacity="0" />
            <stop offset="18%" stopColor="#8f55fb" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#8f55fb" stopOpacity="0.32" />
            <stop offset="82%" stopColor="#8f55fb" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#8f55fb" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g clipPath={`url(#${clip})`}>
          {SOURCES.flatMap((source) => {
            const point = sourcePoint(source);
            return ([1, -1] as const).map((dir) => (
              <path
                key={`${source.mark}-${dir}`}
                d={wavePath(point.x, point.y, t, dir)}
                fill="none"
                stroke="rgba(196,181,253,0.28)"
                strokeWidth="1"
                strokeLinecap="round"
              />
            ));
          })}
          <rect
            x={x - 12}
            y={AREA.y + 4}
            width="24"
            height={AREA.h - 8}
            rx="7"
            fill={`url(#${beam})`}
            stroke="#c4b5fd"
            strokeWidth="1.2"
          />
          <path
            d={listenPath(x, t)}
            fill="none"
            stroke="rgba(255,255,255,0.82)"
            strokeWidth="1.35"
            strokeLinecap="round"
          />
        </g>
        <circle
          cx={x}
          cy={sourcePoint(SOURCES[1]).y}
          r="6.4"
          fill="#8f55fb"
          stroke="rgba(196,181,253,0.95)"
          strokeWidth="1.2"
        />
        <WordMark x={x} y={2} mark={`answer: ${answer.mark}`} />
        <text
          x={x}
          y={AREA.y + AREA.h - 14}
          textAnchor="middle"
          fill="rgba(196,181,253,0.82)"
          fontFamily="var(--font-inter), system-ui, sans-serif"
          fontSize="11"
          letterSpacing="0.6"
        >
          read here
        </text>
      </FieldStage>
    </MechanicsShell>
  );
}
