"use client";

import { useLenis } from "lenis/react";
import { BlogCard } from "@/components/blog/blog-card";
import { CtaLink } from "@/components/ui/cta";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  formatBlogDate,
  getBlogChapterId,
  getRelatedBlogArticles,
  type BlogArticle as BlogArticleData,
  type BlogChapter,
} from "@/lib/blog";

const TOP_OFFSET = -72;
const ENTER_INSET = 96;

type PathItem = {
  id: string;
  index: string;
  label: string;
};

/** Compact TOC label: prefer text before a colon, then cap at 3 words. */
function shortNavLabel(heading: string, maxWords = 3): string {
  const primary = heading.split(":")[0]?.trim() || heading;
  const words = primary.split(/\s+/).filter(Boolean);
  return words.slice(0, maxWords).join(" ");
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

function CloseLine({ children }: { children: ReactNode }) {
  return (
    <p className="mt-8 max-w-2xl text-base font-light leading-relaxed text-white/65 md:text-[17px]">
      {children}
    </p>
  );
}

function PointList({
  items,
}: {
  items: readonly {
    title: string;
    body: readonly string[];
    bullets: readonly string[];
  }[];
}) {
  if (items.length === 0) return null;
  return (
    <dl className="mt-8 max-w-2xl divide-y divide-white/10 border-y border-white/10">
      {items.map((item) => (
        <div
          key={item.title}
          className="grid gap-2 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6"
        >
          <dt className="text-sm font-medium tracking-tight text-white">
            {item.title}
          </dt>
          <dd className="space-y-3">
            {item.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 64)}
                className="text-sm font-light leading-relaxed text-white/55 md:text-[15px]"
              >
                {paragraph}
              </p>
            ))}
            {item.bullets.length > 0 ? (
              <ul className="space-y-2">
                {item.bullets.map((bullet) => (
                  <li
                    key={bullet.slice(0, 64)}
                    className="flex gap-3 text-sm font-light leading-relaxed text-white/55 md:text-[15px]"
                  >
                    <span
                      aria-hidden
                      className="mt-[0.55em] h-px w-3 shrink-0 bg-white/30"
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function CoverPlate({ src, label }: { src: string; label: string }) {
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
        />
      </div>
    </figure>
  );
}

function BulletList({ items }: { items: readonly string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="mt-8 max-w-2xl">
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li
            key={item.slice(0, 64)}
            className="flex gap-3 text-sm font-light leading-relaxed text-white/55 md:text-[15px]"
          >
            <span
              aria-hidden
              className="mt-[0.55em] h-px w-3 shrink-0 bg-white/30"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChapterBlock({
  chapter,
  index,
  flushTop = false,
  isLast = false,
}: {
  chapter: BlogChapter;
  index: number;
  flushTop?: boolean;
  isLast?: boolean;
}) {
  const id = getBlogChapterId(chapter, index);
  const headlineId = `${id}-headline`;
  const hasHeading = Boolean(chapter.heading);
  const [lead, ...rest] = chapter.body;
  const close =
    isLast && rest.length > 0 ? rest[rest.length - 1] : null;
  const bodyParas =
    close && rest.length > 0 ? rest.slice(0, -1) : rest;

  return (
    <Chapter id={id} labelledBy={headlineId} flushTop={flushTop}>
      {hasHeading ? (
        <ChapterHead
          index={String(index + 1).padStart(2, "0")}
          kicker="Essay"
          headlineId={headlineId}
          headline={chapter.heading}
        />
      ) : (
        <h2 id={headlineId} className="sr-only">
          Opening
        </h2>
      )}
      {lead ? <Idea>{lead}</Idea> : null}
      <PointList items={chapter.points} />
      {bodyParas.map((paragraph) => (
        <Body key={paragraph.slice(0, 64)}>{paragraph}</Body>
      ))}
      <BulletList items={chapter.bullets} />
      {close ? <CloseLine>{close}</CloseLine> : null}
    </Chapter>
  );
}

function useBlogActiveChapter(items: readonly PathItem[]) {
  const lenis = useLenis();
  const [active, setActive] = useState(items[0]?.id ?? "");
  const activeRef = useRef(active);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    if (items[0]?.id) {
      setActive(items[0].id);
      activeRef.current = items[0].id;
    }
  }, [items]);

  const resolveIndex = useCallback(
    (scroll: number) => {
      const nodes = items
        .map((item) => document.getElementById(item.id))
        .filter((node): node is HTMLElement => node !== null);
      if (nodes.length === 0) return 0;

      const enterLine = window.innerHeight - ENTER_INSET;
      const probe = scroll + enterLine;
      const tops = nodes.map((node) => {
        const labelledBy = node.getAttribute("aria-labelledby");
        const heading = labelledBy ? document.getElementById(labelledBy) : null;
        const target = heading ?? node;
        return scroll + target.getBoundingClientRect().top;
      });

      let index = 0;
      for (let i = 0; i < tops.length; i++) {
        if (tops[i] <= probe + 1) index = i;
        else break;
      }
      return index;
    },
    [items],
  );

  const jumpTo = useCallback(
    (id: string) => {
      const node = document.getElementById(id);
      if (!node) return;
      activeRef.current = id;
      setActive(id);
      lenis?.scrollTo(node, { offset: TOP_OFFSET, force: true });
    },
    [lenis],
  );

  return { active, setActive, activeRef, resolveIndex, jumpTo };
}

function BlogMobileRail({ items }: { items: readonly PathItem[] }) {
  const { active, setActive, activeRef, resolveIndex, jumpTo } =
    useBlogActiveChapter(items);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useLenis((instance) => {
    const index = resolveIndex(instance.scroll);
    const nextId = items[index]?.id;
    if (!nextId || nextId === activeRef.current) return;
    activeRef.current = nextId;
    setActive(nextId);

    const btn = itemRefs.current[index];
    const scroller = scrollerRef.current;
    if (btn && scroller) {
      const left =
        btn.offsetLeft - scroller.clientWidth / 2 + btn.clientWidth / 2;
      scroller.scrollTo({ left, behavior: "smooth" });
    }
  });

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Reading path"
      className="sticky top-14 z-20 -mx-8 border-b border-white/10 bg-black/80 backdrop-blur-md md:-mx-14 lg:hidden"
    >
      <div
        ref={scrollerRef}
        className="flex gap-1 overflow-x-auto overscroll-x-contain px-8 py-2.5 [scrollbar-width:none] md:px-14 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => {
          const isActive = item.id === active;
          return (
            <button
              key={item.id}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              type="button"
              aria-current={isActive ? "location" : undefined}
              onClick={() => jumpTo(item.id)}
              className={`shrink-0 rounded-full px-3 py-1.5 transition-colors ${
                isActive
                  ? "bg-white/[0.12] text-white"
                  : "text-white/45 hover:text-white/75"
              }`}
            >
              <span className="flex items-baseline gap-1.5">
                <span className="font-mono text-[10px] tracking-wide text-white/35">
                  {item.index}
                </span>
                <span className="text-[12px] font-light tracking-wide whitespace-nowrap">
                  {item.label}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function BlogReadingPath({ items }: { items: readonly PathItem[] }) {
  const { active, setActive, activeRef, resolveIndex, jumpTo } =
    useBlogActiveChapter(items);
  const listRef = useRef<HTMLOListElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const markerRef = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const markerIndexRef = useRef(-1);
  const markerReadyRef = useRef(false);

  const placeMarker = (
    marker: HTMLSpanElement,
    list: HTMLElement,
    button: HTMLElement,
    animate: boolean,
  ) => {
    const listBox = list.getBoundingClientRect();
    const box = button.getBoundingClientRect();
    const top = box.top - listBox.top + list.scrollTop;
    const height = box.height;

    if (!animate) marker.style.transition = "none";
    marker.style.transform = `translate3d(0, ${top}px, 0)`;
    marker.style.height = `${height}px`;
    marker.style.opacity = "1";
    if (!animate) {
      void marker.offsetHeight;
      marker.style.transition = "";
    }
  };

  useLenis((instance) => {
    const list = listRef.current;
    const marker = markerRef.current;
    if (!list || !marker || items.length === 0) return;

    const index = resolveIndex(instance.scroll);
    const currentBtn = itemRefs.current[index];
    if (!currentBtn) return;

    const nextId = items[index].id;
    const indexChanged = markerIndexRef.current !== index;
    if (indexChanged || !markerReadyRef.current) {
      placeMarker(marker, list, currentBtn, markerReadyRef.current);
      markerIndexRef.current = index;
      markerReadyRef.current = true;
    }

    if (nextId !== activeRef.current) {
      activeRef.current = nextId;
      setActive(nextId);

      const nav = navRef.current;
      if (nav) {
        const navBox = nav.getBoundingClientRect();
        const btnBox = currentBtn.getBoundingClientRect();
        if (btnBox.top < navBox.top + 8 || btnBox.bottom > navBox.bottom - 8) {
          currentBtn.scrollIntoView({ block: "nearest" });
        }
      }
    }
  });

  if (items.length === 0) return null;

  return (
    <aside className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-36 lg:block xl:w-40">
      <div className="pointer-events-auto sticky top-28 max-h-[calc(100svh-7.5rem)] overflow-y-auto overscroll-contain py-2">
        <nav ref={navRef} aria-label="Reading path">
            <p className="mb-4 text-[10px] font-light uppercase tracking-[0.22em] text-white/35">
              Reading path
            </p>
            <div className="relative">
              <span
                ref={markerRef}
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 w-px bg-white opacity-0 will-change-transform transition-[transform,height,opacity] duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none"
                style={{ transform: "translate3d(0, 0, 0)", height: 0 }}
              />
              <ol
                ref={listRef}
                className="space-y-0.5 border-l border-white/10"
              >
                {items.map((item, index) => {
                  const isActive = item.id === active;
                  return (
                    <li key={item.id}>
                      <button
                        ref={(node) => {
                          itemRefs.current[index] = node;
                        }}
                        type="button"
                        aria-current={isActive ? "location" : undefined}
                        onClick={() => {
                          markerIndexRef.current = index;
                          const list = listRef.current;
                          const marker = markerRef.current;
                          const button = itemRefs.current[index];
                          if (list && marker && button) {
                            placeMarker(
                              marker,
                              list,
                              button,
                              markerReadyRef.current,
                            );
                            markerReadyRef.current = true;
                          }
                          jumpTo(item.id);
                        }}
                        className={`-ml-px block w-full border-l border-transparent py-1.5 pl-3.5 text-left transition-colors duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none ${
                          isActive
                            ? "text-white"
                            : "text-white/40 hover:text-white/70"
                        }`}
                      >
                        <span className="flex items-baseline gap-2">
                          <span
                            className={`shrink-0 font-mono text-[10px] tracking-wide transition-colors duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none ${
                              isActive ? "text-white/45" : "text-white/25"
                            }`}
                          >
                            {item.index}
                          </span>
                          <span className="text-[12px] font-light leading-snug tracking-wide">
                            {item.label}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
        </nav>
      </div>
    </aside>
  );
}

export function BlogArticleView({ article }: { article: BlogArticleData }) {
  const related = getRelatedBlogArticles(article);
  const pathItems = article.chapters
    .map((chapter, index) => ({
      id: getBlogChapterId(chapter, index),
      index: String(index + 1).padStart(2, "0"),
      label: chapter.heading
        ? shortNavLabel(chapter.heading)
        : "Opening",
    }))
    .filter((item) => item.label !== "Opening");

  return (
    <div className="pt-24">
      <div className="relative mx-auto max-w-6xl px-8 md:px-14 lg:px-16">
        <div className="relative">
          <article className="thesis-article min-w-0 max-w-3xl xl:max-w-[42rem]">
            <CoverPlate src={article.cover} label={article.title} />
            <BlogMobileRail items={pathItems} />

            <header className="scroll-mt-28 pb-10 pt-10 md:scroll-mt-24 md:pb-12 md:pt-12">
              <p className="mb-3 text-[11px] font-light uppercase tracking-[0.22em] text-white/40">
                Blog
                <span className="text-white/20"> · </span>
                {formatBlogDate(article.date)}
              </p>
              <h1
                id="article-headline"
                className="max-w-3xl font-display text-3xl font-normal leading-[1.15] tracking-[-0.02em] text-white md:text-[2.5rem]"
              >
                {article.title}
              </h1>
              <Idea>{article.lead}</Idea>
            </header>

            {article.chapters.map((chapter, index) => (
              <ChapterBlock
                key={getBlogChapterId(chapter, index)}
                chapter={chapter}
                index={index}
                flushTop={index === 0}
                isLast={index === article.chapters.length - 1}
              />
            ))}
          </article>

          <BlogReadingPath items={pathItems} />
        </div>

        {related.length > 0 ? (
          <section className="mt-4 border-t border-white/10 py-12 md:py-14">
            <p className="mb-3 text-[11px] font-light uppercase tracking-[0.22em] text-white/40">
              Related
            </p>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-2xl font-normal tracking-[-0.02em] text-white md:text-3xl">
                More from the blog
              </h2>
              <CtaLink href="/blog" variant="secondary">
                All posts
              </CtaLink>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {related.map((item) => (
                <BlogCard key={item.slug} article={item} />
              ))}
            </div>
          </section>
        ) : (
          <div className="flex justify-end border-t border-white/10 py-12 md:py-14">
            <CtaLink href="/blog" variant="secondary">
              All posts
            </CtaLink>
          </div>
        )}
      </div>
    </div>
  );
}
