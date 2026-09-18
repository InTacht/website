"use client";

import { MagneticItem, bentoEntrance } from "@/components/magnetic";
import { bt } from "@/lib/bento-type";
import { projects, type Project } from "@/lib/projects";

/** Mark viewBox is 120×108. Circle centers + radius from Figma mark. */
const MARK = {
  w: 120,
  h: 108,
  r: 36,
  circles: {
    iota: { cx: 60, cy: 36, color: "#5B50DD" },
    xqua: { cx: 36, cy: 72, color: "#42E8FF" },
    iq: { cx: 84, cy: 72, color: "#8F55FB" },
  },
} as const;

/** Paint order matches Figma mark (back → front). */
const PAINT_ORDER = ["iq", "iota", "xqua"] as const;

type MidBentoProps = {
  activeId: Project["id"] | null;
  onActiveChange: (id: Project["id"]) => void;
};

export function MidBento({ activeId, onActiveChange }: MidBentoProps) {
  const active = projects.find((p) => p.id === activeId) ?? null;
  const accent = active?.color ?? "#ffffff";

  return (
    <MagneticItem
      className="h-full min-h-0"
      style={{ gridArea: "mid" }}
      surfaceClassName="glass h-full w-full min-h-0 overflow-hidden rounded-[1.25rem] md:rounded-[1.5rem]"
      strength={18}
      entrance={bentoEntrance.mid}
    >
      <div className="relative h-full min-h-0 overflow-hidden p-3 md:p-4 lg:p-5">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: active
              ? `radial-gradient(circle at 50% 38%, ${accent}28 0%, transparent 62%)`
              : undefined,
          }}
        />

        <p className={`relative z-10 font-mono uppercase tracking-[0.14em] text-white/40 ${bt.mono}`}>
          Select platform
        </p>

        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="relative w-[72%] max-w-[168px] md:max-w-[210px] lg:max-w-[240px]"
            style={{ aspectRatio: `${MARK.w} / ${MARK.h}` }}
          >
            <svg
              viewBox={`0 0 ${MARK.w} ${MARK.h}`}
              className="pointer-events-none absolute inset-0 size-full drop-shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
              aria-hidden
            >
              {PAINT_ORDER.map((id) => {
                const circle = MARK.circles[id];
                const isActive = activeId === id;
                const fill = isActive ? circle.color : "#FFFFFF";

                return (
                  <circle
                    key={id}
                    cx={circle.cx}
                    cy={circle.cy}
                    r={MARK.r}
                    fill={fill}
                    className="transition-[fill] duration-300"
                  />
                );
              })}
            </svg>

            {PAINT_ORDER.map((id) => {
              const circle = MARK.circles[id];
              const project = projects.find((p) => p.id === id)!;
              const size = (MARK.r * 2) / MARK.w;

              return (
                <button
                  key={`hit-${id}`}
                  type="button"
                  aria-label={project.name}
                  aria-pressed={activeId === id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full border-0 bg-transparent p-0 outline-none ring-0 focus:outline-none focus-visible:outline-none"
                  style={{
                    left: `${(circle.cx / MARK.w) * 100}%`,
                    top: `${(circle.cy / MARK.h) * 100}%`,
                    width: `${size * 100}%`,
                    height: `${((MARK.r * 2) / MARK.h) * 100}%`,
                  }}
                  onClick={() => onActiveChange(id)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </MagneticItem>
  );
}
