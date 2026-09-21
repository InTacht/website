import type { ReactNode } from "react";
import { SiteTopBar } from "@/components/site-top-bar";

export function LabsShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-svh bg-black text-white">
      <SiteTopBar />
      {children}
    </div>
  );
}
