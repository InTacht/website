import type { ReactNode } from "react";
import { LabsShell } from "@/components/labs/labs-shell";

export default function LabsLayout({ children }: { children: ReactNode }) {
  return <LabsShell>{children}</LabsShell>;
}
