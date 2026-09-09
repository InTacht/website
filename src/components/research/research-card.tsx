"use client";

import Link from "next/link";
import { MagneticItem } from "@/components/magnetic";
import { AssetSlot } from "@/components/ui/asset-slot";
import {
  researchKindLabel,
  type ResearchArticle,
} from "@/lib/research";

type ResearchCardProps = {
  article: ResearchArticle;
  featured?: boolean;
  compact?: boolean;
  className?: string;
};

function CardCopy({
  article,
  featured,
  compact,
}: {
  article: ResearchArticle;
  featured: boolean;
  compact: boolean;
}) {
  return (
    <div
      className={
        featured
          ? "flex flex-col justify-center md:py-2 md:drop-shadow-[0_10px_28px_rgba(0,0,0,0.75)]"
          : ""
      }
    >
      <p
        className={`text-[11px] font-light uppercase tracking-[0.22em] text-white/35 ${
          compact ? "mt-3" : "mt-4"
        }`}
      >
        {researchKindLabel[article.kind]}
        <span className="text-white/20"> · </span>
        {article.date}
      </p>
      <h3
        className={`mt-2 font-display font-normal leading-snug tracking-[-0.02em] text-white transition-colors group-hover:text-white ${
          featured
            ? "text-2xl md:text-4xl md:leading-[1.12]"
            : compact
              ? "text-lg md:text-xl"
              : "text-xl md:text-2xl"
        }`}
      >
        {article.title}
      </h3>
      {featured ? (
        <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-white/60 md:text-base">
          {article.excerpt}
        </p>
      ) : null}
    </div>
  );
}

function CardMedia({
  article,
  featured,
}: {
  article: ResearchArticle;
  featured: boolean;
}) {
  return (
    <AssetSlot
      src={article.cover}
      fallbackSrc={article.coverFallback}
      label={article.title}
      aspect="aspect-[16/10]"
      fit="contain"
      overlay={false}
      className={`transition-[border-color] duration-300 group-hover:border-white/30 ${
        featured ? "md:min-h-0" : ""
      }`}
    />
  );
}

export function ResearchCard({
  article,
  featured = false,
  compact = false,
  className = "",
}: ResearchCardProps) {
  const inner = featured ? (
    <div className="grid h-full gap-6 md:grid-cols-2 md:items-center md:gap-8">
      <CardMedia article={article} featured />
      <CardCopy article={article} featured compact={false} />
    </div>
  ) : (
    <>
      <CardMedia article={article} featured={false} />
      <CardCopy article={article} featured={false} compact={compact} />
    </>
  );

  return (
    <Link
      href={`/research/${article.slug}`}
      className={`group block h-full ${className}`}
    >
      {compact || featured ? (
        inner
      ) : (
        <MagneticItem
          className="h-full"
          strength={12}
          whenVisible
          surfaceClassName="h-full"
        >
          {inner}
        </MagneticItem>
      )}
    </Link>
  );
}
