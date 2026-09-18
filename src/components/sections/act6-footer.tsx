import {
  StoryHeadline,
  StorySection,
} from "@/components/story-primitives";
import { CtaLink } from "@/components/ui/cta";
import { act6 } from "@/lib/field-iq-content";

export function Act6Footer() {
  return (
    <StorySection id="act-6" labelledBy="act6-headline" className="pb-40 md:pb-52">
      <div className="relative mx-auto max-w-3xl text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-6 -inset-y-8 rounded-[2.5rem] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.46)_45%,transparent_76%)] md:-inset-x-12 md:-inset-y-10"
        />

        <div className="relative [text-shadow:0_2px_18px_rgba(0,0,0,0.82)]">
          <p className="story-eyebrow mb-4 text-[11px] font-light uppercase tracking-[0.28em] text-white/75">
            {act6.eyebrow}
          </p>
          <StoryHeadline id="act6-headline">{act6.headline}</StoryHeadline>
          <p className="story-lead mx-auto mt-5 max-w-xl text-lg font-light leading-relaxed tracking-wide text-white md:text-xl">
            {act6.subheadline}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {act6.ctas.map((cta) => (
              <CtaLink key={cta.label} href={cta.href} variant={cta.variant}>
                {cta.label}
              </CtaLink>
            ))}
          </div>

          <p className="mx-auto mt-14 max-w-lg text-[13px] font-light leading-relaxed text-white/70">
            {act6.note}
          </p>
        </div>
      </div>
    </StorySection>
  );
}
