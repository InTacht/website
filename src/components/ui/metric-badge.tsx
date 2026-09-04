import { Database, DollarSign, Zap, type LucideIcon } from "lucide-react";

type MetricBadgeProps = {
  label: string;
  icon?: "database" | "zap" | "dollar";
  className?: string;
};

const ICONS: Record<NonNullable<MetricBadgeProps["icon"]>, LucideIcon> = {
  database: Database,
  zap: Zap,
  dollar: DollarSign,
};

/** Soft glass metric pill — Lucide icons per Assets.md. */
export function MetricBadge({ label, icon, className = "" }: MetricBadgeProps) {
  const Icon = icon ? ICONS[icon] : null;

  return (
    <div
      className={`glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-light tracking-wide text-white/80 ${className}`}
    >
      {Icon ? <Icon className="size-3.5 shrink-0 text-white/45" aria-hidden /> : null}
      {label}
    </div>
  );
}
