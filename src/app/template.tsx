"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.32, 0.72, 0, 1] as const;

/** Remounts on every route change, so enter always plays cleanly. Opacity-only so fixed chrome stays viewport-fixed. */
export default function Template({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: reduceMotion ? 0 : 0.45,
        ease: EASE,
      }}
      className="min-h-svh"
    >
      {children}
    </motion.div>
  );
}
