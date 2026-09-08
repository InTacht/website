"use client";

import {
  StoryEyebrow,
  StoryHeadline,
  StorySection,
} from "@/components/story-primitives";
import { KvCachePlate } from "@/components/story-graphics/kv-cache-plate";
import { MqarRecallPlate } from "@/components/story-graphics/mqar-recall-plate";
import { GlassCard } from "@/components/ui/glass-card";
import { ParallaxLayer } from "@/components/ui/parallax-layer";
import { act5 } from "@/lib/field-iq-content";

const LOSE_BG = "bg-[rgba(248,113,113,0.22)]";
const WIN =
  "bg-[rgba(143,85,251,0.09)] text-white";

export function Act5Impact() {
  return (
    <StorySection id="act-5" labelledBy="act5-headline">
      <StoryEyebrow>{act5.eyebrow}</StoryEyebrow>
      <StoryHeadline id="act5-headline">{act5.headline}</StoryHeadline>

      <ParallaxLayer speed={0.06} className="mt-12">
        <GlassCard className="overflow-hidden">
          <div className="grid gap-6 p-5 md:hidden">
            {act5.rows.map((row) => (
              <div
                key={row.metric}
                className="border-b border-white/10 pb-5 last:border-0 last:pb-0"
              >
                <p className="text-[11px] font-light uppercase tracking-[0.18em] text-white/40">
                  {row.metric}
                </p>
                <div className="mt-3 grid gap-3">
                  <p className="rounded-2xl bg-[rgba(248,113,113,0.22)] px-3.5 py-3 text-sm font-light leading-relaxed text-[#fecaca]">
                    <span className="mb-1 block text-[10px] uppercase tracking-[0.18em] text-[#f87171]">
                      Traditional
                    </span>
                    {row.traditional}
                  </p>
                  <p className="rounded-2xl bg-[rgba(143,85,251,0.09)] px-3.5 py-3 text-sm font-light leading-relaxed text-white">
                    <span className="mb-1 block text-[10px] uppercase tracking-[0.18em] text-[#c4b5fd]">
                      Field-IQ
                    </span>
                    {row.fieldIq}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <colgroup>
                <col className="w-[24%]" />
                <col className="w-[34%]" />
                <col className="w-[42%]" />
              </colgroup>
              <thead>
                <tr className="border-b border-white/12">
                  <th
                    scope="col"
                    className="px-6 py-4 text-[11px] font-light uppercase tracking-[0.18em] text-white/35 lg:px-8"
                  >
                    {act5.columns[0]}
                  </th>
                  <th
                    scope="col"
                    className={`border-l border-[rgba(248,113,113,0.35)] px-6 py-4 text-[11px] font-light uppercase tracking-[0.18em] text-[#f87171] lg:px-8 ${LOSE_BG}`}
                  >
                    {act5.columns[1]}
                  </th>
                  <th
                    scope="col"
                    className={`border-l border-[rgba(196,181,253,0.22)] px-6 py-4 text-[11px] font-light uppercase tracking-[0.18em] text-[#c4b5fd] lg:px-8 ${WIN}`}
                  >
                    {act5.columns[2]}
                  </th>
                </tr>
              </thead>
              <tbody>
                {act5.rows.map((row) => (
                  <tr
                    key={row.metric}
                    className="border-b border-white/8 last:border-0"
                  >
                    <th
                      scope="row"
                      className="px-6 py-6 text-[15px] font-light tracking-tight text-white lg:px-8"
                    >
                      {row.metric}
                    </th>
                    <td
                      className={`border-l border-[rgba(248,113,113,0.28)] px-6 py-6 text-sm font-light leading-relaxed text-[#fecaca] lg:px-8 ${LOSE_BG}`}
                    >
                      {row.traditional}
                    </td>
                    <td
                      className={`border-l border-[rgba(196,181,253,0.18)] px-6 py-6 text-sm font-light leading-relaxed lg:px-8 ${WIN}`}
                    >
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
          <MqarRecallPlate />
        </ParallaxLayer>
        <ParallaxLayer speed={-0.08}>
          <KvCachePlate />
        </ParallaxLayer>
      </div>
    </StorySection>
  );
}
