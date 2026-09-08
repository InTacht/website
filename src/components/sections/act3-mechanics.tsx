"use client";

import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import {
  StoryEyebrow,
  StoryHeadline,
  StorySection,
} from "@/components/story-primitives";
import { DepositFieldPlate } from "@/components/story-graphics/deposit-field-plate";
import { PropagateFieldPlate } from "@/components/story-graphics/propagate-field-plate";
import { ReadBackFieldPlate } from "@/components/story-graphics/readback-field-plate";
import { NotchedGlass } from "@/components/ui/notched-glass";
import { act3 } from "@/lib/field-iq-content";

const PLATES = [DepositFieldPlate, PropagateFieldPlate, ReadBackFieldPlate] as const;
const EASE = [0.32, 0.72, 0, 1] as const;

export function Act3Mechanics() {
  const [active, setActive] = useState<0 | 1 | 2>(0);
  const reduceMotion = useReducedMotion();
  const step = act3.steps[active];
  const Plate = PLATES[active];

  return (
    <StorySection id="act-3" labelledBy="act3-headline">
      <StoryEyebrow>{act3.eyebrow}</StoryEyebrow>
      <StoryHeadline id="act3-headline">{act3.headline}</StoryHeadline>

      <NotchedGlass
        className="mt-10 md:mt-12"
        tabs={
          <LayoutGroup>
            <div
              role="tablist"
              aria-label="Field-IQ mechanics"
              className="flex items-center gap-0.5 px-1 py-1 sm:gap-1"
            >
            {act3.steps.map((item, index) => {
              const isActive = index === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`act3-tab-${item.id}`}
                  aria-selected={isActive}
                  aria-controls="act3-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(index as 0 | 1 | 2)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                      event.preventDefault();
                      const dir = event.key === "ArrowRight" ? 1 : -1;
                      const next = ((index + dir + act3.steps.length) %
                        act3.steps.length) as 0 | 1 | 2;
                      setActive(next);
                      document
                        .getElementById(`act3-tab-${act3.steps[next].id}`)
                        ?.focus();
                    }
                  }}
                  className={`relative isolate rounded-full px-3 py-1 text-[13px] font-light tracking-tight transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:outline-none sm:px-3.5 ${
                    isActive ? "text-white" : "text-white/40 hover:text-white/70"
                  }`}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="act3-tab-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.1]"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 420, damping: 36 }
                      }
                    />
                  ) : null}
                  <span className="relative">{item.title}</span>
                </button>
              );
            })}
            </div>
          </LayoutGroup>
        }
      >

        <motion.div
            key={step.id}
            id="act3-panel"
            role="tabpanel"
            aria-labelledby={`act3-tab-${step.id}`}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: EASE }}
            className="grid items-center gap-8 lg:grid-cols-[2fr_3fr] lg:gap-10"
          >
            <div className="min-w-0">
              <h3 className="font-display text-[2rem] font-normal leading-none tracking-[-0.03em] text-white md:text-[2.55rem]">
                {step.title}
              </h3>
              <p className="mt-3 text-base font-light text-white/70 md:text-lg">
                {step.caption}
              </p>
              <p className="mt-4 text-sm font-light leading-relaxed text-white/45 md:text-[15px]">
                {step.body}
              </p>
            </div>
            <Plate />
          </motion.div>
      </NotchedGlass>
    </StorySection>
  );
}
