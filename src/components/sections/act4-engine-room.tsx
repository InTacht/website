"use client";

import {
  StoryEyebrow,
  StoryHeadline,
  StorySection,
} from "@/components/story-primitives";
import { AssetSlot } from "@/components/ui/asset-slot";
import { GlassCard } from "@/components/ui/glass-card";
import { ParallaxLayer } from "@/components/ui/parallax-layer";
import { act4, fieldIqAssets } from "@/lib/field-iq-content";

const CARD_FALLBACKS = {
  holo: fieldIqAssets.fallbacks.holo,
  gmem: fieldIqAssets.fallbacks.gmem,
} as const;

export function Act4EngineRoom() {
  return (
    <StorySection id="act-4" labelledBy="act4-headline">
      <StoryEyebrow>{act4.eyebrow}</StoryEyebrow>
      <StoryHeadline id="act4-headline">{act4.headline}</StoryHeadline>

      <div className="mt-14 grid gap-5 md:grid-cols-2 md:gap-6">
        {act4.cards.map((card) => (
          <ParallaxLayer key={card.id} speed={card.speed}>
            <GlassCard className="h-full p-6 md:p-8">
              <h3 className="text-xl font-light tracking-tight text-white md:text-2xl">
                {card.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {card.points.map((point) => (
                  <li
                    key={point}
                    className="text-sm font-light leading-relaxed text-white/50 md:text-base"
                  >
                    {point}
                  </li>
                ))}
              </ul>
              <AssetSlot
                src={card.asset}
                fallbackSrc={CARD_FALLBACKS[card.id as keyof typeof CARD_FALLBACKS]}
                label={`${card.title} diagram`}
                className="mt-6"
                aspect="aspect-[16/10]"
                fit="contain"
              />
            </GlassCard>
          </ParallaxLayer>
        ))}
      </div>
    </StorySection>
  );
}
