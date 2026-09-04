import { ThemeToggle } from "./theme-toggle";

export function Footer({ className = "" }: { className?: string }) {
  return (
    <footer
      className={`border-t border-line bg-surface/60 backdrop-blur-sm ${className}`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-8">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
          InTacht
        </span>

        <div className="flex items-center gap-4">
          <span className="text-xs text-ink-faint">2026</span>
          <ThemeToggle variant="default" />
        </div>
      </div>
    </footer>
  );
}
