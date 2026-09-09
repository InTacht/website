"use client";

import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ButterflySwarm, MarkSmoke } from "@/components/butterfly";
import { HeroCards } from "@/components/hero-cards";
import { HeroCopy } from "@/components/hero-copy";
import { LandingBackground } from "@/components/landing-background";
import { PlatformsBento } from "@/components/platforms-bento";
import type { Project } from "@/lib/projects";

const EXIT_MS = 450;
const MARK_SPIN_MS = 1000;

export function LandingView({ children }: { children?: ReactNode }) {
  const [view, setView] = useState<"hero" | "bento">("hero");
  const lenis = useLenis();
  const [selectedId, setSelectedId] = useState<Project["id"] | null>(null);
  const [markSpinning, setMarkSpinning] = useState(false);
  const [butterfliesActive, setButterfliesActive] = useState(false);
  const [releaseOrigin, setReleaseOrigin] = useState<{ x: number; y: number } | null>(null);
  const [releaseKey, setReleaseKey] = useState(0);
  const lockedRef = useRef(false);
  const markTimerRef = useRef<number | null>(null);
  const heroSectionRef = useRef<HTMLElement>(null);

  const openBento = useCallback((id: Project["id"]) => {
    if (lockedRef.current || view !== "hero") return;
    lockedRef.current = true;
    setSelectedId(id);
    setView("bento");
  }, [view]);

  const goHome = useCallback(() => {
    if (view !== "bento") return;
    lockedRef.current = false;
    setSelectedId(null);
    setView("hero");
    setMarkSpinning(false);
    setButterfliesActive(false);
    setReleaseOrigin(null);
    if (markTimerRef.current) window.clearTimeout(markTimerRef.current);
  }, [view]);

  const releaseButterflies = useCallback((origin: { x: number; y: number }) => {
    if (view !== "hero" || markSpinning) return;

    const section = heroSectionRef.current;
    const rect = section?.getBoundingClientRect();
    const localOrigin = rect
      ? { x: origin.x - rect.left, y: origin.y - rect.top }
      : origin;

    setReleaseOrigin(localOrigin);
    setMarkSpinning(true);
    setButterfliesActive(true);
    setReleaseKey((key) => key + 1);

    if (markTimerRef.current) window.clearTimeout(markTimerRef.current);
    markTimerRef.current = window.setTimeout(() => {
      setMarkSpinning(false);
    }, MARK_SPIN_MS);
  }, [markSpinning, view]);

  useEffect(() => {
    return () => {
      if (markTimerRef.current) window.clearTimeout(markTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!lenis) return;
    if (view === "bento") {
      lenis.scrollTo(0, { immediate: true });
      lenis.stop();
      return;
    }
    lenis.start();
    lenis.resize();
  }, [lenis, view]);

  useEffect(() => {
    if (view !== "bento") return;

    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, [view]);

  useEffect(() => {
    if (view !== "bento") return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") goHome();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goHome, view]);

  return (
    <>
      <section ref={heroSectionRef} className="relative h-svh overflow-hidden">
        <LandingBackground />

        <AnimatePresence mode="wait">
          {view === "hero" ? (
            <motion.div
              key="hero"
              className="absolute inset-0 z-10"
              exit={{
                opacity: 0,
                y: -24,
                transition: {
                  duration: EXIT_MS / 1000,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
            >
              <HeroCopy />
              <HeroCards
                onCardClick={openBento}
                onMarkClick={releaseButterflies}
                markSpinning={markSpinning}
              />
              <MarkSmoke origin={releaseOrigin} show={markSpinning} />
              <ButterflySwarm origin={releaseOrigin} active={butterfliesActive} releaseKey={releaseKey} />
            </motion.div>
          ) : (
            <motion.div
              key="bento"
              className="absolute inset-0 z-10 flex items-center justify-center px-4 py-10 sm:px-6 md:px-10 md:py-14"
              exit={{
                opacity: 0,
                y: 24,
                transition: {
                  duration: EXIT_MS / 1000,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
            >
              <button
                type="button"
                onClick={goHome}
                aria-label="Back to home"
                className="glass absolute left-6 top-6 z-20 flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-light tracking-wide text-white transition-opacity hover:opacity-90 md:left-10 md:top-10 md:px-5 md:py-3 md:text-base"
              >
                <svg
                  aria-hidden
                  viewBox="0 0 20 20"
                  fill="none"
                  className="size-4 md:size-[18px]"
                >
                  <path
                    d="M12.5 15L7.5 10L12.5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Back
              </button>
              <PlatformsBento initialActiveId={selectedId} />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      {view === "hero" ? children : null}
    </>
  );
}
