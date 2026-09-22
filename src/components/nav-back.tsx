"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const STORAGE_KEY = "intacht-research-from";

export type ResearchOrigin = "home" | "thesis";

function readStoredOrigin(): ResearchOrigin {
  if (typeof window === "undefined") return "home";
  try {
    const value = sessionStorage.getItem(STORAGE_KEY);
    if (value === "thesis" || value === "home") return value;
  } catch {
    /* ignore */
  }
  return "home";
}

function writeStoredOrigin(origin: ResearchOrigin) {
  try {
    sessionStorage.setItem(STORAGE_KEY, origin);
  } catch {
    /* ignore */
  }
}

function resolveOrigin(fromParam: string | null): ResearchOrigin {
  if (fromParam === "thesis" || fromParam === "home") return fromParam;
  if (typeof document !== "undefined") {
    try {
      const ref = document.referrer;
      if (ref.includes("/iota/thesis")) return "thesis";
    } catch {
      /* ignore */
    }
  }
  return readStoredOrigin();
}

export function useResearchOrigin(): ResearchOrigin {
  const searchParams = useSearchParams();
  const fromParam = searchParams.get("from");
  const [origin, setOrigin] = useState<ResearchOrigin>("home");

  useEffect(() => {
    const next = resolveOrigin(fromParam);
    writeStoredOrigin(next);
    setOrigin(next);
  }, [fromParam]);

  return origin;
}

/** Article pages: origin already stored when landing on the research index. */
export function useStoredResearchOrigin(): ResearchOrigin {
  const [origin, setOrigin] = useState<ResearchOrigin>("home");

  useEffect(() => {
    setOrigin(readStoredOrigin());
  }, []);

  return origin;
}

const backLinkClass =
  "shrink-0 text-[11px] font-light uppercase tracking-[0.22em] text-white/45 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-white";

export function ResearchBackLink() {
  const pathname = usePathname();
  const origin = useResearchOrigin();
  const isArticle = Boolean(pathname && pathname.startsWith("/research/"));

  if (isArticle) {
    const href =
      origin === "thesis" ? "/research?from=thesis" : "/research?from=home";
    return (
      <Link href={href} className={backLinkClass}>
        Back
      </Link>
    );
  }

  const href = origin === "thesis" ? "/iota/thesis" : "/";

  return (
    <Link href={href} className={backLinkClass}>
      Back
    </Link>
  );
}

export function BlogBackLink() {
  return (
    <Link href="/blog" className={backLinkClass}>
      Back
    </Link>
  );
}

export function ThesisBackLink() {
  return (
    <Link href="/" className={backLinkClass}>
      Back
    </Link>
  );
}
