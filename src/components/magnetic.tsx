"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  type MotionProps,
  type TargetAndTransition,
  type Transition,
} from "motion/react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

const easeOut = [0.2, 0, 0, 1] as const;
const easeMagnetic = [0.1, 0, 0.05, 1] as const;

type Entrance = {
  initial: MotionProps["initial"];
  animate: MotionProps["animate"];
  transition?: Transition;
};

type MagneticItemProps = {
  children?: ReactNode;
  className?: string;
  /** Applied on the opacity layer — put `glass` here so blur survives the fade. */
  surfaceClassName?: string;
  style?: CSSProperties;
  strength?: number;
  entrance?: Entrance;
  /** Run entrance when element enters the viewport (once). */
  whenVisible?: boolean;
};

function splitEntrance(entrance?: Entrance) {
  if (!entrance) {
    return { spatial: undefined, fade: undefined, transition: undefined };
  }

  const split = (state: MotionProps["initial"]) => {
    if (state == null || typeof state !== "object" || Array.isArray(state)) {
      return {
        spatial: state as TargetAndTransition | undefined,
        fade: undefined as TargetAndTransition | undefined,
      };
    }

    const target = state as TargetAndTransition;
    const { opacity, ...rest } = target;
    const spatial =
      Object.keys(rest).length > 0 ? (rest as TargetAndTransition) : undefined;
    const fade =
      opacity === undefined
        ? undefined
        : ({ opacity } as TargetAndTransition);

    return { spatial, fade };
  };

  const from = split(entrance.initial);
  const to = split(entrance.animate);

  return {
    spatial: {
      initial: from.spatial,
      animate: to.spatial,
    },
    fade: {
      initial: from.fade ?? { opacity: 1 },
      animate: to.fade ?? { opacity: 1 },
    },
    transition: entrance.transition,
  };
}

/**
 * Outer: spatial entrance (x/y/rotate/scale).
 * Inner: opacity fade + cursor magnetism + optional glass surface.
 * Glass must live on the opacity node or backdrop-filter dies under a fading parent.
 */
export function MagneticItem({
  children,
  className,
  surfaceClassName,
  style,
  strength = 18,
  entrance,
  whenVisible = false,
}: MagneticItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 140, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 140, damping: 18, mass: 0.4 });

  const { spatial, fade, transition } = useMemo(
    () => splitEntrance(entrance),
    [entrance],
  );

  const onMove = useCallback(
    (event: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const max = 280;
      if (dist > max) {
        x.set(0);
        y.set(0);
        return;
      }
      const t = 1 - dist / max;
      x.set((dx / max) * strength * t);
      y.set((dy / max) * strength * t);
    },
    [strength, x, y],
  );

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [onLeave, onMove]);

  return (
    <motion.div
      className={className}
      style={style}
      initial={spatial?.initial}
      animate={whenVisible ? undefined : spatial?.animate}
      whileInView={whenVisible ? spatial?.animate : undefined}
      viewport={whenVisible ? { once: true, amount: 0.35 } : undefined}
      transition={transition}
    >
      <motion.div
        ref={ref}
        className={surfaceClassName ?? "h-full w-full"}
        style={{ x: springX, y: springY }}
        initial={fade?.initial}
        animate={whenVisible ? undefined : fade?.animate}
        whileInView={whenVisible ? fade?.animate : undefined}
        viewport={whenVisible ? { once: true, amount: 0.35 } : undefined}
        transition={transition}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Figma Magnetic frame entrances — one-shot on load. */
export const squareEntrance = {
  leftCard: {
    initial: { opacity: 0, x: -80, y: 24 },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: { duration: 0.9, ease: easeOut, delay: 0.05 },
  },
  pill: {
    initial: { opacity: 0, x: 80 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.75, ease: easeOut, delay: 0.28 },
  },
  topRight: {
    initial: { opacity: 0, rotate: -8, x: 60, y: -70 },
    animate: { opacity: 1, rotate: 0, x: 0, y: 0 },
    transition: { duration: 0.95, ease: easeMagnetic, delay: 0.08 },
  },
  bottomRight: {
    initial: { opacity: 0, rotate: 6, x: 40, y: 80 },
    animate: { opacity: 1, rotate: 0, x: 0, y: 0 },
    transition: { duration: 0.95, ease: easeMagnetic, delay: 0.16 },
  },
  circle: {
    initial: { opacity: 0, scale: 0.5, y: -50 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: { duration: 0.8, ease: easeOut, delay: 0.4 },
  },
  heroText: {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: easeOut, delay: 0.12 },
  },
} as const;

/** Bento cell entrances — same motion language as SQUARE. */
export const bentoEntrance = {
  tall: {
    initial: { opacity: 0, x: -70, y: 20 },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: { duration: 0.9, ease: easeOut, delay: 0.04 },
  },
  top: {
    initial: { opacity: 0, y: -60, x: 30 },
    animate: { opacity: 1, y: 0, x: 0 },
    transition: { duration: 0.85, ease: easeMagnetic, delay: 0.1 },
  },
  mid: {
    initial: { opacity: 0, scale: 0.82 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.8, ease: easeOut, delay: 0.18 },
  },
  midr: {
    initial: { opacity: 0, x: 60, y: -20 },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: { duration: 0.9, ease: easeMagnetic, delay: 0.14 },
  },
  bot: {
    initial: { opacity: 0, y: 70, x: -20 },
    animate: { opacity: 1, y: 0, x: 0 },
    transition: { duration: 0.9, ease: easeOut, delay: 0.22 },
  },
  botr: {
    initial: { opacity: 0, rotate: 5, x: 40, y: 60 },
    animate: { opacity: 1, rotate: 0, x: 0, y: 0 },
    transition: { duration: 0.95, ease: easeMagnetic, delay: 0.26 },
  },
} as const;
