import type { ReactNode } from "react";

export function LabsShell({ children }: { children: ReactNode }) {
  return <div className="relative min-h-svh bg-black text-white">{children}</div>;
}
