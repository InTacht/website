"use client";

import { useState } from "react";
import {
  StoryEyebrow,
  StoryHeadline,
  StorySection,
} from "@/components/story-primitives";
import { AssetSlot } from "@/components/ui/asset-slot";
import { GlassCard } from "@/components/ui/glass-card";
import { ParallaxLayer } from "@/components/ui/parallax-layer";
import { act3, fieldIqAssets } from "@/lib/field-iq-content";

const STEP_FALLBACKS = [
  fieldIqAssets.fallbacks.deposit,
  fieldIqAssets.fallbacks.propagate,
  fieldIqAssets.fallbacks.readback,
] as const;

export function Act3Mechanics() {
  const [active, setActive] = useState(0);
  const step = act3.steps[active];

  return (
    <StorySection id="act-3" labelledBy="act3-headline">
      <StoryEyebrow>{act3.eyebrow}</StoryEyebrow>
      <StoryHeadline id="act3-headline">{act3.headline}</StoryHeadline>

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-12">
        <div className="space-y-3">
          {act3.steps.map((item, index) => {
            const isActive = index === active;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
                className="block w-full text-left"
              >
                <GlassCard
                  className={`p-5 transition-opacity duration-300 md:p-6 ${
                    isActive ? "opacity-100" : "opacity-45 hover:opacity-70"
                  }`}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-white/35">{item.index}</span>
                    <h3 className="text-lg font-light tracking-tight text-white md:text-xl">
                      {item.title}
                      <span className="text-white/35"> · {item.subtitle}</span>
                    </h3>
                  </div>
                  <p className="mt-3 text-sm font-light leading-relaxed text-white/50 md:text-base">
                    {item.body}
                  </p>
                </GlassCard>
              </button>
            );
          })}
        </div>

        <ParallaxLayer speed={0.1} className="lg:sticky lg:top-28">
          <AssetSlot
            key={step.id}
            src={step.asset}
            fallbackSrc={STEP_FALLBACKS[active]}
            label={`${step.title} visual`}
            aspect="aspect-[4/3]"
            fit="contain"
          />
        </ParallaxLayer>
      </div>
    </StorySection>
  );
}
