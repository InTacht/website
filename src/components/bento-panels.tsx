"use client";

import { TallDiagram } from "@/components/bento-tall-diagrams";
import type { BentoPanelContent } from "@/lib/bento-content";
import { bt } from "@/lib/bento-type";
import type { Project } from "@/lib/projects";

type PanelProps = {
  project: Project;
  content: BentoPanelContent;
};

export function BentoTallPanel({ project, content }: PanelProps) {
  return (
    <div className="relative h-full min-h-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${project.color}33 0%, ${project.color}12 42%, transparent 100%)`,
        }}
      />
      <div className="relative flex h-full min-h-0 flex-col p-2.5 md:p-4 lg:p-5">
        <p className={`shrink-0 font-mono uppercase tracking-[0.16em] text-white/40 ${bt.mono}`}>
          {content.mono}
        </p>
        <h3 className={`mt-2 shrink-0 font-medium leading-[1.15] tracking-tight text-white md:mt-2.5 ${bt.headline}`}>
          {content.headline}
        </h3>
        <div
          className="mt-3 h-px w-12 shrink-0 md:mt-4 md:w-16"
          style={{ backgroundColor: project.color }}
        />

        <div
          className="relative mt-4 min-h-0 flex-1 overflow-hidden rounded-xl md:mt-5 md:rounded-2xl"
          style={{
            backgroundColor: `${project.color}18`,
            boxShadow: `inset 0 0 0 1px ${project.color}33`,
          }}
        >
          <TallDiagram id={project.id} color={project.color} />
        </div>
      </div>
    </div>
  );
}

