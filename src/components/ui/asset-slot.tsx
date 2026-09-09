"use client";

type AssetSlotProps = {
  src: string;
  label: string;
  className?: string;
  aspect?: string;
  /** Photo cover vs diagram contain. */
  fit?: "cover" | "contain";
  /** Optional photo fallback if primary SVG fails. */
  fallbackSrc?: string;
  /** Photo scrim. Off for diagrams so chart ink stays readable. */
  overlay?: boolean;
};

/** Glass media panel. Diagrams contain; photos cover. Missing assets fall back quietly. */
export function AssetSlot({
  src,
  label,
  className = "",
  aspect = "aspect-video",
  fit = "cover",
  fallbackSrc,
  overlay,
}: AssetSlotProps) {
  const isSvg = src.endsWith(".svg");
  const objectFit = fit === "contain" || isSvg ? "object-contain" : "object-cover";
  const showOverlay = overlay ?? !isSvg;

  return (
    <div className={`glass relative overflow-hidden rounded-[1.5rem] ${aspect} ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className={`absolute inset-0 size-full ${objectFit} object-center p-0 ${
          isSvg ? "bg-[#0D0E15] p-3 md:p-4" : ""
        }`}
        onError={(event) => {
          const img = event.currentTarget;
          if (fallbackSrc && img.dataset.fallback !== "1") {
            img.dataset.fallback = "1";
            img.src = fallbackSrc;
            img.classList.remove("p-3", "md:p-4", "p-4", "md:p-6", "bg-[#0D0E15]", "bg-[#0D0E15]/60");
            img.classList.add("object-cover");
            img.classList.remove("object-contain");
            return;
          }
          img.style.display = "none";
          const fallback = img.parentElement?.querySelector("[data-asset-fallback]");
          if (fallback instanceof HTMLElement) {
            fallback.hidden = false;
            fallback.removeAttribute("aria-hidden");
            fallback.style.display = "flex";
          }
        }}
      />
      {showOverlay ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/15"
        />
      ) : null}
      <div
        hidden
        aria-hidden
        data-asset-fallback
        className="absolute inset-0 flex-col items-center justify-center gap-2 px-6 text-center"
      >
        <span className="text-[11px] font-light uppercase tracking-[0.22em] text-white/35">
          Visual
        </span>
        <span className="max-w-[14rem] text-sm font-light text-white/50">{label}</span>
      </div>
    </div>
  );
}
