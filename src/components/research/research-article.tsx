"use client";

import { useLenis } from "lenis/react";
import { useStoredResearchOrigin } from "@/components/nav-back";
import { ResearchCard } from "@/components/research/research-card";
import { CtaLink } from "@/components/ui/cta";
import type { ReactNode } from "react";
import {
  getRelatedArticles,
  researchKindLabel,
  type ResearchArticle as ResearchArticleData,
  type ResearchSection,
  type ResearchTable,
} from "@/lib/research";

function sectionId(heading: string, index: number) {
  const slug = heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `s${String(index + 1).padStart(2, "0")}-${slug.slice(0, 48)}`;
}

function Chapter({
  id,
  labelledBy,
  children,
  flushTop = false,
}: {
  id: string;
  labelledBy: string;
  children: ReactNode;
  flushTop?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`scroll-mt-28 lg:scroll-mt-24 ${
        flushTop
          ? "pb-12 pt-4 md:pb-14 md:pt-5"
          : "border-t border-white/10 py-12 md:py-14"
      }`}
    >
      {children}
    </section>
  );
}

function ChapterHead({
  index,
  kicker,
  headlineId,
  headline,
}: {
  index: string;
  kicker: string;
  headlineId: string;
  headline: string;
}) {
  return (
    <>
      <p className="mb-3 flex items-baseline gap-2.5 text-[11px] font-light uppercase tracking-[0.22em] text-white/40">
        <span className="font-mono tracking-wide text-white/35">{index}</span>
        <span>{kicker}</span>
      </p>
      <h2
        id={headlineId}
        className="max-w-3xl font-display text-3xl font-normal leading-[1.15] tracking-[-0.02em] text-white md:text-[2.35rem]"
      >
        {headline}
      </h2>
    </>
  );
}

function Idea({ children }: { children: ReactNode }) {
  return (
    <p className="mt-5 max-w-2xl border-l border-white/20 pl-4 text-base font-light leading-relaxed text-white/85 md:text-[17px]">
      {children}
    </p>
  );
}

function Body({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 max-w-2xl text-base font-light leading-relaxed text-white/50 md:text-[17px]">
      {children}
    </p>
  );
}

function CoverPlate({
  src,
  fallbackSrc,
  label,
}: {
  src: string;
  fallbackSrc?: string;
  label: string;
}) {
  return (
    <figure
      aria-label={label}
      className="overflow-hidden border border-white/10 bg-white/[0.02]"
    >
      <div className="relative aspect-[16/10] min-h-[160px] bg-[#0B0C12]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          className="absolute inset-0 size-full object-cover object-center"
          onError={(event) => {
            const img = event.currentTarget;
            if (fallbackSrc && img.dataset.fallback !== "1") {
              img.dataset.fallback = "1";
              img.src = fallbackSrc;
            }
          }}
        />
      </div>
    </figure>
  );
}

