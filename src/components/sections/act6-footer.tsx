import {
  StoryHeadline,
  StorySection,
} from "@/components/story-primitives";
import { act6 } from "@/lib/field-iq-content";

const CTA_CLASS =
  "glass rounded-full px-6 py-3 text-sm font-light tracking-wide text-white transition hover:opacity-90 md:px-7 md:text-base";

const CTA_FILL = {
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(8,9,16,0.62) 100%)",
} as const;

export function Act6Footer() {
  return (
    <StorySection id="act-6" labelledBy="act6-headline" className="pb-32 md:pb-40">
      <div className="relative mx-auto max-w-3xl text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-6 -inset-y-8 rounded-[2.5rem] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.46)_45%,transparent_76%)] md:-inset-x-12 md:-inset-y-10"
        />

        <div className="relative [text-shadow:0_2px_18px_rgba(0,0,0,0.82)]">
          <p className="mb-4 text-[11px] font-light uppercase tracking-[0.28em] text-white/75">
            {act6.eyebrow}
          </p>
          <StoryHeadline id="act6-headline">{act6.headline}</StoryHeadline>
          <p className="mx-auto mt-5 max-w-xl text-lg font-light leading-relaxed tracking-wide text-white md:text-xl">
            {act6.subheadline}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {act6.ctas.map((cta) => (
              <a
                key={cta.label}
                href={cta.href}
                className={CTA_CLASS}
                style={CTA_FILL}
              >
                {cta.label}
              </a>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-8 text-[11px] font-light uppercase tracking-[0.22em] text-white/75">
            <span>PyTorch</span>
            <span>GitHub</span>
            <span>arXiv</span>
          </div>
        </div>
      </div>
    </StorySection>
  );
}
