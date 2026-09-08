import type { ReactNode } from "react";

type MechanicsShellProps = {
  ariaLabel: string;
  children: ReactNode;
};

/**
 * Field drawing surface. No nested card. The parent GlassCard is the chrome.
 */
export function MechanicsShell({ ariaLabel, children }: MechanicsShellProps) {
  return (
    <article
      aria-label={ariaLabel}
      className="relative aspect-[2.15/1] w-full min-h-[188px] overflow-hidden"
    >
      {children}
    </article>
  );
}
