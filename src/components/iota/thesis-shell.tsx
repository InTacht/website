import type { ReactNode } from "react";
import { SiteShell } from "@/components/site-shell";

export function ThesisShell({ children }: { children: ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
