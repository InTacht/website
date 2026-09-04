"use client";

import {
  StoryEyebrow,
  StoryHeadline,
  StorySection,
} from "@/components/story-primitives";
import { AssetSlot } from "@/components/ui/asset-slot";
import { GlassCard } from "@/components/ui/glass-card";
import { ParallaxLayer } from "@/components/ui/parallax-layer";
import { act5, fieldIqAssets } from "@/lib/field-iq-content";

export function Act5Impact() {
  return (
    <StorySection id="act-5" labelledBy="act5-headline">
      <StoryEyebrow>{act5.eyebrow}</StoryEyebrow>
      <StoryHeadline id="act5-headline">{act5.headline}</StoryHeadline>

      <ParallaxLayer speed={0.06} className="mt-12">
        <GlassCard className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-[720px] w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10">
                  {act5.columns.map((column) => (
                    <th
                      key={column}
                      className="px-5 py-4 text-[11px] font-light uppercase tracking-[0.18em] text-white/40 md:px-6"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {act5.rows.map((row) => (
                  <tr
                    key={row.metric}
                    className="border-b border-white/5 last:border-0"
                  >
                    <td className="px-5 py-5 text-sm font-light text-white md:px-6 md:text-base">
                      {row.metric}
                    </td>
                    <td className="px-5 py-5 text-sm font-light leading-relaxed text-white/40 md:px-6">
                      {row.traditional}
                    </td>
                    <td className="px-5 py-5 text-sm font-light leading-relaxed text-white/75 md:px-6">
                      {row.fieldIq}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </ParallaxLayer>

      <div className="mt-8 grid gap-5 md:grid-cols-2 md:gap-6">
        <ParallaxLayer speed={0.1}>
          <AssetSlot
            src={fieldIqAssets.mqarPlot}
            fallbackSrc={fieldIqAssets.fallbacks.mqarPlot}
            label="MQAR recall performance"
            aspect="aspect-[16/10]"
            fit="contain"
          />
        </ParallaxLayer>
        <ParallaxLayer speed={-0.08}>
          <AssetSlot
            src={fieldIqAssets.kvCache}
            fallbackSrc={fieldIqAssets.fallbacks.kvCache}
            label="KV-cache memory footprint"
            aspect="aspect-[16/10]"
            fit="contain"
          />
        </ParallaxLayer>
      </div>
    </StorySection>
  );
}
