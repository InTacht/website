"use client";

import { ParallaxLayer } from "@/components/ui/parallax-layer";
import type { ReactNode } from "react";

type ParallaxContainerProps = {
  children: ReactNode;
  speed?: number;
  className?: string;
};

/** Alias wrapper matching architecture naming. */
export function ParallaxContainer(props: ParallaxContainerProps) {
  return <ParallaxLayer {...props} />;
}
