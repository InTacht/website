"use client";

import { EnergyChartPlate } from "@/components/story-graphics/energy-chart-plate";
import { FrontierModelPlate } from "@/components/story-graphics/frontier-model-plate";
import {
  HardwareChassisPlate,
  HardwareGpuPlate,
} from "@/components/story-graphics/hardware-stack-plate";
import {
  StoryBody,
  StoryEyebrow,
  StoryHeadline,
  StoryLead,
} from "@/components/story-primitives";
import { GlassCard } from "@/components/ui/glass-card";
import { MetricBadge } from "@/components/ui/metric-badge";
import { ParallaxLayer } from "@/components/ui/parallax-layer";
import { act1 } from "@/lib/field-iq-content";

export function Act1Problem() {
  return (
    <section
      id="act-1"
      aria-labelledby="act1-headline"
      className="relative flex min-h-svh flex-col justify-start px-8 pb-40 pt-24 md:px-14 md:pb-48 md:pt-32 lg:px-16"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-14 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div>
          <StoryEyebrow>{act1.eyebrow}</StoryEyebrow>
          <StoryHeadline id="act1-headline">{act1.headline}</StoryHeadline>
          <StoryLead>{act1.subheadline}</StoryLead>
          <StoryBody>{act1.body}</StoryBody>

          <GlassCard className="mt-8 p-5 md:p-6">
            <p className="text-sm font-light leading-relaxed text-white/70 md:text-base">
              {act1.callout}
            </p>
          </GlassCard>

          <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-white/70 md:text-lg">
            {act1.bottomLine}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {act1.metrics.map((metric, index) => (
              <ParallaxLayer key={metric.id} speed={0.06 + index * 0.04}>
                <MetricBadge label={metric.label} icon={metric.icon} />
              </ParallaxLayer>
            ))}
          </div>
        </div>

        <div className="relative space-y-4">
          <ParallaxLayer speed={0.08}>
            <FrontierModelPlate />
          </ParallaxLayer>

          <div className="relative">
            <ParallaxLayer speed={0.12}>
              <HardwareChassisPlate />
            </ParallaxLayer>
            <div className="absolute -bottom-5 -right-1 w-[42%] md:-right-3">
              <ParallaxLayer speed={0.28}>
                <HardwareGpuPlate />
              </ParallaxLayer>
            </div>
          </div>

          <ParallaxLayer speed={0.1} className="pt-6">
            <EnergyChartPlate />
          </ParallaxLayer>
        </div>
      </div>
    </section>
  );
}
