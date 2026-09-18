"use client";

import { useId } from "react";
import { Mark, ThesisHeroPlate, ThesisSvg } from "@/components/iota/thesis-graphics/chrome";
import { useThesisTime } from "@/components/iota/thesis-graphics/clock";
import { svgNum } from "@/components/iota/thesis-graphics/draw";

const PARENT = ["schema", "policy", "KNOW", "tools"] as const;
const SESSION = ["file", "draft", "trace"] as const;

export function CortexHero() {
  const uid = useId().replace(/:/g, "");
  const t = useThesisTime();
  const read = Math.floor(t * 0.7) % PARENT.length;

  return (
    <ThesisHeroPlate
      ariaLabel="Parent Cortex keeps durable records. Session Cortex is temporary."
      eyebrow="Two lifecycles"
      line="Parent stays. Session is working state."
    >
      <ThesisSvg uid={uid}>
        <rect x="48" y="36" width="220" height="156" rx="14" fill="rgba(8,9,16,0.35)" stroke="rgba(255,255,255,0.16)" />
        <Mark x={64} y={58} fill="rgba(180,175,255,0.8)">parent</Mark>
        {PARENT.map((row, i) => (
          <g key={row}>
            <rect
              x="64"
              y={70 + i * 28}
              width="188"
              height="20"
              rx="6"
              fill={i === read ? "rgba(91,80,221,0.28)" : "rgba(255,255,255,0.06)"}
            />
            <Mark x={76} y={84 + i * 28} fill="rgba(255,255,255,0.7)">
              {row}
            </Mark>
          </g>
        ))}
        <rect x="300" y="36" width="212" height="156" rx="14" fill="rgba(8,9,16,0.2)" stroke="rgba(255,255,255,0.1)" />
        <Mark x={316} y={58} fill="rgba(255,255,255,0.4)">session</Mark>
        {SESSION.map((row, i) => (
          <rect
            key={row}
            x="316"
            y={74 + i * 30}
            width={svgNum(148 - i * 18)}
            height="18"
            rx="6"
            fill={`rgba(255,255,255,${(0.12 - i * 0.03).toFixed(2)})`}
          />
        ))}
        <Mark x={316} y={178} fill="rgba(255,255,255,0.32)">
          expires
        </Mark>
      </ThesisSvg>
    </ThesisHeroPlate>
  );
}

