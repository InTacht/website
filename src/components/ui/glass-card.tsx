import type { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
};

/** Landing-matched glass surface (same language as hero cards). */
export function GlassCard({ children, className = "", as: Tag = "div" }: GlassCardProps) {
  return (
    <Tag className={`glass rounded-[1.5rem] ${className}`}>
      {children}
    </Tag>
  );
}
