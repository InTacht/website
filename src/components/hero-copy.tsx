"use client";

import { MagneticItem, squareEntrance } from "@/components/magnetic";

export function HeroCopy() {
  return (
    <MagneticItem
      className="absolute bottom-0 left-0 z-10 max-w-xl px-8 pb-16 pt-24 text-left md:max-w-2xl md:px-14 md:pb-20 lg:px-16 lg:pb-24"
      strength={10}
      entrance={squareEntrance.heroText}
    >
      <h1 className="font-display text-4xl font-normal leading-[1.15] tracking-[-0.02em] text-white md:text-5xl lg:text-6xl">
        <span className="block whitespace-nowrap">Where Data</span>
        <span className="block whitespace-nowrap">Becomes Your Alpha.</span>
      </h1>
      <p className="mt-4 text-lg font-light leading-relaxed tracking-wide text-white/55 md:mt-5 md:text-xl">
        Democratizing compute power and AI-driven intelligence through a unified
        ecosystem of distributed infrastructure, accessible research, and
        self-learning platforms.
      </p>
    </MagneticItem>
  );
}
