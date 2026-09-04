"use client";

import type { BentoPanelContent } from "@/lib/bento-content";
import { bt } from "@/lib/bento-type";
import type { Project } from "@/lib/projects";

type PanelProps = {
  project: Project;
  content: BentoPanelContent;
};

function hexAlpha(hex: string, alpha: number) {
  const normalized = hex.replace("#", "");
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function ColorWash({ color, intensity = 0.14 }: { color: string; intensity?: number }) {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 120% 80% at 100% 100%, ${hexAlpha(color, intensity)} 0%, transparent 58%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
    </>
  );
}

function FabricVisual({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 260" className="size-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="fabricGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.05" />
          <stop offset="100%" stopColor={color} stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <rect width="200" height="260" fill="url(#fabricGrad)" />
      {Array.from({ length: 14 }, (_, i) => {
        const cx = 8 + (i % 4) * 14 + (Math.floor(i / 4) % 2) * 6;
        const cy = 180 + Math.floor(i / 4) * 16 + (i % 3) * 4;
        return <circle key={`n-${i}`} cx={cx} cy={cy} r="3" fill="white" opacity="0.55" />;
      })}
      {Array.from({ length: 10 }, (_, i) => (
        <path
          key={`w-${i}`}
          d={`M ${42 + i * 3} ${20 + i * 22} C ${90 + i * 2} ${8 + i * 20}, ${130 + i} ${30 + i * 22}, ${185} ${18 + i * 22}`}
          fill="none"
          stroke={color}
          strokeWidth={1.4 + (i % 3) * 0.3}
          opacity={0.25 + i * 0.06}
        />
      ))}
    </svg>
  );
}

