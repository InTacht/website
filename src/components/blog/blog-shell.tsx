import type { ReactNode } from "react";
import { SiteShell } from "@/components/site-shell";

export function BlogShell({ children }: { children: ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
