import type { ReactNode } from "react";
import { ContactSection } from "@/components/contact-section";
import { ResearchScrollReset } from "@/components/research/research-scroll-reset";
import { SmoothScroll } from "@/components/ui/smooth-scroll";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      <ResearchScrollReset />
      <div className="relative min-h-svh bg-black text-white">
        <div className="relative z-10">{children}</div>
        <ContactSection />
      </div>
    </SmoothScroll>
  );
}
