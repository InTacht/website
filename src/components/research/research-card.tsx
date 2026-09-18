"use client";

import type { ResearchArticle } from "@/lib/research";
import Link from "next/link";

type ResearchCardProps = {
  article: ResearchArticle;
  className?: string;
};

function CoverMedia({
  src,
  fallbackSrc,
  label,
}: {
  src: string;
  fallbackSrc?: string;
  label: string;
}) {
  const isSvg = src.endsWith(".svg");

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className={`absolute inset-0 size-full object-center ${
          isSvg ? "bg-[#0B0C12] object-cover" : "object-cover"
        }`}
        onError={(event) => {
          const img = event.currentTarget;
          if (fallbackSrc && img.dataset.fallback !== "1") {
            img.dataset.fallback = "1";
            img.src = fallbackSrc;
            img.classList.remove("bg-[#0B0C12]");
            img.classList.add("object-cover");
            return;
          }
          img.style.display = "none";
          const fallback = img.parentElement?.querySelector(
            "[data-research-cover-fallback]",
          );
          if (fallback instanceof HTMLElement) {
            fallback.hidden = false;
            fallback.removeAttribute("aria-hidden");
            fallback.style.display = "flex";
          }
        }}
      />
      <div
        hidden
        aria-hidden
        data-research-cover-fallback
        className="absolute inset-0 flex-col items-center justify-center gap-2 bg-[#0D0E15] px-6 text-center"
      >
        <span className="text-[11px] font-light uppercase tracking-[0.22em] text-white/35">
          Visual
        </span>
        <span className="max-w-[14rem] text-sm font-light text-white/50">
          {label}
        </span>
      </div>
    </>
  );
}

export function ResearchCard({
  article,
  className = "",
}: ResearchCardProps) {
  return (
    <Link
      href={`/research/${article.slug}`}
      className={`group block h-full ${className}`}
    >
      <figure className="flex h-full flex-col overflow-hidden border border-white/10 bg-white/[0.02] transition-[border-color] duration-300 group-hover:border-white/25">
        <div className="relative aspect-[16/10] min-h-[140px]">
          <CoverMedia
            src={article.cover}
            fallbackSrc={article.coverFallback}
            label={article.title}
          />
        </div>
        <figcaption className="border-t border-white/10 bg-white/[0.12] px-4 py-3.5 transition-colors duration-300 group-hover:bg-white/[0.16] md:px-5">
          <p className="font-display text-base font-normal leading-snug tracking-[-0.02em] text-white md:text-lg">
            {article.title}
          </p>
        </figcaption>
      </figure>
    </Link>
  );
}
