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

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {articles.map((article) => (
              <ResearchCard key={article.slug} article={article} />
            ))}
          </div>
        </StorySection>
      </main>
    </ResearchShell>
  );
}
