"use client";

import { useId } from "react";

type Node = { x: number; y: number; r: number; delay: string; hot?: boolean };
type Edge = { a: number; b: number; delay: string };

/** Earlier organic attention field — preferred over the rigid 4×4 lattice. */
const NODES: Node[] = [
  { x: 248, y: 52, r: 2.2, delay: "0s" },
  { x: 312, y: 78, r: 2.6, delay: "0.4s" },
  { x: 378, y: 48, r: 2.0, delay: "0.8s" },
  { x: 442, y: 86, r: 2.4, delay: "1.2s", hot: true },
  { x: 508, y: 58, r: 2.1, delay: "0.2s" },
  { x: 268, y: 128, r: 2.3, delay: "1.0s" },
  { x: 338, y: 148, r: 2.8, delay: "0.6s" },
  { x: 408, y: 132, r: 2.2, delay: "1.4s" },
  { x: 478, y: 158, r: 2.4, delay: "0.3s" },
  { x: 292, y: 188, r: 1.9, delay: "1.1s" },
  { x: 368, y: 198, r: 2.3, delay: "0.7s" },
  { x: 448, y: 186, r: 2.0, delay: "1.5s" },
];

const EDGES: Edge[] = [
  { a: 0, b: 1, delay: "0s" },
  { a: 1, b: 2, delay: "0.35s" },
  { a: 2, b: 3, delay: "0.7s" },
  { a: 3, b: 4, delay: "1.05s" },
  { a: 0, b: 5, delay: "0.2s" },
  { a: 1, b: 5, delay: "0.55s" },
  { a: 1, b: 6, delay: "0.9s" },
  { a: 2, b: 6, delay: "0.15s" },
  { a: 3, b: 6, delay: "0.45s" },
  { a: 3, b: 7, delay: "0.8s" },
  { a: 4, b: 7, delay: "1.15s" },
  { a: 4, b: 8, delay: "0.25s" },
  { a: 5, b: 6, delay: "0.6s" },
  { a: 6, b: 7, delay: "0.95s" },
  { a: 7, b: 8, delay: "1.3s" },
  { a: 5, b: 9, delay: "0.4s" },
  { a: 6, b: 9, delay: "0.75s" },
  { a: 6, b: 10, delay: "1.1s" },
  { a: 7, b: 10, delay: "0.1s" },
  { a: 7, b: 11, delay: "0.5s" },
  { a: 8, b: 11, delay: "0.85s" },
  { a: 9, b: 10, delay: "1.2s" },
  { a: 10, b: 11, delay: "0.3s" },
  { a: 0, b: 2, delay: "1.0s" },
  { a: 1, b: 3, delay: "0.65s" },
  { a: 5, b: 7, delay: "1.4s" },
  { a: 6, b: 8, delay: "0.05s" },
];

/**
 * Act 1 — first graphic.
 * Frontier-model reference plate: glass lockup + living organic network.
 */
export function FrontierModelPlate() {
  const uid = useId().replace(/:/g, "");
  const edgeGrad = `frontier-edge-${uid}`;

  return (
    <article
      aria-label="Kimi / Moonshot frontier model reference"
      className="glass relative aspect-[16/7] overflow-hidden rounded-[1.5rem]"
    >
      <div
        aria-hidden
        className="absolute inset-[1px] rounded-[calc(1.5rem-1px)] bg-[#070708]/90"
      />

      <svg
        aria-hidden
        viewBox="0 0 560 245"
        className="frontier-lattice pointer-events-none absolute inset-0 size-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={edgeGrad} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0" />
            <stop offset="35%" stopColor="#EF4444" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g className="frontier-net-drift">
          {EDGES.map((edge, i) => {
            const from = NODES[edge.a];
            const to = NODES[edge.b];
            return (
              <line
                key={`e-${i}`}
                className="frontier-net-edge"
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                style={{ animationDelay: edge.delay }}
              />
            );
          })}

          {NODES.map((node, i) => (
            <g
              key={`n-${i}`}
              className={node.hot ? "frontier-net-node is-hot" : "frontier-net-node"}
              style={{ animationDelay: node.delay }}
            >
              {node.hot ? (
                <circle
                  className="frontier-net-hot-halo"
                  cx={node.x}
                  cy={node.y}
                  r="8"
                />
              ) : null}
              <circle
                className="frontier-net-node-core"
                cx={node.x}
                cy={node.y}
                r={node.r}
              />
            </g>
          ))}
        </g>

        <rect x="0" y="36" width="2" height="172" fill={`url(#${edgeGrad})`} />
      </svg>

      <div className="relative z-10 flex h-full flex-col justify-between px-6 py-5 md:px-8 md:py-7">
        <div className="flex items-start justify-between gap-4">
          <p className="text-xs font-light uppercase tracking-[0.28em] text-white/40 md:text-[13px]">
            Frontier reference
          </p>
          <p className="shrink-0 text-xs font-light uppercase tracking-[0.22em] text-white/35 md:text-[13px]">
            <span className="text-orange-300/80">~3T</span>
            <span className="text-white/30"> params</span>
          </p>
        </div>

        <div className="pb-0.5">
          <p className="font-display text-[2.35rem] font-normal leading-none tracking-[-0.03em] text-white md:text-[2.85rem]">
            Kimi
          </p>
          <p className="mt-2.5 text-sm font-light uppercase tracking-[0.26em] text-white/45 md:text-base">
            Moonshot AI
          </p>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
      />
    </article>
  );
}
