import type { Project } from "@/lib/projects";

type ProjectSectionProps = {
  project: Project;
  index: number;
};

export function ProjectSection({ project, index }: ProjectSectionProps) {
  return (
    <section
      id={project.id}
      className="scroll-mt-14 border-t border-line py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-4">
          <div className="flex items-center gap-3">
            <span
              className="size-2 shrink-0 rounded-full"
              style={{ backgroundColor: project.color }}
              aria-hidden
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
              0{index + 1}
            </span>
          </div>
          <h2 className="mt-6 text-3xl font-medium tracking-tight text-ink md:text-4xl">
            {project.name}
          </h2>
          <p
            className="mt-3 font-mono text-xs uppercase tracking-[0.15em]"
            style={{ color: project.color }}
          >
            {project.tagline}
          </p>
        </div>

        <div className="md:col-span-8 md:pt-8">
          <p className="max-w-xl text-base leading-relaxed text-ink-muted md:text-lg">
            {project.description}
          </p>
          <div className="mt-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-faint">
            <span className="size-1 animate-pulse-slow rounded-full bg-accent" />
            In development
          </div>
        </div>
      </div>
    </section>
  );
}
