import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticleView } from "@/components/blog/blog-article";
import { BlogShell } from "@/components/blog/blog-shell";
import { getBlogArticle, getBlogArticles } from "@/lib/blog";

type BlogSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBlogArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: BlogSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticle(slug);
  if (!article) {
    return { title: "Blog — InTacht" };
  }
  return {
    title: `${article.title} — Blog`,
    description: article.excerpt,
  };
}

export default async function BlogSlugPage({ params }: BlogSlugPageProps) {
  const { slug } = await params;
  const article = getBlogArticle(slug);
  if (!article) notFound();

  return (
    <BlogShell>
      <main aria-label={`Blog: ${article.title}`}>
        <BlogArticleView article={article} />
      </main>
    </BlogShell>
  );
}
