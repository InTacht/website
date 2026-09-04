import {
  StoryEyebrow,
  StoryHeadline,
  StoryLead,
  StorySection,
} from "@/components/story-primitives";
import { act6 } from "@/lib/field-iq-content";

export function Act6Footer() {
  return (
    <StorySection id="act-6" labelledBy="act6-headline" className="pb-32 md:pb-40">
      <div className="mx-auto max-w-3xl text-center">
        <StoryEyebrow>{act6.eyebrow}</StoryEyebrow>
        <StoryHeadline id="act6-headline">{act6.headline}</StoryHeadline>
        <StoryLead className="mx-auto">{act6.subheadline}</StoryLead>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {act6.ctas.map((cta) => (
            <a
              key={cta.label}
              href={cta.href}
              className={
                cta.variant === "primary"
                  ? "glass rounded-full px-6 py-3 text-sm font-light tracking-wide text-white transition hover:opacity-90 md:px-7 md:text-base"
                  : "rounded-full border border-white/15 px-6 py-3 text-sm font-light tracking-wide text-white/70 transition hover:border-white/30 hover:text-white md:px-7 md:text-base"
              }
            >
              {cta.label}
            </a>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-8 text-[11px] font-light uppercase tracking-[0.22em] text-white/30">
          <span>PyTorch</span>
          <span>GitHub</span>
          <span>arXiv</span>
        </div>
      </div>
    </StorySection>
  );
}
