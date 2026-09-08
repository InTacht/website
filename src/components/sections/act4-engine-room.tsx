"use client";

import { GrassmannianMemoryPlate } from "@/components/story-graphics/grassmannian-memory-plate";
import { HolographicWavePlate } from "@/components/story-graphics/holographic-wave-plate";
import {
  StoryEyebrow,
  StoryHeadline,
  StorySection,
} from "@/components/story-primitives";
import { GlassCard } from "@/components/ui/glass-card";
import { ParallaxLayer } from "@/components/ui/parallax-layer";
import { act4 } from "@/lib/field-iq-content";

export function Act4EngineRoom() {
  return (
    <StorySection id="act-4" labelledBy="act4-headline">
      <StoryEyebrow>{act4.eyebrow}</StoryEyebrow>
      <StoryHeadline id="act4-headline">{act4.headline}</StoryHeadline>

      <div className="mt-14 grid gap-5 md:grid-cols-2 md:gap-6">
        {act4.cards.map((card) => (
          <ParallaxLayer key={card.id} speed={card.speed}>
            <GlassCard className="flex h-full flex-col p-6 md:p-8">
              <h3 className="text-xl font-light tracking-tight text-white md:text-2xl">
                {card.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {card.points.map((point) => (
                  <li
                    key={point}
                    className="text-sm font-light leading-relaxed text-white/50 md:text-[15px]"
                  >
                    {point}
                  </li>
                ))}
              </ul>
              {card.id === "holo" ? (
                <HolographicWavePlate />
              ) : (
                <GrassmannianMemoryPlate />
              )}
            </GlassCard>
          </ParallaxLayer>
        ))}
      </div>
    </StorySection>
  );
}
