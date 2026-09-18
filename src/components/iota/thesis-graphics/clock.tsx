"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const ThesisClock = createContext(0);

export function ThesisClockProvider({ children }: { children: ReactNode }) {
  const [t, setT] = useState(0);

  useEffect(() => {
    let frame = 0;
    let last = 0;
    const start = performance.now();
    const tick = (now: number) => {
      if (now - last >= 32) {
        last = now;
        setT((now - start) / 1000);
      }
      frame = window.requestAnimationFrame(tick);
    };
    // Defer the first animated frame until after hydration.
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return <ThesisClock.Provider value={t}>{children}</ThesisClock.Provider>;
}

export function useThesisTime() {
  return useContext(ThesisClock);
}
