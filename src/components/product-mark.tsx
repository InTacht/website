"use client";

import { useState } from "react";
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

type CardSide = "top" | "left" | "right";

const CARD_LAYOUT: Record<
  Project["id"],
  { side: CardSide; anchorX: number; anchorY: number }
> = {
  iota: { side: "top", anchorX: 60, anchorY: 0 },
  xqua: { side: "left", anchorX: 0, anchorY: 72 },
  iq: { side: "right", anchorX: 120, anchorY: 72 },
};

/** Paint order matches Figma mark (back → front). */
const PAINT_ORDER = ["iq", "iota", "xqua"] as const;

function lineEnd(projectId: Project["id"]) {
  const circle = MARK.circles[projectId];
  const layout = CARD_LAYOUT[projectId];
  const dx = layout.anchorX - circle.cx;
  const dy = layout.anchorY - circle.cy;
  const len = Math.hypot(dx, dy) || 1;
  return {
    x1: circle.cx + (dx / len) * MARK.r,
    y1: circle.cy + (dy / len) * MARK.r,
    x2: layout.anchorX,
    y2: layout.anchorY,
  };
}

function cardPosition(side: CardSide) {
  switch (side) {
    case "top":
      return "left-1/2 top-0 -translate-x-1/2 -translate-y-[calc(100%+1.25rem)]";
    case "left":
      return "left-0 top-[66.7%] -translate-x-[calc(100%+1.25rem)] -translate-y-1/2";
    case "right":
      return "right-0 top-[66.7%] translate-x-[calc(100%+1.25rem)] -translate-y-1/2";
  }
}

export function ProductMark() {
  const [activeId, setActiveId] = useState<Project["id"] | null>(null);

  return (
    <div className="relative flex w-full max-w-5xl items-center justify-center px-6 py-16">
      <div
        className="relative"
        style={{
          width: "min(42vw, 280px)",
          aspectRatio: `${MARK.w} / ${MARK.h}`,
        }}
        onMouseLeave={() => setActiveId(null)}
      >
        <svg
          className="absolute inset-0 size-full overflow-visible"
          viewBox={`0 0 ${MARK.w} ${MARK.h}`}
          role="img"
          aria-label="InTacht platforms"
        >
          {projects.map((project) => {
            const { x1, y1, x2, y2 } = lineEnd(project.id);
            const visible = activeId === project.id;
            return (
              <g key={`line-${project.id}`}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={project.color}
                  strokeWidth={1.25}
                  strokeLinecap="round"
                  className="transition-opacity duration-300"
                  style={{ opacity: visible ? 0.7 : 0 }}
                />
                <circle
                  cx={x2}
                  cy={y2}
                  r={2.2}
                  fill={project.color}
                  className="transition-opacity duration-300"
                  style={{ opacity: visible ? 1 : 0 }}
                />
              </g>
            );
          })}

          {PAINT_ORDER.map((id) => {
            const circle = MARK.circles[id];
            const project = projects.find((p) => p.id === id)!;
            const isActive = activeId === id;
            const isDimmed = activeId !== null && !isActive;

            return (
              <circle
                key={id}
                cx={circle.cx}
                cy={circle.cy}
                r={MARK.r}
                fill={circle.color}
                className="cursor-pointer transition-opacity duration-300 outline-none focus-visible:opacity-100"
                style={{ opacity: isDimmed ? 0.28 : 1 }}
                onMouseEnter={() => setActiveId(id)}
                onFocus={() => setActiveId(id)}
                tabIndex={0}
                role="button"
                aria-label={`${project.name}: ${project.tagline}`}
                aria-expanded={isActive}
              />
            );
          })}
        </svg>

        {projects.map((project) => {
          const layout = CARD_LAYOUT[project.id];
          const visible = activeId === project.id;

          return (
            <div
              key={project.id}
              className={`pointer-events-none absolute z-20 w-[220px] sm:w-[260px] ${cardPosition(layout.side)} transition-all duration-300 ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-1 opacity-0"
              }`}
              aria-hidden={!visible}
            >
              <div className="rounded-2xl border border-line bg-surface/80 px-5 py-4 shadow-sm backdrop-blur-xl dark:border-white/15 dark:bg-white/10">
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className="size-1.5 rounded-full"
                    style={{ backgroundColor: project.color }}
                    aria-hidden
                  />
                  <p className="text-[13px] font-medium tracking-tight text-ink">
                    {project.name}
                  </p>
                </div>
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-faint">
                  {project.tagline}
                </p>
                <p className="mt-2.5 text-[13px] font-light leading-relaxed text-ink-muted">
                  {project.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
