"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type ThemeToggleProps = {
  variant?: "default" | "on-dark";
};

export function ThemeToggle({ variant = "default" }: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const onDark = variant === "on-dark";
  const buttonClass = `flex size-7 items-center justify-center rounded-full border transition-colors ${
    onDark
      ? "border-white/20 text-white/70 hover:border-white/35 hover:bg-white/10 hover:text-white"
      : "border-line text-ink-muted hover:border-transparent hover:bg-surface-muted hover:text-ink"
  }`;

  if (!mounted) {
    return (
      <button
        type="button"
        className={buttonClass}
        aria-label="Toggle theme"
        suppressHydrationWarning
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={buttonClass}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.25" />
          <path
            d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M8 12.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z"
            stroke="currentColor"
            strokeWidth="1.25"
          />
          <path
            d="M8 1v1M8 14v1M1 8h1M14 8h1"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}
