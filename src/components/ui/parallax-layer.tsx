"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

type ParallaxLayerProps = {
  children: ReactNode;
  /** Scroll parallax intensity. Positive drifts opposite to scroll direction feel. */
  speed?: number;
  className?: string;
};

export function ParallaxLayer({
  children,
  speed = 0.12,
  className = "",
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * -140, speed * 140]);
  const smoothY = useSpring(y, { stiffness: 80, damping: 30, mass: 0.35 });

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        style={{ y: smoothY }}
        className="will-change-transform max-md:[transform:none!important] md:transform-gpu"
      >
        {children}
      </motion.div>
    </div>
  );
}
