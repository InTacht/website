import { BlogCard } from "@/components/blog/blog-card";
import { BlogShell } from "@/components/blog/blog-shell";
import {
  StoryHeadline,
  StoryLead,
  StorySection,
} from "@/components/story-primitives";
import { getBlogArticles } from "@/lib/blog";

export const metadata = {
  title: "Blog — InTacht",
  description:
    "Notes on data systems, databases, and the changing AI landscape from InTacht.",
};

export default function BlogIndexPage() {
  const articles = getBlogArticles();

  return (
    <BlogShell>
      <main>
        <StorySection
          id="blog"
          labelledBy="blog-headline"
          className="pb-32 pt-28 md:pb-40 md:pt-32"
        >
          <p className="mb-4 text-[11px] font-light uppercase tracking-[0.28em] text-white/40">
            Blog
          </p>
          <StoryHeadline id="blog-headline" as="h1">
            Notes on data systems and AI infrastructure.
          </StoryHeadline>
          <StoryLead>
            Longer reads from the InTacht desk. Databases, lakehouses, and the
            shift toward smaller models.
          </StoryLead>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {articles.map((article) => (
              <BlogCard key={article.slug} article={article} />
            ))}
          </div>
        </StorySection>
      </main>
    </BlogShell>
  );
}
