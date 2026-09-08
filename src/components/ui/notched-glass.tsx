"use client";

import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  layoutNotchedCard,
  maskImageForPath,
  type NotchedCardLayout,
} from "@/lib/notched-card-path";

type NotchedGlassProps = {
  tabs: ReactNode;
  children: ReactNode;
  className?: string;
};

const INITIAL: NotchedCardLayout = {
  path: "",
  width: 0,
  height: 0,
  radius: 24,
  scoop: 0,
  notchWidth: 0,
  notchHeight: 0,
  tabOffsetY: 0,
  padTop: 56,
  mode: "rect",
};

/**
 * Landing glass with a compact laptop-style top notch. Blur is masked to the
 * carved silhouette so the hole stays a real cutout.
 */
export function NotchedGlass({ tabs, children, className = "" }: NotchedGlassProps) {
  const clipId = `notch-clip-${useId().replace(/:/g, "")}`;
  const frameRef = useRef<HTMLDivElement>(null);
  const tabRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<NotchedCardLayout>(INITIAL);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    const tab = tabRef.current;
    if (!frame || !tab) return;

    const measure = () => {
      setLayout(
        layoutNotchedCard({
          width: frame.offsetWidth,
          height: frame.offsetHeight,
          tabWidth: tab.offsetWidth,
          tabHeight: tab.offsetHeight,
        }),
      );
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(frame);
    ro.observe(tab);
    const raf = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(measure);
    });
    return () => {
      ro.disconnect();
      window.cancelAnimationFrame(raf);
    };
  }, []);

  const mask = maskImageForPath(layout.path, layout.width, layout.height);
  const glassStyle: CSSProperties | undefined =
    layout.path && mask
      ? {
          clipPath: `url(#${clipId})`,
          WebkitClipPath: `url(#${clipId})`,
          maskImage: mask,
          WebkitMaskImage: mask,
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }
      : undefined;

  return (
    <div ref={frameRef} className={`relative ${className}`}>
      <div
        ref={tabRef}
        className="absolute left-1/2 z-20 -translate-x-1/2"
        style={{ top: layout.tabOffsetY }}
      >
        {tabs}
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-0">
        {layout.path && layout.width > 0 ? (
          <svg
            width={layout.width}
            height={layout.height}
            viewBox={`0 0 ${layout.width} ${layout.height}`}
            className="absolute inset-0 overflow-visible"
            style={{ filter: "drop-shadow(0 8px 32px rgba(0, 0, 0, 0.12))" }}
          >
            <path d={layout.path} fill="rgba(0,0,0,0.01)" />
          </svg>
        ) : null}

        <div className="glass glass-cutout absolute inset-0" style={glassStyle} />

        {layout.path && layout.width > 0 ? (
          <svg
            width={layout.width}
            height={layout.height}
            viewBox={`0 0 ${layout.width} ${layout.height}`}
            className="absolute inset-0 overflow-visible"
            fill="none"
            shapeRendering="geometricPrecision"
          >
            <defs>
              <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
                <path d={layout.path} />
              </clipPath>
            </defs>
            <path
              d={layout.path}
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="1"
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        ) : null}
      </div>

      <div
        className="relative z-[2] px-6 pb-6 md:px-8 md:pb-8 lg:px-10 lg:pb-9"
        style={{ paddingTop: layout.padTop }}
      >
        {children}
      </div>
    </div>
  );
}
