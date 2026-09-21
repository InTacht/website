"use client";

import type { BlogArticle } from "@/lib/blog";
import { formatBlogDate } from "@/lib/blog";
import Link from "next/link";

type BlogCardProps = {
  article: BlogArticle;
  className?: string;
};

function CoverMedia({ src, label }: { src: string; label: string }) {
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
          img.style.display = "none";
          const fallback = img.parentElement?.querySelector(
            "[data-blog-cover-fallback]",
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
        data-blog-cover-fallback
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

export function BlogCard({ article, className = "" }: BlogCardProps) {
  return (
    <Link href={`/blog/${article.slug}`} className={`group block h-full ${className}`}>
      <figure className="flex h-full flex-col overflow-hidden border border-white/10 bg-white/[0.02] transition-[border-color] duration-300 group-hover:border-white/25">
        <div className="relative aspect-[16/10] min-h-[140px]">
          <CoverMedia src={article.cover} label={article.title} />
        </div>
        <figcaption className="flex flex-1 flex-col border-t border-white/10 bg-white/[0.12] px-4 py-3.5 transition-colors duration-300 group-hover:bg-white/[0.16] md:px-5">
          <p className="font-display text-base font-normal leading-snug tracking-[-0.02em] text-white md:text-lg">
            {article.title}
          </p>
          <p className="mt-2 text-[11px] font-light uppercase tracking-[0.18em] text-white/40">
            {formatBlogDate(article.date)}
          </p>
        </figcaption>
      </figure>
    </Link>
  );
}
