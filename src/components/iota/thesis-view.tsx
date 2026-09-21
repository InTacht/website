"use client";

import Image from "next/image";
import { useLenis } from "lenis/react";
import type { ReactNode } from "react";
import { ThesisClockProvider } from "@/components/iota/thesis-graphics/clock";
import { LimitationHero } from "@/components/iota/thesis-graphics/limitation";
import { SystemHero } from "@/components/iota/thesis-graphics/system";
import { CortexHero } from "@/components/iota/thesis-graphics/cortex";
import { IqHero } from "@/components/iota/thesis-graphics/iq";
import { ExpertsHero } from "@/components/iota/thesis-graphics/experts";
import { RouterHero } from "@/components/iota/thesis-graphics/router";
import { DurabilityHero } from "@/components/iota/thesis-graphics/durability";
import { PrivacyHero } from "@/components/iota/thesis-graphics/privacy";
import { LearningHero, CloseHero } from "@/components/iota/thesis-graphics/rest";
import { ThesisMobileRail, ThesisToc } from "@/components/iota/thesis-toc";
import {
  boundaries,
  close,
  cortex,
  durability,
  experts,
  horizon,
  iqProfiles,
  learning,
  limitation,
  privacy,
  router,
  system,
  thesisMeta,
  uses,
} from "@/lib/iota-thesis";

/** Figma Landing_Page / banner (1676:5), 1200×675. */
const THESIS_BANNER_SRC = "/iota-thesis-banner.png";

const PARTS = [
  {
    label: "The problem",
    blurb: "Why a single model cannot be the whole of intelligence.",
    ids: ["limitation", "system"],
  },
  {
    label: "The architecture",
    blurb: "Cortex, profiles, experts, and the router that binds them.",
    ids: ["cortex", "iq-profiles", "experts", "router"],
  },
  {
    label: "The implications",
    blurb: "Durability, privacy, learning, horizon, uses, and limits.",
    ids: ["durability", "privacy", "learning", "horizon", "uses", "boundaries"],
  },
  {
    label: "The destination",
    blurb: "Organization-native intelligence and the wider stack.",
    ids: ["close"],
  },
] as const;

function splitEyebrow(eyebrow: string) {
  const [index, ...rest] = eyebrow.split(" · ");
  return { index, kicker: rest.join(" · ") || eyebrow };
}

