import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ThesisBackLink } from "@/components/nav-back";
import { ResearchScrollReset } from "@/components/research/research-scroll-reset";
import { SmoothScroll } from "@/components/ui/smooth-scroll";

function ThesisTopBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 h-14 border-b border-white/10 bg-black/40 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-8 md:px-14 lg:px-16">
        <Link href="/" className="flex min-w-0 items-center gap-3">
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
            IOTA Thesis
          </span>
        </Link>
        <nav className="flex shrink-0 items-center gap-5">
          <Link
            href="/research?from=thesis"
            className="text-[11px] font-light uppercase tracking-[0.22em] text-white/45 transition hover:text-white"
          >
            IQ Research
          </Link>
          <ThesisBackLink />
        </nav>
      </div>
    </header>
  );
}

export function ThesisShell({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      <ResearchScrollReset />
      <div className="relative min-h-svh bg-black text-white">
        <ThesisTopBar />
        <div className="relative z-10">{children}</div>
      </div>
    </SmoothScroll>
  );
}
