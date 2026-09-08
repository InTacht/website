import type { ReactNode } from "react";
import {
  AREA,
  H,
  W,
  bloomRadii,
  type FieldDot,
  type Source,
  sourcePoint,
  svgNum,
} from "@/components/story-graphics/mechanics-field";

type FieldStageProps = {
  uid: string;
  dots: FieldDot[];
  sources?: readonly Source[];
  spread: number;
  sourceMode?: "drop" | "emit" | "quiet";
  showLabels?: boolean;
  children?: ReactNode;
};

export function WordMark({
  x,
  y,
  mark,
  active = true,
}: {
  x: number;
  y: number;
  mark: string;
  active?: boolean;
}) {
  const width = svgNum(Math.max(42, 20 + mark.length * 7.6));
  return (
    <g>
      <rect
        x={svgNum(x - width / 2)}
        y={svgNum(y)}
        width={width}
        height="20"
        rx="10"
        fill={active ? "#8f55fb" : "rgba(255,255,255,0.08)"}
        stroke={active ? "rgba(196,181,253,0.55)" : "rgba(255,255,255,0.12)"}
        strokeWidth="0.8"
      />
      <text
        x={svgNum(x)}
        y={svgNum(y + 13.6)}
        textAnchor="middle"
        fill={active ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.48)"}
        fontFamily="var(--font-inter), system-ui, sans-serif"
        fontSize="10"
        fontWeight="500"
      >
        {mark}
      </text>
    </g>
  );
}

/**
 * Shared sequence-field drawing. Each Act 3 step adds its own overlay.
 */
export function FieldStage({
  uid,
  dots,
  sources = [],
  spread,
  sourceMode = "quiet",
  showLabels = true,
  children,
}: FieldStageProps) {
  const bloom = bloomRadii(spread);
  const glow = `${uid}-glow`;
  const wash = `${uid}-wash`;
  const clip = `${uid}-clip`;

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${W} ${H}`}
      className="pointer-events-none size-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id={wash} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8f55fb" stopOpacity="0.55" />
          <stop offset="42%" stopColor="#8f55fb" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#8f55fb" stopOpacity="0" />
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
        <clipPath id={clip}>
          <rect
            x={AREA.x}
            y={AREA.y}
            width={AREA.w}
            height={AREA.h}
            rx="8"
          />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>
        {sources.map((source) => {
          const point = sourcePoint(source);
          return (
            <ellipse
              key={`bloom-${source.mark}`}
              className="mf-bloom"
              cx={point.x}
              cy={point.y}
              rx={bloom.rx}
              ry={bloom.ry}
              fill={`url(#${wash})`}
              filter={`url(#${glow})`}
            />
          );
        })}
        {dots.map((dot) => (
          <circle
            key={`${dot.c}-${dot.r}`}
            className="mf-dot"
            cx={dot.x}
            cy={dot.y}
            r={svgNum(1.15 + dot.v * 1.55)}
            fill={
              dot.v > 0.18
                ? `rgba(143,85,251,${(0.2 + dot.v * 0.75).toFixed(3)})`
                : "rgba(255,255,255,0.1)"
            }
            stroke={
              dot.v > 0.35
                ? `rgba(196,181,253,${(0.2 + dot.v * 0.5).toFixed(3)})`
                : "rgba(255,255,255,0.08)"
            }
            strokeWidth="0.6"
          />
        ))}
      </g>
      {sources.map((source) => {
        const point = sourcePoint(source);
        const hot = sourceMode === "drop" || sourceMode === "emit";
        return (
          <g key={source.mark}>
            <circle
              cx={point.x}
              cy={point.y}
              r={hot ? 4.6 : 3.1}
              fill={hot ? "#8f55fb" : "rgba(196,181,253,0.72)"}
              stroke="rgba(196,181,253,0.92)"
              strokeWidth="1"
            />
            {showLabels ? (
              <WordMark x={point.x} y={point.y - 26} mark={source.mark} />
            ) : null}
          </g>
        );
      })}
      <text
        x={AREA.x + 10}
        y={AREA.y + 16}
        fill="rgba(255,255,255,0.34)"
        fontFamily="var(--font-inter), system-ui, sans-serif"
        fontSize="9"
        letterSpacing="1.8"
      >
        FIELD
      </text>
      <text
        x={AREA.x + AREA.w - 8}
        y={AREA.y + AREA.h - 10}
        textAnchor="end"
        fill="rgba(255,255,255,0.34)"
        fontFamily="var(--font-inter), system-ui, sans-serif"
        fontSize="9"
        letterSpacing="1.8"
      >
        WORDS →
      </text>
      {children}
    </svg>
  );
}
