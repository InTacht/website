import { ResearchCard } from "@/components/research/research-card";
import { ResearchShell } from "@/components/research/research-shell";
import {
  StoryHeadline,
  StoryLead,
  StorySection,
} from "@/components/story-primitives";
import { getResearchArticles } from "@/lib/research";

export const metadata = {
  title: "IQ Research — InTacht",
  description:
    "Lab notes from Field-IQ. Associative recall, matched-parameter perplexity, and the instruments behind them. Numbers from the ledger.",
};

export default function ResearchIndexPage() {
  const articles = getResearchArticles();
  const featured = articles.find((article) => article.featured) ?? articles[0];
  const rest = articles.filter((article) => article.slug !== featured.slug);
  const [side, ...tail] = rest;

  return (
    <ResearchShell>
      <main>
        <StorySection
          id="research"
          labelledBy="research-headline"
          className="pb-32 pt-28 md:pb-40 md:pt-32"
        >
          <p className="mb-4 text-[11px] font-light uppercase tracking-[0.28em] text-white/40">
            IQ Research
          </p>
          <StoryHeadline id="research-headline" as="h1">
            Open benchmarks and measured findings.
          </StoryHeadline>
          <StoryLead>
            Lab notes from Field-IQ. Numbers from the ledger. Neighbors cited.
            Nothing claimed that a probe has not earned.
          </StoryLead>

          <div className="mt-16 grid gap-10 md:grid-cols-3 md:items-stretch md:gap-x-8 md:gap-y-12">
            <ResearchCard
              article={featured}
              featured
              className="md:col-span-2"
            />
            {side ? <ResearchCard article={side} /> : null}
          </div>

          {tail.length > 0 ? (
            <div className="mt-10 grid gap-10 sm:grid-cols-2 md:mt-14 md:gap-x-8 md:gap-y-12">
              {tail.map((article) => (
                <ResearchCard key={article.slug} article={article} />
              ))}
            </div>
          ) : null}
        </StorySection>
      </main>
    </ResearchShell>
  );
}
