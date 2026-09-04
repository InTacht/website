"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const SCROLL_MS = 450;
const WHEEL_THRESHOLD = 24;
const TOUCH_THRESHOLD = 48;

type SectionScrollProps = {
  front: ReactNode;
  back: ReactNode;
};

/** Locked viewport. Wheel/swipe down → section 2, up → section 1. Fast translate, no free scroll. */
export function SectionFlip({ front, back }: SectionScrollProps) {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const lockedRef = useRef(false);
  const touchYRef = useRef<number | null>(null);

  const go = useCallback((next: 0 | 1) => {
    if (lockedRef.current) return;
    if (next === indexRef.current) return;

    lockedRef.current = true;
    indexRef.current = next;
    setIndex(next);

    window.setTimeout(() => {
      lockedRef.current = false;
    }, SCROLL_MS);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    if (window.location.hash === "#platforms") {
      indexRef.current = 1;
      setIndex(1);
    }

    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, []);

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (Math.abs(event.deltaY) < WHEEL_THRESHOLD) return;
      if (event.deltaY > 0) go(1);
      else go(0);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "ArrowDown" ||
        event.key === "PageDown" ||
        event.key === " "
      ) {
        event.preventDefault();
        go(1);
      }
      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        go(0);
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      touchYRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      event.preventDefault();
    };

    const onTouchEnd = (event: TouchEvent) => {
      const startY = touchYRef.current;
      touchYRef.current = null;
      if (startY == null) return;
      const endY = event.changedTouches[0]?.clientY;
      if (endY == null) return;
      const delta = startY - endY;
      if (Math.abs(delta) < TOUCH_THRESHOLD) return;
      if (delta > 0) go(1);
      else go(0);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [go]);

  return (
    <div className="relative h-svh w-full overflow-hidden">
      <div
        className="h-full w-full will-change-transform"
        style={{
          transform: `translateY(-${index * 100}%)`,
          transition: `transform ${SCROLL_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        }}
      >
        <div
          className="h-svh w-full"
          style={{ pointerEvents: index === 0 ? "auto" : "none" }}
          aria-hidden={index !== 0}
        >
          {front}
        </div>
        <div
          id="platforms"
          className="h-svh w-full"
          style={{ pointerEvents: index === 1 ? "auto" : "none" }}
          aria-hidden={index !== 1}
        >
          {back}
        </div>
      </div>
    </div>
  );
}
