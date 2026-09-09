import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ResearchScrollReset } from "@/components/research/research-scroll-reset";
import { StoryMeadowPlate } from "@/components/story-meadow";
import { SmoothScroll } from "@/components/ui/smooth-scroll";

function ResearchTopBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-white/10 bg-black/40 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-4 md:px-14 lg:px-16">
        <Link href="/research" className="flex min-w-0 items-center gap-3">
          <span className="relative h-[15px] w-[78px] shrink-0">
            <Image
              src="/logo-dark.svg"
              alt="InTacht"
              fill
              className="object-contain"
              priority
            />
          </span>
          <span className="hidden text-[11px] font-light uppercase tracking-[0.22em] text-white/45 sm:inline">
            IQ Research
          </span>
        </Link>
        <Link
          href="/#act-1"
          className="shrink-0 text-[11px] font-light uppercase tracking-[0.22em] text-white/45 transition hover:text-white"
        >
          Field-IQ
        </Link>
      </div>
    </header>
  );
}

export function ResearchShell({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      <ResearchScrollReset />
      <div className="relative min-h-svh text-white">
        <ResearchTopBar />
        <StoryMeadowPlate />
        <div className="relative z-10 -mt-[100svh]">{children}</div>
      </div>
    </SmoothScroll>
  );
}