function Chapter({
  id,
  labelledBy,
  children,
  className = "",
  flushTop = false,
}: {
  id: string;
  labelledBy: string;
  children: ReactNode;
  className?: string;
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
      } ${className}`}
    >
      {children}
    </section>
  );
}

function PartGate({ id }: { id: string }) {
  const part = PARTS.find((entry) => entry.ids[0] === id);
  if (!part) return null;
  return (
    <div className="mt-6 border-t border-white/15 pt-10 md:mt-8 md:pt-12">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p className="text-[11px] font-light uppercase tracking-[0.28em] text-white/45">
          {part.label}
        </p>
        <p className="font-mono text-[10px] tracking-wide text-white/25">
          {String(part.ids.length).padStart(2, "0")} ·{" "}
          {part.ids.length === 1 ? "chapter" : "chapters"}
        </p>
      </div>
      <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-white/40">
        {part.blurb}
      </p>
    </div>
  );
}

function ChapterHead({
  eyebrow,
  headlineId,
  headline,
}: {
  eyebrow: string;
  headlineId: string;
  headline: string;
}) {
  const { index, kicker } = splitEyebrow(eyebrow);
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
  wide = false,
}: {
  items: readonly { title: string; body: string }[];
  wide?: boolean;
}) {
  return (
    <dl className="mt-8 max-w-2xl divide-y divide-white/10 border-y border-white/10">
      {items.map((item) => (
        <div
          key={item.title}
          className={`grid gap-1 py-4 sm:gap-6 ${
            wide
              ? "sm:grid-cols-[11rem_1fr]"
              : "sm:grid-cols-[9rem_1fr]"
          }`}
        >
          <dt className="text-sm font-medium tracking-tight text-white">
            {item.title}
          </dt>
          <dd className="text-sm font-light leading-relaxed text-white/55 md:text-[15px]">
            {item.body}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function BulletList({
  title,
  items,
}: {
  title?: string;
  items: readonly string[];
}) {
  return (
    <div className="mt-8 max-w-2xl">
      {title ? (
        <p className="mb-3 text-sm font-medium tracking-tight text-white">
          {title}
        </p>
      ) : null}
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li
            key={item}
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

function StageList({
  items,
}: {
  items: readonly { index: string; title: string; body: string }[];
}) {
  return (
    <ol className="mt-8 max-w-2xl divide-y divide-white/10 border-y border-white/10">
      {items.map((item) => (
        <li
          key={item.index}
          className="grid grid-cols-[2rem_1fr] gap-3 py-4 sm:grid-cols-[2rem_9rem_1fr] sm:gap-6"
        >
          <span className="font-mono text-[10px] tracking-wide text-white/35">
            {item.index}
          </span>
          <span className="text-sm font-medium tracking-tight text-white">
            {item.title}
          </span>
          <span className="col-span-2 text-sm font-light leading-relaxed text-white/55 sm:col-span-1 md:text-[15px]">
            {item.body}
          </span>
        </li>
      ))}
    </ol>
  );
}

function StatusBoard({
  columns,
}: {
  columns: readonly { title: string; items: readonly string[] }[];
}) {
  return (
    <div className="mt-8 max-w-2xl space-y-8">
      {columns.map((column) => (
        <div key={column.title}>
          <p className="mb-3 text-sm font-medium tracking-tight text-white">
            {column.title}
          </p>
          <ul className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
            {column.items.map((item) => (
              <li
                key={item}
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
      ))}
    </div>
  );
}

function UseCaseList({
  items,
}: {
  items: readonly { title: string; status: string; body: string }[];
}) {
  return (
    <dl className="mt-8 max-w-2xl divide-y divide-white/10 border-y border-white/10">
      {items.map((item) => (
        <div key={item.title} className="py-5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <dt className="text-sm font-medium tracking-tight text-white">
              {item.title}
            </dt>
            <dd className="text-[10px] font-light uppercase tracking-[0.18em] text-white/35">
              {item.status}
            </dd>
          </div>
          <p className="mt-2 text-sm font-light leading-relaxed text-white/55 md:text-[15px]">
            {item.body}
          </p>
        </div>
      ))}
    </dl>
  );
}

function SystemBeats({ className = "" }: { className?: string }) {
  return (
    <ol
      className={`divide-y divide-white/10 border-y border-white/10 ${className}`}
    >
      {thesisMeta.beats.map((beat) => (
        <li
          key={beat.index}
          className="grid grid-cols-[2rem_6.5rem_1fr] items-baseline gap-3 py-3.5"
        >
          <span className="font-mono text-[10px] tracking-wide text-white/35">
            {beat.index}
          </span>
          <span className="text-sm font-medium tracking-tight text-white">
            {beat.name}
          </span>
          <span className="text-sm font-light leading-snug text-white/50">
            {beat.line}
          </span>
        </li>
      ))}
    </ol>
  );
}

export function ThesisView() {
  const lenis = useLenis();

  const jumpTo = (id: string) => {
    const node = document.getElementById(id);
    if (!node) return;
    lenis?.scrollTo(node, { offset: -72, force: true });
  };

  return (
    <ThesisClockProvider>
    <main className="pt-24">
      <div className="relative mx-auto max-w-6xl px-8 md:px-14 lg:px-16">
        <div className="relative">
        <article className="thesis-article min-w-0 max-w-3xl xl:max-w-[42rem]">
          <figure className="relative w-full overflow-hidden">
            <div className="relative aspect-[3/1] w-full bg-[#0A0E1A]">
              <Image
                src={THESIS_BANNER_SRC}
                alt=""
                fill
                priority
                sizes="(max-width: 1280px) 48rem, 42rem"
                className="object-cover object-center"
              />
            </div>
          </figure>

          <ThesisMobileRail />

          <header className="scroll-mt-28 pb-10 pt-10 md:scroll-mt-24 md:pb-12 md:pt-12">
            <p className="mb-3 text-[11px] font-light uppercase tracking-[0.22em] text-white/40">
              {thesisMeta.eyebrow}
            </p>
            <h1
              id="thesis-headline"
              className="max-w-3xl font-display text-3xl font-normal leading-[1.15] tracking-[-0.02em] text-white md:text-[2.5rem]"
            >
              {thesisMeta.headline}
            </h1>

            <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-white/55 md:text-[17px]">
              {thesisMeta.framing}
            </p>

            <div className="mt-10 max-w-2xl">
              <p className="mb-4 text-[11px] font-light uppercase tracking-[0.22em] text-white/35">
                Reading path
              </p>
              <ol className="divide-y divide-white/10 border-y border-white/10">
                {thesisMeta.path.map((step, index) => (
                  <li key={step.id}>
                    <button
                      type="button"
                      onClick={() => jumpTo(step.id)}
                      className="grid w-full grid-cols-[2rem_7.5rem_1fr] items-baseline gap-3 py-3.5 text-left transition hover:bg-white/[0.02]"
                    >
                      <span className="font-mono text-[10px] tracking-wide text-white/35">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-medium tracking-tight text-white">
                        {step.label}
                      </span>
                      <span className="text-sm font-light leading-snug text-white/45">
                        {step.detail}
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-10 max-w-2xl">
              <p className="mb-4 text-[11px] font-light uppercase tracking-[0.22em] text-white/35">
                The system
              </p>
              <SystemBeats />
            </div>

            <div className="mt-10 max-w-2xl">
              <p className="mb-4 text-[11px] font-light uppercase tracking-[0.22em] text-white/35">
                At a glance
              </p>
              <dl className="divide-y divide-white/10 border-y border-white/10">
                {thesisMeta.glance.map((item) => (
                  <div
                    key={item.label}
                    className="grid gap-2 py-5 sm:grid-cols-[7.5rem_1fr] sm:gap-6"
                  >
                    <dt className="text-[11px] font-light uppercase tracking-[0.18em] text-white/40">
                      {item.label}
                    </dt>
                    <dd>
                      <p className="text-sm font-medium tracking-tight text-white">
                        {item.title}
                      </p>
                      <p className="mt-1.5 text-sm font-light leading-relaxed text-white/55 md:text-[15px]">
                        {item.body}
                      </p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <p className="mt-8 max-w-2xl text-sm font-light leading-relaxed text-white/40 md:text-[15px]">
              {thesisMeta.lede}
            </p>
          </header>

          <PartGate id="limitation" />
          <Chapter id="limitation" labelledBy="limitation-headline" flushTop>
            <ChapterHead
              eyebrow={limitation.eyebrow}
              headlineId="limitation-headline"
              headline={limitation.headline}
            />
            <Idea>{limitation.lead}</Idea>
            <LimitationHero />
            <Body>{limitation.body}</Body>
            <PointList items={limitation.reasons} />
            <CloseLine>{limitation.close}</CloseLine>
          </Chapter>

          <Chapter id="system" labelledBy="system-headline">
            <ChapterHead
              eyebrow={system.eyebrow}
              headlineId="system-headline"
              headline={system.headline}
            />
            <Idea>{system.lead}</Idea>
            <SystemHero />
            <Body>{system.body}</Body>
            <PointList items={system.duties} />
            <CloseLine>{system.close}</CloseLine>
          </Chapter>

          <PartGate id="cortex" />
          <Chapter id="cortex" labelledBy="cortex-headline" flushTop>
            <ChapterHead
              eyebrow={cortex.eyebrow}
              headlineId="cortex-headline"
              headline={cortex.headline}
            />
            <Idea>{cortex.lead}</Idea>
            <CortexHero />
            <PointList items={cortex.cards} />
          </Chapter>

          <Chapter id="iq-profiles" labelledBy="iq-headline">
            <ChapterHead
              eyebrow={iqProfiles.eyebrow}
              headlineId="iq-headline"
              headline={iqProfiles.headline}
            />
            <Idea>{iqProfiles.lead}</Idea>
            <IqHero />
            <PointList
              items={iqProfiles.binds.map((bind) => ({
                title: bind.label,
                body: bind.value,
              }))}
            />
            <BulletList title="What the wedge asks" items={iqProfiles.wedge} />
            <CloseLine>{iqProfiles.close}</CloseLine>
          </Chapter>

          <Chapter id="experts" labelledBy="experts-headline">
            <ChapterHead
              eyebrow={experts.eyebrow}
              headlineId="experts-headline"
              headline={experts.headline}
            />
            <Idea>{experts.lead}</Idea>
            <ExpertsHero />
            <PointList items={experts.roster} />
            <CloseLine>{experts.close}</CloseLine>
          </Chapter>

          <Chapter id="router" labelledBy="router-headline">
            <ChapterHead
              eyebrow={router.eyebrow}
              headlineId="router-headline"
              headline={router.headline}
            />
            <Idea>{router.lead}</Idea>
            <RouterHero />
            <PointList items={router.principles} />
            <div className="mt-8 max-w-2xl">
              <p className="mb-3 text-[11px] font-light uppercase tracking-[0.22em] text-white/40">
                Route baselines
              </p>
              <dl className="divide-y divide-white/10 border-y border-white/10">
                {router.comparison.map((item) => (
                  <div
                    key={item.label}
                    className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6"
                  >
                    <dt className="text-sm font-medium tracking-tight text-white">
                      {item.label}
                    </dt>
                    <dd className="text-sm font-light leading-relaxed text-white/55 md:text-[15px]">
                      {item.body}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Chapter>

          <PartGate id="durability" />
          <Chapter id="durability" labelledBy="durability-headline" flushTop>
            <ChapterHead
              eyebrow={durability.eyebrow}
              headlineId="durability-headline"
              headline={durability.headline}
            />
            <Idea>{durability.lead}</Idea>
            <DurabilityHero />
            <BulletList
              title="What the working set stitches together"
              items={durability.stitches}
            />
            <CloseLine>{durability.close}</CloseLine>
          </Chapter>

          <Chapter id="privacy" labelledBy="privacy-headline">
            <ChapterHead
              eyebrow={privacy.eyebrow}
              headlineId="privacy-headline"
              headline={privacy.headline}
            />
            <Idea>{privacy.lead}</Idea>
            <PrivacyHero />
            <PointList items={privacy.cards} />
            <CloseLine>{privacy.caution}</CloseLine>
          </Chapter>

          <Chapter id="learning" labelledBy="learning-headline">
            <ChapterHead
              eyebrow={learning.eyebrow}
              headlineId="learning-headline"
              headline={learning.headline}
            />
            <Idea>{learning.lead}</Idea>
            <LearningHero />
            <StageList items={learning.stages} />
          </Chapter>

          <Chapter id="horizon" labelledBy="horizon-headline">
            <ChapterHead
              eyebrow={horizon.eyebrow}
              headlineId="horizon-headline"
              headline={horizon.headline}
            />
            <StatusBoard columns={horizon.columns} />
          </Chapter>

          <Chapter id="uses" labelledBy="uses-headline">
            <ChapterHead
              eyebrow={uses.eyebrow}
              headlineId="uses-headline"
              headline={uses.headline}
            />
            <Idea>{uses.lead}</Idea>
            <UseCaseList items={uses.cases} />
          </Chapter>

          <Chapter id="boundaries" labelledBy="boundaries-headline">
            <ChapterHead
              eyebrow={boundaries.eyebrow}
              headlineId="boundaries-headline"
              headline={boundaries.headline}
            />
            <PointList items={boundaries.nots} wide />
            <BulletList
              title="Technical obligations"
              items={boundaries.obligations}
            />
          </Chapter>

          <PartGate id="close" />
          <Chapter
            id="close"
            labelledBy="close-headline"
            flushTop
            className="pb-28 md:pb-36"
          >
            <ChapterHead
              eyebrow={close.eyebrow}
              headlineId="close-headline"
              headline={close.headline}
            />
            <Idea>{close.lead}</Idea>
            <CloseHero />
            <PointList
              items={close.ecosystem.map((item) => ({
                title: item.name,
                body: item.body,
              }))}
            />

            <div className="mt-12 max-w-2xl">
              <p className="mb-4 text-[11px] font-light uppercase tracking-[0.22em] text-white/35">
                The system
              </p>
              <SystemBeats />
            </div>
          </Chapter>
        </article>

        <aside className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-36 lg:block xl:w-40">
          <div className="pointer-events-auto sticky top-28 max-h-[calc(100svh-7.5rem)] overflow-y-auto overscroll-contain py-2">
            <ThesisToc />
          </div>
        </aside>
        </div>
      </div>
    </main>
    </ThesisClockProvider>
  );
}