function LedgerTable({ table }: { table: ResearchTable }) {
  return (
    <figure className="mt-8 max-w-2xl">
      <div className="divide-y divide-white/10 border-y border-white/10">
        <div className="grid gap-2 py-3 sm:grid-cols-[9rem_1fr_1fr] sm:gap-6">
          {table.columns.map((column) => (
            <p
              key={column}
              className="text-[11px] font-light uppercase tracking-[0.18em] text-white/35"
            >
              {column}
            </p>
          ))}
        </div>
        {table.rows.map((row) => (
          <div
            key={row.join("|")}
            className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr_1fr] sm:gap-6"
          >
            {row.map((cell, index) => (
              <p
                key={`${row[0]}-${index}`}
                className={
                  index === 0
                    ? "text-sm font-medium tracking-tight text-white"
                    : "text-sm font-light leading-relaxed text-white/55 md:text-[15px]"
                }
              >
                {cell}
              </p>
            ))}
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-[11px] font-light leading-relaxed tracking-wide text-white/30">
        {table.caption}
      </figcaption>
    </figure>
  );
}

function SectionBlock({
  section,
  index,
  articleCover,
  kicker,
  flushTop = false,
}: {
  section: ResearchSection;
  index: number;
  articleCover: string;
  kicker: string;
  flushTop?: boolean;
}) {
  const id = sectionId(section.heading, index);
  const headlineId = `${id}-headline`;
  const [lead, ...rest] = section.body;
  const showFigure =
    section.figure && section.figure.src !== articleCover;

  return (
    <Chapter id={id} labelledBy={headlineId} flushTop={flushTop}>
      <ChapterHead
        index={String(index + 1).padStart(2, "0")}
        kicker={kicker}
        headlineId={headlineId}
        headline={section.heading}
      />
      {lead ? <Idea>{lead}</Idea> : null}
      {showFigure && section.figure ? (
        <div className="mt-8 max-w-2xl">
          <CoverPlate
            src={section.figure.src}
            fallbackSrc={section.figure.fallbackSrc}
            label={section.figure.label}
          />
          <p className="mt-3 text-[11px] font-light uppercase tracking-[0.18em] text-white/35">
            {section.figure.label}
          </p>
        </div>
      ) : null}
      {rest.map((paragraph) => (
        <Body key={paragraph.slice(0, 48)}>{paragraph}</Body>
      ))}
      {section.table ? <LedgerTable table={section.table} /> : null}
    </Chapter>
  );
}

function ResearchToc({
  items,
  onJump,
}: {
  items: readonly { id: string; index: string; label: string }[];
  onJump: (id: string) => void;
}) {
  return (
    <aside className="pointer-events-none absolute inset-y-0 right-0 hidden w-[13.5rem] xl:block">
      <div className="pointer-events-auto sticky top-28 max-h-[calc(100svh-7.5rem)] overflow-y-auto overscroll-contain py-2">
        <p className="mb-4 text-[10px] font-light uppercase tracking-[0.22em] text-white/35">
          On this page
        </p>
        <ol className="space-y-0.5 border-l border-white/10">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onJump(item.id)}
                className="-ml-px block w-full border-l border-transparent py-1.5 pl-3.5 text-left text-white/40 transition-colors hover:border-white/30 hover:text-white/70"
              >
                <span className="flex items-baseline gap-2">
                  <span className="shrink-0 font-mono text-[10px] tracking-wide text-white/25">
                    {item.index}
                  </span>
                  <span className="text-[12px] font-light leading-snug tracking-wide">
                    {item.label}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}

export function ResearchArticleView({
  article,
}: {
  article: ResearchArticleData;
}) {
  const related = getRelatedArticles(article);
  const origin = useStoredResearchOrigin();
  const lenis = useLenis();
  const researchIndexHref =
    origin === "thesis" ? "/research?from=thesis" : "/research?from=home";
  const nav = article.sections.map((section, index) => ({
    id: sectionId(section.heading, index),
    index: String(index + 1).padStart(2, "0"),
    label: section.heading,
  }));

  const jumpTo = (id: string) => {
    const node = document.getElementById(id);
    if (!node) return;
    lenis?.scrollTo(node, { offset: -72, force: true });
  };

  const kindLabel = researchKindLabel[article.kind];

  return (
    <div className="pt-24">
      <div className="relative mx-auto max-w-6xl px-8 md:px-14 lg:px-16">
        <article className="min-w-0 max-w-3xl xl:max-w-[42rem]">
          <CoverPlate
            src={article.cover}
            fallbackSrc={article.coverFallback}
            label={article.title}
          />

          <header className="scroll-mt-28 pb-10 pt-10 md:scroll-mt-24 md:pb-12 md:pt-12">
            <p className="mb-3 text-[11px] font-light uppercase tracking-[0.22em] text-white/40">
              {kindLabel}
              <span className="text-white/20"> · </span>
              {article.date}
            </p>
            <h1
              id="article-headline"
              className="max-w-3xl font-display text-3xl font-normal leading-[1.15] tracking-[-0.02em] text-white md:text-[2.5rem]"
            >
              {article.title}
            </h1>
            <Idea>{article.lead}</Idea>

            <div className="mt-10 max-w-2xl">
              <p className="mb-4 text-[11px] font-light uppercase tracking-[0.22em] text-white/35">
                Reading path
              </p>
              <ol className="divide-y divide-white/10 border-y border-white/10">
                {nav.map((step) => (
                  <li key={step.id}>
                    <button
                      type="button"
                      onClick={() => jumpTo(step.id)}
                      className="grid w-full grid-cols-[2rem_1fr] items-baseline gap-3 py-3.5 text-left transition hover:bg-white/[0.02] sm:grid-cols-[2rem_1fr]"
                    >
                      <span className="font-mono text-[10px] tracking-wide text-white/35">
                        {step.index}
                      </span>
                      <span className="text-sm font-medium tracking-tight text-white">
                        {step.label}
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </header>

          {article.sections.map((section, index) => (
            <SectionBlock
              key={section.heading}
              section={section}
              index={index}
              articleCover={article.cover}
              kicker={kindLabel}
              flushTop={index === 0}
            />
          ))}

          {article.citations && article.citations.length > 0 ? (
            <Chapter id="references" labelledBy="references-headline">
              <ChapterHead
                index={String(article.sections.length + 1).padStart(2, "0")}
                kicker="Sources"
                headlineId="references-headline"
                headline="References"
              />
              <dl className="mt-8 max-w-2xl divide-y divide-white/10 border-y border-white/10">
                {article.citations.map((citation) => (
                  <div key={citation.href} className="py-4">
                    <dt>
                      <a
                        href={citation.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-medium tracking-tight text-white transition hover:text-white/80"
                      >
                        {citation.title}
                      </a>
                    </dt>
                    {citation.venue ? (
                      <dd className="mt-1.5 text-sm font-light leading-relaxed text-white/45">
                        {citation.venue}
                      </dd>
                    ) : null}
                  </div>
                ))}
              </dl>
            </Chapter>
          ) : null}
        </article>

        {related.length > 0 ? (
          <section className="mt-4 border-t border-white/10 py-12 md:py-14">
            <p className="mb-3 text-[11px] font-light uppercase tracking-[0.22em] text-white/40">
              Related
            </p>
            <h2 className="font-display text-2xl font-normal tracking-[-0.02em] text-white md:text-3xl">
              Continue on the ledger
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {related.map((item) => (
                <ResearchCard key={item.slug} article={item} />
              ))}
            </div>
          </section>
        ) : null}

        <div className="border-t border-white/10 py-12 md:py-14">
          <CtaLink href={researchIndexHref} variant="secondary">
            All research
          </CtaLink>
        </div>

        <ResearchToc
          items={[
            ...nav,
            ...(article.citations?.length
              ? [
                  {
                    id: "references",
                    index: String(article.sections.length + 1).padStart(2, "0"),
                    label: "References",
                  },
                ]
              : []),
          ]}
          onJump={jumpTo}
        />
      </div>
    </div>
  );
}
