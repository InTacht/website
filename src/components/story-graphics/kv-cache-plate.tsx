const W = 640;
const H = 260;
const PLOT = { x: 4, y: 8, w: 612, h: 236 };
const TS = [0.12, 0.36, 0.6, 0.84] as const;
const HEIGHTS = [0.18, 0.36, 0.62, 0.92] as const;
const FILLS = [
  "rgba(248,113,113,0.42)",
  "rgba(248,113,113,0.58)",
  "rgba(248,113,113,0.74)",
  "rgba(248,113,113,0.92)",
] as const;
const CONSTANT = 0.36;
const COL_W = 118;

function xAt(t: number) {
  return PLOT.x + 8 + t * (PLOT.w - 36);
}

function yAt(pct: number) {
  return PLOT.y + (1 - pct) * PLOT.h;
}

export function KvCachePlate() {
  const x0 = PLOT.x;
  const x1 = PLOT.x + PLOT.w;
  const y0 = PLOT.y;
  const y1 = PLOT.y + PLOT.h;
  const yMid = yAt(0.5);
  const y75 = yAt(0.75);
  const y25 = yAt(0.25);
  const yConst = yAt(CONSTANT);
  const lastX = xAt(TS[3]);
  const lastY = yAt(HEIGHTS[3]);

  return (
    <article
      className="glass relative flex aspect-[16/10] w-full flex-col overflow-hidden rounded-[1.5rem] p-4 max-md:aspect-auto max-md:min-h-[22rem] md:p-5"
      aria-label="KV-cache memory footprint. Standard memory grows with context. Field-IQ memory stays constant."
    >
      <header className="flex shrink-0 items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[15px] font-light tracking-tight text-white md:text-base">
            KV-cache memory footprint
          </p>
          <p className="mt-0.5 text-[12px] font-light text-white/40 md:text-[13px]">
            Grows with context, or stays fixed
          </p>
        </div>
        <p className="shrink-0 pb-0.5 text-[11px] font-light uppercase tracking-[0.16em] text-white/30">
          Context length →
        </p>
      </header>

      <div className="relative mt-2.5 min-h-0 flex-1 overflow-hidden px-2.5 py-2 md:px-3 md:py-2.5">
        <div className="absolute inset-2">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="size-full"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden
          >
            {[y0, y75, yMid, y25, y1].map((y) => (
              <line
                key={y}
                x1={x0}
                y1={y}
                x2={x1}
                y2={y}
                stroke="rgba(255,255,255,0.1)"
              />
            ))}
            {TS.map((t) => (
              <line
                key={t}
                x1={xAt(t)}
                y1={y0}
                x2={xAt(t)}
                y2={y1}
                stroke="rgba(255,255,255,0.05)"
              />
            ))}
            <line
              x1={x0}
              y1={y1}
              x2={x1}
              y2={y1}
              stroke="rgba(255,255,255,0.28)"
            />
            <line
              x1={x0}
              y1={y0}
              x2={x0}
              y2={y1}
              stroke="rgba(255,255,255,0.28)"
            />

            <rect
              x={x0}
              y={yConst}
              width={PLOT.w}
              height={y1 - yConst}
              fill="rgba(143,85,251,0.16)"
            />
            <line
              x1={x0}
              y1={yConst}
              x2={x1}
              y2={yConst}
              stroke="#c4b5fd"
              strokeWidth="2.4"
              strokeLinecap="round"
            />

            {HEIGHTS.map((h, i) => {
              const x = xAt(TS[i]) - COL_W / 2;
              const y = yAt(h);
              return (
                <rect
                  key={TS[i]}
                  x={x}
                  y={y}
                  width={COL_W}
                  height={y1 - y}
                  rx="7"
                  fill={FILLS[i]}
                />
              );
            })}
          </svg>

          <span
            className="pointer-events-none absolute text-[12px] font-light text-[#fca5a5] md:text-[13px]"
            style={{
              left: `${(lastX / W) * 100}%`,
              top: `${(lastY / H) * 100}%`,
              transform: "translate(-10px, -120%)",
            }}
          >
            grows
          </span>
          <span
            className="pointer-events-none absolute text-[12px] font-light text-[#c4b5fd] md:text-[13px]"
            style={{
              right: 0,
              top: `${(yConst / H) * 100}%`,
              transform: "translate(0, -130%)",
            }}
          >
            constant
          </span>
        </div>
      </div>

      <ul className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1.5 text-[12px] font-light text-white/60 md:text-[13px]">
        <li className="inline-flex items-center gap-2">
          <span aria-hidden className="size-2 rounded-full bg-[#f87171]" />
          Standard AI memory
          <span className="text-white/40">· grows</span>
        </li>
        <li className="inline-flex items-center gap-2">
          <span aria-hidden className="size-2 rounded-full bg-[#8f55fb]" />
          Field-IQ memory
          <span className="text-white/40">· constant</span>
        </li>
      </ul>
    </article>
  );
}
