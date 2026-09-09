import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResearchArticleView } from "@/components/research/research-article";
import { ResearchShell } from "@/components/research/research-shell";
import {
  getResearchArticle,
  getResearchArticles,
  researchKindLabel,
} from "@/lib/research";

type ResearchSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getResearchArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ResearchSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getResearchArticle(slug);
  if (!article) {
    return { title: "IQ Research — InTacht" };
  }
  return {
    title: `${article.title} — IQ Research`,
    description: article.excerpt,
  };
}

export default async function ResearchSlugPage({ params }: ResearchSlugPageProps) {
  const { slug } = await params;
  const article = getResearchArticle(slug);
  if (!article) notFound();

  return (
    <ResearchShell>
      <main aria-label={`${researchKindLabel[article.kind]}: ${article.title}`}>
        <ResearchArticleView article={article} />
      </main>
    </ResearchShell>
  );
}
