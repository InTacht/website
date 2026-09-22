"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { BlogBackLink, ResearchBackLink } from "@/components/nav-back";
import { useTopBarHidden } from "@/components/chrome-context";

const EASE = "cubic-bezier(0.32, 0.72, 0, 1)";
const navItemClass =
  "text-[11px] font-light uppercase tracking-[0.22em] transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]";
const idleClass = `${navItemClass} text-white/45 hover:text-white`;
const activeClass = `${navItemClass} text-white`;

const items = [
  { id: "thesis", label: "IOTA Thesis", href: "/iota/thesis" },
  { id: "research", label: "IQ Research", href: "/research?from=home" },
  { id: "blog", label: "Blog", href: "/blog" },
  { id: "labs", label: "Labs", href: "/labs" },
] as const;

type NavId = (typeof items)[number]["id"];

function isResearchArticle(pathname: string | null): boolean {
  return Boolean(pathname && pathname.startsWith("/research/"));
}

function isBlogArticle(pathname: string | null): boolean {
  return Boolean(pathname && pathname.startsWith("/blog/"));
}

function resolveActive(pathname: string | null): NavId | null {
  if (!pathname) return null;
  if (pathname.startsWith("/iota/thesis")) return "thesis";
  if (pathname === "/research") return "research";
  if (pathname === "/blog") return "blog";
  if (pathname.startsWith("/labs")) return "labs";
  return null;
}

/** Hysteresis so the bar does not flicker at the scroll threshold. */
function useScrolled(enter = 24, exit = 8) {
  const [scrolled, setScrolled] = useState(false);
  const scrolledRef = useRef(false);

  useLenis((instance) => {
    const y = instance.scroll;
    const next = scrolledRef.current ? y > exit : y > enter;
    if (next === scrolledRef.current) return;
    scrolledRef.current = next;
    setScrolled(next);
  });

  useEffect(() => {
    const sync = () => {
      const y = window.scrollY;
      const next = scrolledRef.current ? y > exit : y > enter;
      if (next === scrolledRef.current) return;
      scrolledRef.current = next;
      setScrolled(next);
    };
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, [enter, exit]);

  return scrolled;
}

export function SiteTopBar() {
  const pathname = usePathname();
  const researchArticle = isResearchArticle(pathname);
  const blogArticle = isBlogArticle(pathname);
  const active = resolveActive(pathname);
  const scrolled = useScrolled();
  const topBarHidden = useTopBarHidden();
  const isHome = pathname === "/";
  const showChrome = !isHome || scrolled;
  // Home at rest: full-bleed edge padding. Elsewhere / scrolled: capped rail.
  const homeFlush = isHome && !scrolled;

  useEffect(() => {
    // Warm Labs notebook cache so the tab opens instantly when clicked.
    const warm = window.setTimeout(() => {
      void fetch("/api/labs").catch(() => undefined);
    }, 800);
    return () => window.clearTimeout(warm);
  }, []);

  if (topBarHidden) return null;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-14 motion-reduce:transition-none ${
        showChrome
          ? "border-b border-white/10 bg-black/40 backdrop-blur-md"
          : "border-b border-transparent bg-transparent backdrop-blur-0"
      }`}
      style={{
        viewTransitionName: "site-header",
        transitionProperty: "background-color, border-color, backdrop-filter, -webkit-backdrop-filter",
        transitionDuration: "520ms",
        transitionTimingFunction: EASE,
      }}
    >
      <div
        className={`mx-auto flex h-full w-full items-center justify-between px-8 md:px-14 lg:px-16 motion-reduce:transition-none ${
          homeFlush ? "max-w-[100%]" : "max-w-6xl"
        }`}
        style={{
          transitionProperty: "max-width",
          transitionDuration: "560ms",
          transitionTimingFunction: EASE,
        }}
      >
        <Link href="/" className="relative h-[15px] w-[78px] shrink-0">
          <Image
            src="/logo-dark.svg"
            alt="InTacht"
            fill
            className="object-contain"
            priority
          />
        </Link>

        <nav
          aria-label="Site"
          className="flex shrink-0 items-center gap-5"
        >
          {researchArticle ? (
            <Suspense
              fallback={
                <span className={`${navItemClass} text-white/30`}>Back</span>
              }
            >
              <ResearchBackLink />
            </Suspense>
          ) : blogArticle ? (
            <BlogBackLink />
          ) : (
            items.map((item) =>
              item.id === active ? (
                <span
                  key={item.id}
                  aria-current="page"
                  className={activeClass}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  key={item.id}
                  href={item.href}
                  prefetch
                  className={idleClass}
                >
                  {item.label}
                </Link>
              ),
            )
          )}
        </nav>
      </div>
    </header>
  );
}
