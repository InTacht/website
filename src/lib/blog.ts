import changingAiLandscapeSlms from "../../content/blog/changing-ai-landscape-slms.json";
import databricksLakebaseLtap from "../../content/blog/databricks-lakebase-ltap.json";
import historyOfDatabases from "../../content/blog/history-of-databases.json";

export type BlogSection = {
  heading: string;
  level: 2 | 3;
  body: string[];
  bullets: string[];
};

export type BlogPoint = {
  title: string;
  body: string[];
  bullets: string[];
};

/** Thesis-style chapter: one H2, with nested H3s folded into points. */
export type BlogChapter = {
  heading: string;
  body: string[];
  bullets: string[];
  points: BlogPoint[];
};

export type BlogArticle = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  lead: string;
  cover: string;
  related: readonly string[];
  sections: BlogSection[];
  chapters: BlogChapter[];
};

function normalizeHeading(heading: string) {
  return heading.replace(/:$/, "").trim();
}

/** Fold H3 detail sections under the preceding H2, thesis PointList style. */
export function groupBlogChapters(
  sections: readonly BlogSection[],
): BlogChapter[] {
  const chapters: BlogChapter[] = [];

  for (const section of sections) {
    const heading = normalizeHeading(section.heading);
    const level = section.level === 3 ? 3 : 2;
    const body = section.body.filter(Boolean);
    const bullets = section.bullets.filter(Boolean);

    if (level === 3) {
      const parent = chapters[chapters.length - 1];
      if (parent) {
        parent.points.push({
          title: heading || "Note",
          body,
          bullets,
        });
        continue;
      }
      chapters.push({
        heading: heading || "Detail",
        body,
        bullets: [],
        points: [],
      });
      continue;
    }

    chapters.push({
      heading,
      body,
      bullets,
      points: [],
    });
  }

  return chapters.filter(
    (chapter) =>
      chapter.heading ||
      chapter.body.length > 0 ||
      chapter.bullets.length > 0 ||
      chapter.points.length > 0,
  );
}

function chapterId(heading: string, index: number) {
  const slug = (heading || "section")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `s${String(index + 1).padStart(2, "0")}-${slug.slice(0, 48)}`;
}

export function getBlogChapterId(chapter: BlogChapter, index: number) {
  return chapterId(chapter.heading, index);
}

const blogArticles: readonly BlogArticle[] = [
  databricksLakebaseLtap,
  changingAiLandscapeSlms,
  historyOfDatabases,
].map((article) => {
  const sections = article.sections.map((section) => ({
    ...section,
    level: (section.level === 3 ? 3 : 2) as 2 | 3,
  }));
  return {
    ...article,
    related: article.related,
    sections,
    chapters: groupBlogChapters(sections),
  };
}) as BlogArticle[];

export function getBlogArticles(): readonly BlogArticle[] {
  return [...blogArticles].sort((a, b) => b.date.localeCompare(a.date));
}

export function getBlogArticle(slug: string): BlogArticle | undefined {
  return blogArticles.find((article) => article.slug === slug);
}

export function getRelatedBlogArticles(article: BlogArticle): BlogArticle[] {
  return article.related
    .map((slug) => getBlogArticle(slug))
    .filter((related): related is BlogArticle => related != null);
}

export function formatBlogDate(date: string): string {
  const parsed = new Date(`${date}T12:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}
