"use client";

/**
 * Act 1 — first graphic.
 * Frontier-model reference plate: glass specimen card, quiet lockup,
 * faint all-to-all attention lattice, one cost-wall cue.
 */
export function FrontierModelPlate() {
  return (
    <article
      aria-label="Kimi / Moonshot frontier model reference"
      className="glass relative aspect-[16/7] overflow-hidden rounded-[1.5rem]"
    >
      {/* Deep well behind the glass sheen */}
      <div
        aria-hidden
        className="absolute inset-[1px] rounded-[calc(1.5rem-1px)] bg-[#070708]/85"
      />

      {/* Attention lattice — almost silent, barely breathing */}
      <svg
        aria-hidden
        viewBox="0 0 560 245"
        className="frontier-lattice pointer-events-none absolute inset-0 size-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="frontier-fade" cx="58%" cy="48%" r="55%">
            <stop offset="0%" stopColor="white" stopOpacity="0.14" />
            <stop offset="55%" stopColor="white" stopOpacity="0.05" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="frontier-edge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0" />
            <stop offset="35%" stopColor="#EF4444" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Soft focus pool */}
        <ellipse cx="320" cy="118" rx="210" ry="98" fill="url(#frontier-fade)" />

        {/* Sparse node lattice — every-word-to-every-word suggestion */}
        <g stroke="rgba(255,255,255,0.10)" strokeWidth="0.7" fill="none">
          <path d="M72 58 L148 96 L228 64 L310 108 L392 72 L468 118" />
          <path d="M88 168 L162 132 L248 176 L332 140 L418 182 L492 150" />
          <path d="M148 96 L162 132 L248 176 L310 108 L392 72 L418 182" />
          <path d="M228 64 L248 176" />
          <path d="M310 108 L332 140" />
          <path d="M72 58 L88 168" opacity="0.55" />
          <path d="M468 118 L492 150" opacity="0.55" />
          <path d="M162 132 L228 64 L332 140 L392 72" opacity="0.45" />
        </g>

        <g fill="rgba(255,255,255,0.28)">
          <circle cx="72" cy="58" r="1.8" />
          <circle cx="148" cy="96" r="2.1" />
          <circle cx="228" cy="64" r="1.6" />
          <circle cx="310" cy="108" r="2.4" />
          <circle cx="392" cy="72" r="1.7" />
          <circle cx="468" cy="118" r="2" />
          <circle cx="88" cy="168" r="1.5" />
          <circle cx="162" cy="132" r="2" />
          <circle cx="248" cy="176" r="1.8" />
          <circle cx="332" cy="140" r="2.2" />
          <circle cx="418" cy="182" r="1.6" />
          <circle cx="492" cy="150" r="1.9" />
        </g>

        {/* Single heated node — the strain point */}
        <circle cx="310" cy="108" r="4.5" fill="rgba(239,68,68,0.18)" />
        <circle cx="310" cy="108" r="2.2" fill="rgba(251,146,60,0.75)" />

        {/* Left tension rail */}
        <rect x="0" y="36" width="2" height="172" fill="url(#frontier-edge)" />
      </svg>

      {/* Content lockup */}
      <div className="relative z-10 flex h-full flex-col justify-between px-6 py-5 md:px-7 md:py-6">
        <div className="flex items-start justify-between gap-4">
          <p className="text-[10px] font-light uppercase tracking-[0.28em] text-white/35">
            Frontier reference
          </p>
          <p className="shrink-0 text-[10px] font-light uppercase tracking-[0.22em] text-white/30">
            <span className="text-orange-300/70">~3T</span>
            <span className="text-white/25"> params</span>
          </p>
        </div>

        <div className="pb-0.5">
          <p className="font-display text-[1.65rem] font-normal leading-none tracking-[-0.03em] text-white md:text-[1.85rem]">
            Kimi
          </p>
          <p className="mt-1.5 text-[11px] font-light uppercase tracking-[0.26em] text-white/40 md:text-xs">
            Moonshot AI
          </p>
        </div>
      </div>

      {/* Top glass catch-light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
      />
    </article>
  );
}
