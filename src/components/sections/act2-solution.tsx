"use client";

import {
  StoryBody,
  StoryEyebrow,
  StoryHeadline,
  StoryLead,
  StorySection,
} from "@/components/story-primitives";
import { AssetSlot } from "@/components/ui/asset-slot";
import { GlassCard } from "@/components/ui/glass-card";
import { ParallaxLayer } from "@/components/ui/parallax-layer";
import { act2, fieldIqAssets } from "@/lib/field-iq-content";

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

        <div className="relative">
          <ParallaxLayer speed={-0.06} className="absolute inset-x-0 -top-8 opacity-50">
            <AssetSlot
              src={fieldIqAssets.spatialGrid}
              fallbackSrc={fieldIqAssets.fallbacks.spatialGrid}
              label="Spatial field"
              aspect="aspect-[21/9]"
              fit="contain"
              className="border-0 bg-transparent shadow-none"
            />
          </ParallaxLayer>

          <ParallaxLayer speed={0.14}>
            <AssetSlot
              src={fieldIqAssets.waveVector}
              fallbackSrc={fieldIqAssets.fallbacks.waveVector}
              label="Continuous field waves"
              aspect="aspect-square"
              fit="contain"
              className="mx-auto max-w-md"
            />
          </ParallaxLayer>
        </div>
      </div>
    </StorySection>
  );
}
