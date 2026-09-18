import Link from "next/link";
import type { ReactNode } from "react";

export const ctaPrimaryClass =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-light tracking-wide text-white transition hover:opacity-90 md:px-7 md:text-base glass";

export const ctaPrimaryStyle = {
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(8,9,16,0.62) 100%)",
} as const;

const ctaSecondaryClass =
  "inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-light tracking-wide text-white/70 transition hover:border-white/30 hover:text-white md:px-7 md:text-base";

type CtaVariant = "primary" | "secondary";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function CtaLink({
  href,
  variant = "primary",
  children,
  className,
}: {
  href: string;
  variant?: CtaVariant;
  children: ReactNode;
  className?: string;
}) {
  const isPrimary = variant === "primary";
  return (
    <Link
      href={href}
      className={cx(isPrimary ? ctaPrimaryClass : ctaSecondaryClass, className)}
      style={isPrimary ? ctaPrimaryStyle : undefined}
    >
      {children}
    </Link>
  );
}
