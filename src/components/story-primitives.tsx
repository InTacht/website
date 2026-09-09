import type { ReactNode } from "react";

export function StorySection({
  id,
  labelledBy,
  children,
  className = "",
}: {
  id: string;
  labelledBy: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative px-8 py-24 md:px-14 md:py-32 lg:px-16 lg:py-36 ${className}`}
    >
      <div className="relative mx-auto max-w-5xl">{children}</div>
    </section>
  );
}

export function StoryEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 text-[11px] font-light uppercase tracking-[0.28em] text-white/40">
      {children}
    </p>
  );
}

export function StoryHeadline({
  id,
  children,
  as: Tag = "h2",
}: {
  id: string;
  children: ReactNode;
  as?: "h1" | "h2";
}) {
  return (
    <Tag
      id={id}
      className="max-w-3xl font-display text-balance text-3xl font-normal leading-[1.15] tracking-[-0.02em] text-white md:text-5xl lg:text-[3.25rem]"
    >
      {children}
    </Tag>
  );
}

export function StoryLead({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`mt-5 max-w-xl text-lg font-light leading-relaxed tracking-wide text-white/55 md:text-xl ${className}`}
    >
      {children}
    </p>
  );
}

export function StoryBody({ children }: { children: ReactNode }) {
  return (
    <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-white/45 md:text-lg">
      {children}
    </p>
  );
}