export function BentoTopPanel({ project, content }: PanelProps) {
  return (
    <div className="relative h-full min-h-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 90% at 0% 0%, ${project.color}55 0%, transparent 52%), linear-gradient(180deg, ${project.color}18 0%, transparent 70%)`,
        }}
      />
      <p
        className="pointer-events-none absolute right-0 bottom-0 translate-y-[35%] select-none font-medium leading-none tracking-tighter text-white/[0.07] text-[3.5rem] md:text-[7rem] lg:text-[8.5rem]"
        aria-hidden
      >
        {project.name}
      </p>

      <div className="relative flex h-full min-h-0 flex-col p-2.5 md:p-4 lg:p-5">
        <div className="flex shrink-0 items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-medium leading-none tracking-tight text-white text-[1.35rem] md:text-5xl lg:text-6xl">
              {project.name}
            </p>
            <p className={`mt-1.5 truncate font-light uppercase tracking-[0.16em] text-white/45 md:mt-2.5 ${bt.mono}`}>
              {project.tagline}
            </p>
          </div>
          <span
            className={`hidden shrink-0 rounded-full px-2 py-0.5 font-mono uppercase tracking-wider text-white/70 md:inline ${bt.mono}`}
            style={{ backgroundColor: `${project.color}28` }}
          >
            Active
          </span>
        </div>

        <div
          className="mt-3 h-px w-16 shrink-0 md:mt-4 md:w-24"
          style={{ backgroundColor: project.color }}
        />

        <ol className="mt-3 grid min-h-0 grid-cols-2 gap-x-4 gap-y-2.5 md:mt-4 md:grid-cols-4 md:gap-x-5">
          {content.chips.map((chip, index) => (
            <li key={chip.label} className="min-w-0">
              <p className={`font-mono text-white/35 ${bt.mono}`}>
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className={`mt-0.5 truncate font-medium text-white ${bt.chip}`}>
                {chip.label}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function BentoMidrPanel({ project, content }: PanelProps) {
  return (
    <div className="relative h-full min-h-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(145deg, ${project.color}33 0%, ${project.color}12 55%, transparent 100%)`,
        }}
      />

      <div className="relative flex h-full min-h-0 flex-col p-2 md:p-3 lg:p-3.5">
        <p className={`shrink-0 font-mono uppercase tracking-[0.14em] text-white/40 ${bt.mono}`}>
          {content.metric.sub ?? "Signal"}
        </p>

        <p
          className={`mt-2 shrink-0 font-light leading-none tracking-tight md:mt-2.5 ${bt.metric}`}
          style={{ color: project.color }}
        >
          {content.metric.value}
        </p>
        <p className={`mt-2 shrink-0 font-medium leading-snug text-white md:mt-2.5 ${bt.subhead}`}>
          {content.metric.label}
        </p>

        <div
          className="mt-2.5 flex min-h-0 flex-1 flex-col justify-center rounded-xl px-3.5 py-3 md:mt-3 md:rounded-2xl md:px-4 md:py-4"
          style={{
            backgroundColor: `${project.color}18`,
            boxShadow: `inset 0 0 0 1px ${project.color}33`,
          }}
        >
          <ul className="space-y-2 md:space-y-2.5">
            {content.metricPoints.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span
                  className="mt-[0.45em] size-1.5 shrink-0 rounded-full md:size-2"
                  style={{ backgroundColor: project.color }}
                />
                <span className={`min-w-0 font-light leading-snug text-white/75 ${bt.caption}`}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function BentoBotPanel({ project, content }: PanelProps) {
  return (
    <div className="relative h-full min-h-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(145deg, ${project.color}33 0%, ${project.color}12 55%, transparent 100%)`,
        }}
      />

      <div className="relative flex h-full min-h-0 flex-col p-2 md:p-3 lg:p-3.5">
        <div className="flex shrink-0 items-center justify-between gap-2">
          <p className={`shrink-0 font-mono uppercase tracking-[0.14em] text-white/40 ${bt.mono}`}>
            Pipeline
          </p>
          <p
            className={`min-w-0 truncate rounded-full px-2 py-0.5 font-light text-white/70 ${bt.mono}`}
            style={{ backgroundColor: `${project.color}28` }}
          >
            {content.access}
          </p>
        </div>

        <ol className="mt-2.5 grid min-h-0 flex-1 grid-cols-1 gap-1.5 md:mt-3 md:grid-cols-3 md:gap-2.5">
          {content.phases.map((phase, index) => (
            <li
              key={phase.title}
              className="flex min-h-0 min-w-0 items-center gap-2.5 rounded-xl px-3 py-1.5 md:flex-col md:items-start md:justify-start md:gap-0 md:rounded-2xl md:px-4 md:py-5 lg:px-5 lg:py-6"
              style={{
                backgroundColor: `${project.color}18`,
                boxShadow: `inset 0 0 0 1px ${project.color}33`,
              }}
            >
              <p className={`shrink-0 font-mono text-white/35 ${bt.mono}`}>
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className={`truncate font-medium text-white md:mt-2 md:whitespace-normal ${bt.phaseTitle}`}>
                {phase.title}
              </p>
              <p className={`hidden font-light leading-snug text-white/70 md:mt-1.5 md:block ${bt.caption}`}>
                {phase.detail}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function BentoBotrPanel({ project, content }: PanelProps) {
  return (
    <div className="relative h-full min-h-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(145deg, ${project.color}33 0%, ${project.color}12 55%, transparent 100%)`,
        }}
      />

      <div className="relative flex h-full min-h-0 flex-col p-2 md:p-3 lg:p-3.5">
        <div className="flex shrink-0 items-center justify-between gap-2">
          <p className={`shrink-0 font-mono uppercase tracking-[0.14em] text-white/40 ${bt.mono}`}>
            Output
          </p>
          <p
            className={`min-w-0 truncate rounded-full px-2 py-0.5 font-light text-white/70 ${bt.mono}`}
            style={{ backgroundColor: `${project.color}28` }}
          >
            {content.access}
          </p>
        </div>

        <p className={`mt-2 shrink-0 font-medium leading-snug text-white md:mt-2.5 ${bt.subhead}`}>
          {content.output}
        </p>

        <div
          className="mt-2.5 flex min-h-0 flex-1 flex-col justify-center rounded-xl px-3.5 py-3 md:mt-3 md:rounded-2xl md:px-4 md:py-4"
          style={{
            backgroundColor: `${project.color}18`,
            boxShadow: `inset 0 0 0 1px ${project.color}33`,
          }}
        >
          <ul className="space-y-2 md:space-y-2.5">
            {content.outputPoints.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span
                  className="mt-[0.45em] size-1.5 shrink-0 rounded-full md:size-2"
                  style={{ backgroundColor: project.color }}
                />
                <span className={`min-w-0 font-light leading-snug text-white/75 ${bt.caption}`}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
