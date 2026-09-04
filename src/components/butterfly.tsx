"use client";

import { motion } from "motion/react";
import { useMemo, type CSSProperties } from "react";
import { projects, type Project } from "@/lib/projects";

export type ReleaseOrigin = { x: number; y: number };

type ButterflySwarmProps = {
  origin: ReleaseOrigin | null;
  active: boolean;
  releaseKey: number;
};

type Flyer = {
  id: Project["id"];
  color: string;
  size: "butterfly-figure-sm" | "butterfly-figure-md";
  x: number[];
  y: number[];
  rotate: number[];
  duration: number;
  delay: number;
};

function ButterflyFigure({ color, sizeClass }: { color: string; sizeClass: string }) {
  const style = { "--bf-color": color } as CSSProperties;

  return (
    <div className={`butterfly-figure ${sizeClass}`} style={style}>
      <div className="butterfly-slice butterfly-slice-left butterfly-wing butterfly-wing-left" />
      <div className="butterfly-slice butterfly-slice-center butterfly-body" />
      <div className="butterfly-slice butterfly-slice-right butterfly-wing butterfly-wing-right" />
    </div>
  );
}

function buildFlyer(index: number, size: Flyer["size"]): Omit<Flyer, "id" | "color"> {
  const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const steps = 7;
  const xs = [0];
  const ys = [0];
  const rotate = [0];

  let cx = 0;
  let cy = 0;

  for (let i = 1; i < steps; i++) {
    cx += (Math.random() - 0.5) * vw * 0.28;
    // Mostly drift downward, occasionally rise
    const downward = Math.random() > 0.22;
    cy += downward
      ? 40 + Math.random() * vh * 0.14
      : -(20 + Math.random() * vh * 0.08);
    xs.push(cx);
    ys.push(cy);
    rotate.push((Math.random() - 0.5) * 36);
  }

  return {
    size,
    x: xs,
    y: ys,
    rotate,
    duration: 16 + Math.random() * 14 + index * 2,
    delay: index * 0.12,
  };
}

export function MarkSmoke({ origin, show }: { origin: ReleaseOrigin | null; show: boolean }) {
  if (!show || !origin) return null;

  return (
    <div
      className="mark-smoke-burst pointer-events-none absolute z-[20]"
      style={{ left: origin.x, top: origin.y }}
      aria-hidden
    >
      {Array.from({ length: 14 }).map((_, i) => (
        <span key={i} className="mark-smoke-particle" style={{ "--i": i } as CSSProperties} />
      ))}
    </div>
  );
}

/** Three white glowing butterflies released from the hero mark. Scoped to the landing viewport only. */
export function ButterflySwarm({ origin, active, releaseKey }: ButterflySwarmProps) {
  const flyers = useMemo<Flyer[] | null>(() => {
    if (!active || !origin) return null;
    void releaseKey;

    const sizes: Flyer["size"][] = ["butterfly-figure-md", "butterfly-figure-sm", "butterfly-figure-md"];
    return projects.map((project, index) => {
      const path = buildFlyer(index, sizes[index]);
      return { id: project.id, color: "#FFFFFF", ...path };
    });
  }, [active, origin, releaseKey]);

  if (!active || !origin || !flyers) return null;

  return (
    <div className="butterfly-release pointer-events-none absolute inset-0 z-[15] overflow-hidden" aria-hidden>
      {flyers.map((flyer) => (
        <div
          key={`${flyer.id}-${releaseKey}`}
          className="absolute"
          style={{ left: origin.x, top: origin.y, transform: "translate(-50%, -50%)" }}
        >
          <motion.div
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.15, rotate: 0 }}
            animate={{
              x: flyer.x,
              y: flyer.y,
              rotate: flyer.rotate,
              opacity: [0, 1, 1, 1, 1, 1, 1],
              scale: [0.15, 1, 1, 1, 1, 1, 1],
            }}
            transition={{
              duration: flyer.duration,
              delay: flyer.delay,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          >
            <ButterflyFigure color={flyer.color} sizeClass={flyer.size} />
          </motion.div>
        </div>
      ))}
    </div>
  );
}
