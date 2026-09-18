import type { ReactNode } from "react";
import { TH, TW } from "@/components/iota/thesis-graphics/draw";

/** IOTA brand indigo. Thesis diagrams use this, not IQ purple. */
export const IOTA = "#5B50DD";
export const IOTA_LINE = "rgba(180,175,255,0.7)";
export const IOTA_TEXT = "rgba(180,175,255,0.92)";

export function ThesisHeroPlate({
  ariaLabel,
  eyebrow,
  line,
  children,
}: {
  ariaLabel: string;
  eyebrow: string;
  line: string;
  children: ReactNode;
}) {
  return (
    <figure
      aria-label={ariaLabel}
      className="mt-8 max-w-2xl overflow-hidden border border-white/10 bg-white/[0.02]"
    >
      <div className="relative aspect-[16/7] min-h-[148px]">{children}</div>
      <figcaption className="border-t border-white/10 px-4 py-3 md:px-5">
        <p className="text-[10px] font-light uppercase tracking-[0.22em] text-white/35">
          {eyebrow}
        </p>
        <p className="mt-1.5 text-sm font-light leading-relaxed text-white/60">
          {line}
        </p>
      </figcaption>
    </figure>
  );
}


export function ThesisSvg({
  uid,
  children,
  lit = true,
}: {
  uid: string;
  children: ReactNode;
  lit?: boolean;
}) {
  const glow = `${uid}-glow`;
  const washId = `${uid}-wash`;

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${TW} ${TH}`}
      className="pointer-events-none absolute inset-0 size-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id={washId} cx="62%" cy="48%" r="56%">
          <stop offset="0%" stopColor={IOTA} stopOpacity="0.32" />
          <stop offset="58%" stopColor={IOTA} stopOpacity="0.07" />
          <stop offset="100%" stopColor={IOTA} stopOpacity="0" />
        </radialGradient>
        <filter
          id={glow}
          x="-80%"
          y="-80%"
          width="260%"
          height="260%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="7" />
        </filter>
      </defs>
      {lit ? (
        <rect width={TW} height={TH} fill={`url(#${washId})`} opacity="0.45" />
      ) : null}
      {children}
    </svg>
  );
}

export function Mark({
  x,
  y,
  children,
  anchor = "start",
  fill = "rgba(255,255,255,0.42)",
  size = 10,
}: {
  x: number;
  y: number;
  children: ReactNode;
  anchor?: "start" | "middle" | "end";
  fill?: string;
  size?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fill={fill}
      fontFamily="var(--font-inter), system-ui, sans-serif"
      fontSize={size}
    >
      {children}
    </text>
  );
}