function ResearchVisual({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 260" className="size-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {[
        { y: 30, w: 130, h: 36, label: "DATA_PLANE" },
        { y: 92, w: 160, h: 40, label: "COMPUTE_GRID" },
        { y: 158, w: 118, h: 34, label: "RESEARCH_VEC" },
        { y: 214, w: 90, h: 30, label: "OUTPUT" },
      ].map((plane, i) => (
        <g key={plane.label}>
          <rect
            x={(200 - plane.w) / 2}
            y={plane.y}
            width={plane.w}
            height={plane.h}
            rx="3"
            fill={color}
            opacity={0.08 + i * 0.04}
            stroke={color}
            strokeWidth="1"
            strokeOpacity="0.45"
          />
          <text
            x="100"
            y={plane.y + plane.h / 2 + 4}
            textAnchor="middle"
            fill="white"
            fontSize="9"
            opacity="0.55"
            fontFamily="monospace"
          >
            {plane.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function LoopVisual({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 260" className="size-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <path
        d="M 55 130 C 55 70, 115 70, 115 130 C 115 190, 55 190, 55 130 Z"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        opacity="0.45"
      />
      <path
        d="M 115 130 C 115 70, 175 70, 175 130 C 175 190, 115 190, 115 130 Z"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        opacity="0.7"
      />
      {[
        ["TRAIN", 55, 118],
        ["MEASURE", 100, 218],
        ["CORRECT", 155, 118],
      ].map(([label, x, y]) => (
        <text
          key={label as string}
          x={x as number}
          y={y as number}
          textAnchor="middle"
          fill="white"
          fontSize="10"
          opacity="0.65"
          fontFamily="monospace"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}

function TallVisual({ id, color }: { id: Project["id"]; color: string }) {
  if (id === "xqua") return <FabricVisual color={color} />;
  if (id === "iq") return <ResearchVisual color={color} />;
  return <LoopVisual color={color} />;
}

export function BentoTallPanel({ project, content }: PanelProps) {
  return (
    <div className="relative h-full min-h-0 overflow-hidden">
      <ColorWash color={project.color} intensity={0.18} />
      <p
        className={`pointer-events-none absolute -right-1 top-3 select-none font-light leading-none tracking-tighter opacity-[0.06] md:top-4 ${bt.watermark}`}
        aria-hidden
      >
        {project.name}
      </p>

      <div className="relative flex h-full min-h-0 flex-col p-2.5 md:p-4 lg:p-5">
        <p className={`font-mono uppercase tracking-[0.16em] text-white/45 ${bt.mono}`}>
          {content.mono}
        </p>
        <h3 className={`mt-1.5 font-medium leading-[1.2] tracking-tight text-white md:mt-2 ${bt.headline}`}>
          {content.headline}
        </h3>
        <p className={`mt-1.5 line-clamp-3 font-light leading-[1.5] text-white/55 md:mt-2 ${bt.body}`}>
          {content.body}
        </p>

        <ul className="mt-2 space-y-0.5 md:mt-2.5 md:space-y-1">
          {content.highlights.map((item) => (
            <li
              key={item}
              className={`flex items-start gap-1.5 font-light leading-snug text-white/65 ${bt.caption}`}
            >
              <span
                className="mt-[0.35em] size-1 shrink-0 rounded-full md:size-1.5"
                style={{ backgroundColor: project.color }}
              />
              {item}
            </li>
          ))}
        </ul>

        <div className="relative mt-auto min-h-[38%] flex-1 overflow-hidden rounded-lg md:min-h-[40%] lg:rounded-2xl">
          <div
            className="absolute inset-0 rounded-lg lg:rounded-2xl"
            style={{ boxShadow: `inset 0 0 0 1px ${project.color}33` }}
          />
          <TallVisual id={project.id} color={project.color} />
        </div>
      </div>
    </div>
  );
}

export function BentoTopPanel({ project, content }: PanelProps) {
  return (
    <div className="relative h-full min-h-0 overflow-hidden">
      <ColorWash color={project.color} intensity={0.12} />

      <div className="relative flex h-full flex-col justify-between p-2.5 md:p-4 lg:p-5">
        <div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <div
                className={`flex size-6 shrink-0 items-center justify-center rounded-md font-semibold text-white md:size-8 md:rounded-lg lg:size-9 ${bt.caption}`}
                style={{ backgroundColor: `${project.color}88` }}
              >
                {project.name.slice(0, 1)}
              </div>
              <div className="min-w-0">
                <p className={`truncate font-medium tracking-tight text-white ${bt.title}`}>
                  {project.name}
                </p>
                <p className={`truncate font-light uppercase tracking-[0.12em] text-white/45 ${bt.mono}`}>
                  {project.tagline}
                </p>
              </div>
            </div>
            <span
              className={`hidden shrink-0 rounded-full px-2 py-0.5 font-mono uppercase tracking-wider text-white/50 md:inline ${bt.mono}`}
              style={{ backgroundColor: `${project.color}22` }}
            >
              Active
            </span>
          </div>

          <p className={`mt-2 line-clamp-2 font-light leading-relaxed text-white/55 md:mt-2.5 ${bt.body}`}>
            {content.body}
          </p>
        </div>

        <div className="mt-2 grid grid-cols-2 gap-1 md:mt-2.5 md:gap-1.5 lg:gap-2">
          {content.chips.map((chip) => (
            <span
              key={chip}
              className={`flex items-center rounded-md border border-white/10 px-1.5 py-1 font-light text-white/70 md:rounded-lg md:px-2 md:py-1.5 lg:px-2.5 lg:py-2 ${bt.chip}`}
              style={{ backgroundColor: `${project.color}14` }}
            >
              <span
                className="mr-1 size-1 shrink-0 rounded-full md:mr-1.5 md:size-1.5"
                style={{ backgroundColor: project.color }}
              />
              <span className="truncate">{chip}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BentoMidrPanel({ project, content }: PanelProps) {
  return (
    <div className="relative h-full min-h-0 overflow-hidden">
      <ColorWash color={project.color} intensity={0.22} />

      <div className="relative flex h-full flex-col items-center justify-center p-2 text-center md:p-3 lg:p-4">
        <div
          className="relative flex size-[76%] max-w-[80px] items-center justify-center rounded-full md:max-w-[120px] lg:max-w-[150px]"
          style={{
            background: `radial-gradient(circle, ${project.color}33 0%, ${project.color}08 70%, transparent 100%)`,
            boxShadow: `inset 0 0 0 1px ${project.color}44`,
          }}
        >
          <div>
            <p
              className={`font-light leading-none tracking-tight ${bt.metric}`}
              style={{ color: project.color }}
            >
              {content.metric.value}
            </p>
            {content.metric.sub ? (
              <p className={`mt-0.5 font-mono uppercase tracking-wider text-white/40 ${bt.metricSub}`}>
                {content.metric.sub}
              </p>
            ) : null}
          </div>
        </div>
        <p className={`mt-1.5 font-medium uppercase tracking-[0.12em] text-white/55 md:mt-2 ${bt.mono}`}>
          {content.metric.label}
        </p>
      </div>
    </div>
  );
}

export function BentoBotPanel({ project, content }: PanelProps) {
  return (
    <div className="relative h-full min-h-0 overflow-hidden">
      <ColorWash color={project.color} intensity={0.1} />

      <div className="relative flex h-full flex-col p-2.5 md:p-4 lg:p-5">
        <div className="flex items-center justify-between gap-2">
          <p className={`shrink-0 font-mono uppercase tracking-[0.14em] text-white/45 ${bt.mono}`}>
            Pipeline
          </p>
          <p
            className={`truncate rounded-full px-2 py-0.5 font-light text-white/55 ${bt.mono}`}
            style={{ backgroundColor: `${project.color}22` }}
          >
            {content.access}
          </p>
        </div>

        <div className="mt-2 grid flex-1 grid-cols-3 gap-1 md:mt-2.5 md:gap-1.5 lg:gap-2">
          {content.phases.map((phase, index) => (
            <div
              key={phase.title}
              className="flex min-h-0 flex-col rounded-lg p-1.5 md:rounded-xl md:p-2 lg:rounded-2xl lg:p-2.5"
              style={{
                backgroundColor: `${project.color}${index === 1 ? "22" : "14"}`,
                boxShadow: `inset 0 0 0 1px ${project.color}${index === 1 ? "44" : "28"}`,
              }}
            >
              <div className="flex items-center gap-1">
                <span
                  className={`flex size-3.5 shrink-0 items-center justify-center rounded-full font-semibold text-white md:size-5 lg:size-6 ${bt.mono}`}
                  style={{ backgroundColor: project.color }}
                >
                  {index + 1}
                </span>
                <p className={`truncate font-medium text-white ${bt.phaseTitle}`}>
                  {phase.title}
                </p>
              </div>
              <p className={`mt-1 line-clamp-3 flex-1 font-light leading-[1.4] text-white/55 md:mt-1.5 ${bt.phaseBody}`}>
                {phase.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BentoBotrPanel({ project, content }: { project: Project; content: BentoPanelContent }) {
  return (
    <div className="relative h-full min-h-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(145deg, ${project.color}33 0%, ${project.color}12 55%, transparent 100%)`,
        }}
      />

      <div className="relative flex h-full flex-col justify-between p-2 md:p-3 lg:p-4">
        <p className={`font-mono uppercase tracking-[0.14em] text-white/40 ${bt.mono}`}>
          Output
        </p>

        <div>
          <div
            className="mb-1.5 flex size-7 items-center justify-center rounded-lg md:mb-2 md:size-9 lg:size-10 lg:rounded-xl"
            style={{ backgroundColor: `${project.color}44` }}
          >
            <div
              className="size-2.5 rounded-full md:size-3 lg:size-3.5"
              style={{ backgroundColor: project.color, boxShadow: `0 0 18px ${project.color}88` }}
            />
          </div>
          <p className={`font-medium leading-tight text-white ${bt.subhead}`}>
            {content.output}
          </p>
        </div>

        <p className={`line-clamp-2 font-light leading-snug text-white/45 ${bt.caption}`}>
          {content.access}
        </p>
      </div>
    </div>
  );
}
