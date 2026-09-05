"use client";

import {
  StoryBody,
  StoryEyebrow,
  StoryHeadline,
  StoryLead,
  StorySection,
} from "@/components/story-primitives";
import { SpatialFieldPlate } from "@/components/story-graphics/spatial-field-plate";
import { WaveFieldPlate } from "@/components/story-graphics/wave-field-plate";
import { GlassCard } from "@/components/ui/glass-card";
import { ParallaxLayer } from "@/components/ui/parallax-layer";
import { act2 } from "@/lib/field-iq-content";

export function Act2Solution() {
  return (
    <StorySection id="act-2" labelledBy="act2-headline">
      <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <StoryEyebrow>{act2.eyebrow}</StoryEyebrow>
          <StoryHeadline id="act2-headline">{act2.headline}</StoryHeadline>
          <StoryLead>{act2.subheadline}</StoryLead>

          <GlassCard className="mt-8 p-5 md:p-6">
            <p className="text-[11px] font-light uppercase tracking-[0.22em] text-white/40">
              Product reveal
            </p>
            <p className="mt-2 text-lg font-light tracking-tight text-white md:text-xl">
              {act2.productReveal}
            </p>
          </GlassCard>

          <StoryBody>{act2.body}</StoryBody>
        </div>

        <div className="relative space-y-4">
          <ParallaxLayer speed={-0.06}>
            <SpatialFieldPlate />
          </ParallaxLayer>

          <ParallaxLayer speed={0.14}>
            <WaveFieldPlate />
          </ParallaxLayer>
        </div>
      </div>
    </StorySection>
  );
}
