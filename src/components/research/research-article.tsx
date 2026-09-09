import Link from "next/link";
import { ResearchCard } from "@/components/research/research-card";
import {
  StoryEyebrow,
  StoryHeadline,
  StoryLead,
  StorySection,
} from "@/components/story-primitives";
import { AssetSlot } from "@/components/ui/asset-slot";
import { GlassCard } from "@/components/ui/glass-card";
import {
  getRelatedArticles,
  researchKindLabel,
  type ResearchArticle as ResearchArticleData,
} from "@/lib/research";

export function ResearchArticleView({
  article,
}: {
  article: ResearchArticleData;
}) {
  const related = getRelatedArticles(article);

  return (
    <StorySection
      id="article"
      labelledBy="article-headline"
      className="pb-32 pt-28 md:pb-40 md:pt-32"
    >
      <p className="mb-4 text-[11px] font-light uppercase tracking-[0.28em] text-white/40">
        {researchKindLabel[article.kind]}
        <span className="text-white/20"> · </span>
        {article.date}
      </p>
      <StoryHeadline id="article-headline" as="h1">
        {article.title}
      </StoryHeadline>
      <StoryLead className="max-w-2xl">{article.lead}</StoryLead>

      <div className="mt-12 max-w-4xl">
        <AssetSlot
          src={article.cover}
          fallbackSrc={article.coverFallback}
          label={article.title}
          aspect="aspect-[16/10]"
          fit="contain"
          overlay={false}
        />
      </div>

      {article.sections.map((section) => (
        <div key={section.heading} className="mt-20 md:mt-28">
          <h2 className="max-w-2xl font-display text-2xl font-normal leading-snug tracking-[-0.02em] text-white md:text-3xl">
            {section.heading}
          </h2>
          <div className="mt-5 max-w-2xl space-y-5">
            {section.body.map((paragraph, index) => (
              <p
                key={`${section.heading}-${index}`}
                className="text-base font-light leading-relaxed text-white/55 md:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
          {section.figure && section.figure.src !== article.cover ? (
            <div className="mt-8 max-w-4xl">
              <AssetSlot
                src={section.figure.src}
                fallbackSrc={section.figure.fallbackSrc}
                label={section.figure.label}
                aspect="aspect-[16/10]"
                fit="contain"
                overlay={false}
              />
            </div>
          ) : null}
          {section.table ? (
            <figure className="mt-8 max-w-4xl">
              <GlassCard className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-[640px] w-full border-collapse text-left">
                    <thead>
                      <tr className="border-b border-white/10">
                        {section.table.columns.map((column) => (
                          <th
                            key={column}
                            className="px-5 py-4 text-[11px] font-light uppercase tracking-[0.18em] text-white/40 md:px-6"
                          >
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row) => (
                        <tr
                          key={row.join("-")}
                          className="border-b border-white/5 last:border-0"
                        >
                          {row.map((cell, index) => (
                            <td
                              key={`${row[0]}-${index}`}
                              className={`px-5 py-5 text-sm font-light leading-relaxed md:px-6 ${
                                index === 0
                                  ? "text-white md:text-base"
                                  : "text-white/55"
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
              <figcaption className="mt-3 max-w-2xl text-[11px] font-light leading-relaxed tracking-wide text-white/30">
                {section.table.caption}
              </figcaption>
            </figure>
          ) : null}
        </div>
      ))}

      {article.citations && article.citations.length > 0 ? (
        <div className="mt-20 max-w-2xl">
          <StoryEyebrow>References</StoryEyebrow>
          <ul className="mt-5 space-y-3">
            {article.citations.map((citation) => (
              <li key={citation.href} className="text-sm font-light leading-relaxed text-white/50 md:text-base">
                <a
                  href={citation.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/70 underline decoration-white/20 underline-offset-4 transition hover:text-white hover:decoration-white/50"
                >
                  {citation.title}
                </a>
                {citation.venue ? (
                  <span className="text-white/35"> {citation.venue}</span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {related.length > 0 ? (
        <div className="mt-24 md:mt-32">
          <StoryEyebrow>Related</StoryEyebrow>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
            {related.map((item) => (
              <ResearchCard key={item.slug} article={item} compact />
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-16">
        <Link
          href="/research"
          className="inline-flex rounded-full border border-white/15 px-6 py-3 text-sm font-light tracking-wide text-white/70 transition hover:border-white/30 hover:text-white md:px-7 md:text-base"
        >
          All research
        </Link>
      </div>
    </StorySection>
  );
}
