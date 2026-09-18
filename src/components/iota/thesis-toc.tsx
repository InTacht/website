"use client";

import { useLenis } from "lenis/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { thesisNav } from "@/lib/iota-thesis";

const TOP_OFFSET = -72;
/** Activate a topic once its heading has entered the viewport. */
const ENTER_INSET = 96;

type ChapterId = (typeof thesisNav)[number]["id"];

function placeMarker(
  marker: HTMLSpanElement,
  list: HTMLElement,
  button: HTMLElement,
  animate: boolean,
) {
  const listBox = list.getBoundingClientRect();
  const box = button.getBoundingClientRect();
  const top = box.top - listBox.top + list.scrollTop;
  const height = box.height;

  if (!animate) {
    marker.style.transition = "none";
  }
  marker.style.transform = `translate3d(0, ${top}px, 0)`;
  marker.style.height = `${height}px`;
  marker.style.opacity = "1";
  if (!animate) {
    void marker.offsetHeight;
    marker.style.transition = "";
  }

  return { top, height };
}

function useThesisActiveChapter() {
  const lenis = useLenis();
  const [active, setActive] = useState<ChapterId>(thesisNav[0].id);
  const activeRef = useRef<ChapterId>(active);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const resolveIndex = useCallback((scroll: number) => {
    const nodes = thesisNav
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => node !== null);
    if (nodes.length === 0) return 0;

    const enterLine = window.innerHeight - ENTER_INSET;
    const probe = scroll + enterLine;
    const tops = nodes.map((node) => {
      const labelledBy = node.getAttribute("aria-labelledby");
      const heading = labelledBy ? document.getElementById(labelledBy) : null;
      const target = heading ?? node;
      return scroll + target.getBoundingClientRect().top;
    });

    let index = 0;
    for (let i = 0; i < tops.length; i++) {
      if (tops[i] <= probe + 1) index = i;
      else break;
    }
    return index;
  }, []);

  const jumpTo = useCallback(
    (id: ChapterId) => {
      const node = document.getElementById(id);
      if (!node) return;
      activeRef.current = id;
      setActive(id);
      lenis?.scrollTo(node, { offset: TOP_OFFSET, force: true });
    },
    [lenis],
  );

  return { active, setActive, activeRef, resolveIndex, jumpTo, lenis };
}

export function ThesisMobileRail() {
  const { active, setActive, activeRef, resolveIndex, jumpTo } =
    useThesisActiveChapter();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useLenis((instance) => {
    const index = resolveIndex(instance.scroll);
    const nextId = thesisNav[index]?.id;
    if (!nextId || nextId === activeRef.current) return;
    activeRef.current = nextId;
    setActive(nextId);

    const btn = itemRefs.current[index];
    const scroller = scrollerRef.current;
    if (btn && scroller) {
      const left =
        btn.offsetLeft - scroller.clientWidth / 2 + btn.clientWidth / 2;
      scroller.scrollTo({ left, behavior: "smooth" });
    }
  });

  return (
    <nav
      aria-label="Thesis chapters"
      className="sticky top-14 z-20 -mx-8 border-b border-white/10 bg-black/80 backdrop-blur-md md:-mx-14 lg:hidden"
    >
      <div
        ref={scrollerRef}
        className="flex gap-1 overflow-x-auto overscroll-x-contain px-8 py-2.5 [scrollbar-width:none] md:px-14 [&::-webkit-scrollbar]:hidden"
      >
        {thesisNav.map((item, index) => {
          const isActive = item.id === active;
          return (
            <button
              key={item.id}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              type="button"
              aria-current={isActive ? "location" : undefined}
              onClick={() => jumpTo(item.id)}
              className={`shrink-0 border-b px-2.5 py-1.5 text-left transition-colors ${
                isActive
                  ? "border-white text-white"
                  : "border-transparent text-white/40 hover:text-white/70"
              }`}
            >
              <span className="flex items-baseline gap-1.5">
                <span
                  className={`font-mono text-[10px] tracking-wide ${
                    isActive ? "text-white/45" : "text-white/25"
                  }`}
                >
                  {item.index}
                </span>
                <span className="text-[12px] font-light tracking-wide whitespace-nowrap">
                  {item.label}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export function ThesisToc() {
  const { active, setActive, activeRef, resolveIndex, jumpTo } =
    useThesisActiveChapter();
  const listRef = useRef<HTMLOListElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const markerRef = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const markerIndexRef = useRef(-1);
  const markerReadyRef = useRef(false);

  const syncFromScroll = useCallback(
    (instance: { scroll: number }) => {
      const list = listRef.current;
      const marker = markerRef.current;
      if (!list || !marker) return;

      const index = resolveIndex(instance.scroll);
      const currentBtn = itemRefs.current[index];
      if (!currentBtn) return;

      const nextId = thesisNav[index].id;
      const indexChanged = markerIndexRef.current !== index;
      if (indexChanged || !markerReadyRef.current) {
        placeMarker(marker, list, currentBtn, markerReadyRef.current);
        markerIndexRef.current = index;
        markerReadyRef.current = true;
      }

      if (nextId !== activeRef.current) {
        activeRef.current = nextId;
        setActive(nextId);

        const nav = navRef.current;
        if (nav) {
          const navBox = nav.getBoundingClientRect();
          const btnBox = currentBtn.getBoundingClientRect();
          if (btnBox.top < navBox.top + 8 || btnBox.bottom > navBox.bottom - 8) {
            currentBtn.scrollIntoView({ block: "nearest" });
          }
        }
      }
    },
    [activeRef, resolveIndex, setActive],
  );

  useLenis(syncFromScroll);

  return (
    <nav
      ref={navRef}
      aria-label="Thesis chapters"
      className="max-h-[calc(100svh-7.5rem)] overflow-y-auto overscroll-contain py-2"
    >
      <p className="mb-4 text-[10px] font-light uppercase tracking-[0.22em] text-white/35">
        On this page
      </p>
      <div className="relative">
        <span
          ref={markerRef}
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 w-px bg-white opacity-0 will-change-transform transition-[transform,height,opacity] duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none"
          style={{ transform: "translate3d(0, 0, 0)", height: 0 }}
        />
        <ol ref={listRef} className="space-y-0.5 border-l border-white/10">
          {thesisNav.map((item, index) => {
            const isActive = item.id === active;
            return (
              <li key={item.id}>
                <button
                  ref={(node) => {
                    itemRefs.current[index] = node;
                  }}
                  type="button"
                  aria-current={isActive ? "location" : undefined}
                  onClick={() => {
                    markerIndexRef.current = index;
                    const list = listRef.current;
                    const marker = markerRef.current;
                    const button = itemRefs.current[index];
                    if (list && marker && button) {
                      placeMarker(marker, list, button, markerReadyRef.current);
                      markerReadyRef.current = true;
                    }
                    jumpTo(item.id);
                  }}
                  className={`-ml-px block w-full border-l border-transparent py-1.5 pl-3.5 text-left transition-colors duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none ${
                    isActive
                      ? "text-white"
                      : "text-white/40 hover:text-white/70"
                  }`}
                >
                  <span className="flex items-baseline gap-2">
                    <span
                      className={`shrink-0 font-mono text-[10px] tracking-wide transition-colors duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none ${
                        isActive ? "text-white/45" : "text-white/25"
                      }`}
                    >
                      {item.index}
                    </span>
                    <span className="text-[12px] font-light leading-snug tracking-wide">
                      {item.label}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
