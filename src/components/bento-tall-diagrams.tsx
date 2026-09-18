"use client";

import { useEffect, useState } from "react";
import type { Project } from "@/lib/projects";

const VW = 200;
const VH = 320;

function hexAlpha(hex: string, alpha: number) {
  const n = hex.replace("#", "");
  const r = parseInt(n.slice(0, 2), 16);
  const g = parseInt(n.slice(2, 4), 16);
  const b = parseInt(n.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function ease(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

type Pt = { x: number; y: number };

function boxEdge(from: Pt, toward: Pt, hw: number, hh: number): Pt {
  const dx = toward.x - from.x;
  const dy = toward.y - from.y;
  if (dx === 0 && dy === 0) return from;
  const hitX = Math.abs(dx) < 1e-6 ? Number.POSITIVE_INFINITY : hw / Math.abs(dx);
  const hitY = Math.abs(dy) < 1e-6 ? Number.POSITIVE_INFINITY : hh / Math.abs(dy);
  const t = Math.min(hitX, hitY);
  return { x: from.x + dx * t, y: from.y + dy * t };
}

function circleEdge(from: Pt, toward: Pt, r: number): Pt {
  const dx = toward.x - from.x;
  const dy = toward.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  return { x: from.x + (dx / len) * r, y: from.y + (dy / len) * r };
}

function growLine(from: Pt, to: Pt, t: number) {
  const p = Math.min(1, Math.max(0, t));
  return {
    x1: from.x,
    y1: from.y,
    x2: from.x + (to.x - from.x) * p,
    y2: from.y + (to.y - from.y) * p,
  };
}

function along(
  points: readonly { u: number; x: number; y: number }[],
  u: number,
) {
  const t = Math.min(1, Math.max(0, u));
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    if (t <= b.u) {
      const p = ease((t - a.u) / (b.u - a.u || 1));
      return { x: a.x + (b.x - a.x) * p, y: a.y + (b.y - a.y) * p };
    }
  }
  return points[points.length - 1];
}

function useTallClock() {
  const [t, setT] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(motion.matches);
    apply();
    motion.addEventListener("change", apply);
    if (motion.matches) return () => motion.removeEventListener("change", apply);

    const start = performance.now();
    let frame = 0;
    let last = 0;
    const tick = (now: number) => {
      if (now - last >= 32) {
        last = now;
        setT((now - start) / 1000);
      }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(frame);
      motion.removeEventListener("change", apply);
    };
  }, []);

  return { t, reduce };
}

const WHITE = "#FFFFFF";
const WHITE_IDLE = "rgba(255,255,255,0.78)";
const WHITE_HAIR = "rgba(255,255,255,0.5)";

function Label({
  x,
  y,
  children,
  on = false,
  anchor = "start",
  size = 8,
  tight = false,
}: {
  x: number;
  y: number;
  children: string;
  on?: boolean;
  anchor?: "start" | "middle" | "end";
  size?: number;
  tight?: boolean;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fill={on ? WHITE : WHITE_IDLE}
      fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
      fontSize={size}
      fontWeight={on ? 600 : 500}
      {...(tight ? {} : { letterSpacing: 0.64 })}
    >
      {children.toUpperCase()}
    </text>
  );
}

function Plate({
  x,
  y,
  w,
  h,
  color,
  on = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  on?: boolean;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={11}
      fill={on ? hexAlpha(color, 0.42) : "rgba(255,255,255,0.08)"}
      stroke={on ? color : WHITE_IDLE}
      strokeWidth={on ? 0.8 : 0.65}
    />
  );
}

function Row({
  x,
  y,
  w,
  color,
  on = false,
}: {
  x: number;
  y: number;
  w: number;
  color: string;
  on?: boolean;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={10}
      rx={4}
      fill={on ? color : WHITE_HAIR}
    />
  );
}

const IOTA_EXPERTS = [
  { x: 48, label: "fast" },
  { x: 100, label: "sql" },
  { x: 152, label: "capable" },
] as const;

function IotaDiagram({ color, u, pick }: { color: string; u: number; pick: number }) {
  const expert = IOTA_EXPERTS[((pick % 3) + 3) % 3];
  const token = along(
    [
      { u: 0, x: 56, y: 72 },
      { u: 0.2, x: 56, y: 72 },
      { u: 0.38, x: expert.x, y: 156 },
      { u: 0.56, x: expert.x, y: 156 },
      { u: 0.7, x: 100, y: 216 },
      { u: 0.86, x: 100, y: 270 },
      { u: 1, x: 100, y: 270 },
    ],
    u,
  );
  const cortexOn = u < 0.4;
  const expertsOn = u >= 0.32 && u < 0.66;
  const routerOn = u >= 0.6;
  const keptOn = u >= 0.88;
  const read = cortexOn ? Math.floor(u * 10) % 2 : -1;

  return (
    <g>
      <Label x={24} y={28} on={cortexOn}>
        Cortex
      </Label>
      <Label x={176} y={28} on={cortexOn} anchor="end" size={7.5} tight>
        IQ01
      </Label>
      <Plate x={22} y={36} w={156} h={78} color={color} on={cortexOn} />
      <Label x={32} y={52} on={cortexOn} size={7}>
        parent
      </Label>
      <Row x={32} y={58} w={64} color={color} on={read === 0} />
      <Row x={32} y={74} w={64} color={color} on={read === 1} />
      <Label x={108} y={52} size={7}>
        session
      </Label>
      <Row x={108} y={58} w={58} color={color} on={false} />
      <Row x={108} y={74} w={40} color={color} on={false} />
      <Label x={108} y={100} size={7}>
        expires
      </Label>

      <line
        x1="100"
        y1="114"
        x2="100"
        y2="138"
        stroke={cortexOn || expertsOn ? color : WHITE_HAIR}
        strokeWidth="0.7"
      />

      <Label x={24} y={136} on={expertsOn}>
        Experts
      </Label>
      {IOTA_EXPERTS.map((node, i) => {
        const hot = (expertsOn || routerOn) && i === pick;
        const expert = { x: node.x, y: 156 };
        const gate = { x: 100, y: 218 };
        const from = circleEdge(expert, gate, hot ? 11 : 7.5);
        const to = boxEdge(gate, expert, 46, 14);
        return (
          <g key={node.label}>
            <line
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={hot ? color : WHITE_HAIR}
              strokeWidth={hot ? 0.9 : 0.65}
            />
            <circle
              cx={node.x}
              cy="156"
              r={hot ? 11 : 7.5}
              fill={hot ? color : "rgba(255,255,255,0.16)"}
              stroke={hot ? WHITE : WHITE_IDLE}
              strokeWidth={hot ? 0.8 : 0.65}
            />
            <Label x={node.x} y={176} on={hot} anchor="middle" size={7} tight>
              {node.label}
            </Label>
          </g>
        );
      })}

      <Label x={24} y={198} on={routerOn}>
        Router
      </Label>
      <Plate x={54} y={204} w={92} h={28} color={color} on={routerOn} />
      <Label x={100} y={222} on={routerOn} anchor="middle" size={7.5}>
        evidence
      </Label>

      <line
        x1="100"
        y1="232"
        x2="100"
        y2="250"
        stroke={routerOn ? color : WHITE_HAIR}
        strokeWidth="0.75"
      />
      <Plate x={64} y={250} w={72} h={24} color={color} on={routerOn} />
      <Label x={100} y={266} on={routerOn} anchor="middle" size={7.5}>
        result
      </Label>

      <path
        d="M136 262 C172 248 176 96 100 88"
        fill="none"
        stroke={keptOn ? color : WHITE_HAIR}
        strokeWidth="0.7"
        strokeDasharray="3 4"
      />
      {keptOn ? (
        <Label x={176} y={124} on anchor="end" size={7}>
          kept
        </Label>
      ) : null}

      <circle cx={token.x} cy={token.y} r="5" fill={WHITE} stroke={color} strokeWidth="0.7" />
    </g>
  );
}

const XQUA_IDLE = [
  { x: 36, y: 78, kind: "gpu" },
  { x: 148, y: 70, kind: "cpu" },
  { x: 42, y: 168, kind: "gpu" },
  { x: 154, y: 158, kind: "cpu" },
  { x: 40, y: 248, kind: "gpu" },
  { x: 150, y: 240, kind: "cpu" },
] as const;

const XQUA_HOME = [
  { x: 100, y: 108 },
  { x: 154, y: 140 },
  { x: 154, y: 196 },
  { x: 100, y: 228 },
  { x: 46, y: 196 },
  { x: 46, y: 140 },
] as const;

const XQUA_JOIN = [
  { x: 24, y: 86, kind: "gpu" },
  { x: 176, y: 86, kind: "cpu" },
  { x: 24, y: 250, kind: "gpu" },
  { x: 176, y: 250, kind: "cpu" },
] as const;

const XQUA_CHIP = { hw: 16, hh: 9 } as const;
const XQUA_RIM = { hw: 14, hh: 8 } as const;
const XQUA_FABRIC = { x: 100, y: 168, hw: 24, hh: 14 } as const;

function XquaDiagram({ color, u, t }: { color: string; u: number; t: number }) {
  const pool = u < 0.3;
  const weave = u >= 0.24 && u < 0.68;
  const scale = u >= 0.6;
  const weaveT = ease((u - 0.24) / 0.36);
  const scaleT = ease((u - 0.6) / 0.32);
  const phase = scale ? "Scale" : weave ? "Weave" : "Pool";
  const nodes = XQUA_IDLE.map((idle, i) => {
    const home = XQUA_HOME[i];
    const drift = pool ? Math.sin(t * 1.05 + i * 0.9) * 4 : 0;
    return {
      x: idle.x + (home.x - idle.x) * weaveT + drift,
      y: idle.y + (home.y - idle.y) * weaveT - drift * 0.35,
      kind: idle.kind,
    };
  });

  return (
    <g>
      <Label x={24} y={36} on>
        {phase}
      </Label>
      <Label x={176} y={36} anchor="end" size={7} tight>
        one engine
      </Label>

      {(weave || scale) && weaveT > 0.15
        ? nodes.map((node, i) => {
            const next = nodes[(i + 1) % nodes.length];
            const from = boxEdge(node, next, XQUA_CHIP.hw, XQUA_CHIP.hh);
            const to = boxEdge(next, node, XQUA_CHIP.hw, XQUA_CHIP.hh);
            return (
              <line
                key={`m-${i}`}
                {...growLine(from, to, weaveT)}
                stroke={color}
                strokeWidth="0.7"
                opacity={0.45 + weaveT * 0.55}
              />
            );
          })
        : null}
      {(weave || scale) && weaveT > 0.2
        ? nodes.map((node, i) => {
            const fabric = { x: XQUA_FABRIC.x, y: XQUA_FABRIC.y };
            const from = boxEdge(node, fabric, XQUA_CHIP.hw, XQUA_CHIP.hh);
            const to = boxEdge(fabric, node, XQUA_FABRIC.hw, XQUA_FABRIC.hh);
            return (
              <line
                key={`h-${i}`}
                {...growLine(from, to, weaveT)}
                stroke={color}
                strokeWidth="0.7"
                opacity={0.4 + weaveT * 0.6}
              />
            );
          })
        : null}

      {scale
        ? XQUA_JOIN.map((node, i) => {
            const drawn = Math.min(1, scaleT * 1.3 - i * 0.1);
            if (drawn <= 0) return null;
            const fabric = { x: XQUA_FABRIC.x, y: XQUA_FABRIC.y };
            const from = boxEdge(node, fabric, XQUA_RIM.hw, XQUA_RIM.hh);
            const to = boxEdge(fabric, node, XQUA_FABRIC.hw, XQUA_FABRIC.hh);
            return (
              <line
                key={`j-${i}`}
                {...growLine(from, to, drawn)}
                stroke={color}
                strokeWidth="0.7"
                opacity={0.35 + drawn * 0.65}
              />
            );
          })
        : null}

      {nodes.map((node, i) => (
        <g key={`n-${i}`}>
          <rect
            x={node.x - 16}
            y={node.y - 9}
            width="32"
            height="18"
            rx="6"
            fill={weave || scale ? hexAlpha(color, 0.4) : "rgba(255,255,255,0.12)"}
            stroke={weave || scale ? WHITE : WHITE_IDLE}
            strokeWidth="0.7"
          />
          <Label x={node.x} y={node.y + 3} on={weave || scale} anchor="middle" size={7} tight>
            {node.kind}
          </Label>
        </g>
      ))}

      {scale
        ? XQUA_JOIN.map((node, i) => (
            <g key={`s-${i}`} opacity={scaleT}>
              <rect
                x={node.x - 14}
                y={node.y - 8}
                width="28"
                height="16"
                rx="6"
                fill={hexAlpha(color, 0.38)}
                stroke={WHITE}
                strokeWidth="0.65"
              />
              <Label x={node.x} y={node.y + 3} on anchor="middle" size={7} tight>
                {node.kind}
              </Label>
            </g>
          ))
        : null}

      <Plate x={76} y={154} w={48} h={28} color={color} on={weave || scale} />
      <Label x={100} y={172} on={weave || scale} anchor="middle" size={7} tight>
        fabric
      </Label>
    </g>
  );
}

const IQ_ROWS = [
  { label: "theorem", open: 74, tight: 40 },
  { label: "proof", open: 62, tight: 34 },
  { label: "number", open: 50, tight: 28 },
  { label: "bound", open: 40, tight: 22 },
] as const;

const IQ_BAR_X = 88;
const IQ_ROW_Y = [64, 84, 104, 124] as const;
const IQ_GPU = { x: 100, y: 186 };
const IQ_GPU_HOLD = { x: 100, y: 176 };
const IQ_EDGE = { x: 100, y: 250 };
const IQ_TICKS = [-16, -6, 6, 16] as const;

function IqDiagram({ color, u }: { color: string; u: number }) {
  const measure = u < 0.36;
  const optimize = u >= 0.3 && u < 0.7;
  const publish = u >= 0.64;
  const pack = optimize || publish ? ease((u - 0.3) / 0.28) : 0;
  const lift = publish ? ease((u - 0.64) / 0.22) : 0;
  const phase = publish ? "Publish" : optimize ? "Optimize" : "Measure";
  const read = measure ? Math.min(3, Math.floor((u / 0.36) * 4)) : optimize ? 3 : -1;
  const ends = IQ_ROWS.map((row, i) => ({
    x: IQ_BAR_X + row.open + (row.tight - row.open) * pack,
    y: IQ_ROW_Y[i],
  }));
  const token = along(
    [
      { u: 0, ...ends[0] },
      { u: 0.07, ...ends[0] },
      { u: 0.14, ...ends[1] },
      { u: 0.2, ...ends[1] },
      { u: 0.26, ...ends[2] },
      { u: 0.31, ...ends[2] },
      { u: 0.36, ...ends[3] },
      { u: 0.5, ...IQ_GPU_HOLD },
      { u: 0.64, ...IQ_GPU_HOLD },
      { u: 0.82, ...IQ_EDGE },
      { u: 1, ...IQ_EDGE },
    ],
    u,
  );
  const gpuFrom = boxEdge(IQ_GPU, IQ_EDGE, 36, 20);
  const gpuTo = boxEdge(IQ_EDGE, IQ_GPU, 36, 16);
  const gpuOn = optimize || publish;
  const edgeOn = publish && lift > 0.55;

  return (
    <g>
      <Label x={24} y={28} on tight size={9}>
        {phase}
      </Label>
      <Label x={176} y={28} anchor="end" size={8} tight>
        1M
      </Label>

      <Plate x={22} y={40} w={156} h={102} color={color} on={measure || optimize} />
      {IQ_ROWS.map((row, i) => {
        const hot = read === i;
        const end = ends[i];
        return (
          <g key={row.label}>
            <Label x={34} y={end.y + 3} on={hot} size={8} tight>
              {row.label}
            </Label>
            <line
              x1={IQ_BAR_X}
              y1={end.y}
              x2={end.x}
              y2={end.y}
              stroke={hot ? color : WHITE_HAIR}
              strokeWidth={hot ? 1.05 : 0.75}
              strokeLinecap="round"
            />
          </g>
        );
      })}

      <line
        x1="100"
        y1="142"
        x2="100"
        y2="166"
        stroke={measure || gpuOn ? color : WHITE_HAIR}
        strokeWidth="0.7"
      />

      <Label x={24} y={162} on={gpuOn} tight>
        Gpu
      </Label>
      <Plate x={64} y={166} w={72} h={40} color={color} on={gpuOn} />
      <Label x={100} y={198} on={gpuOn} anchor="middle" size={8} tight>
        consumer
      </Label>
      {pack > 0 && pack < 0.95
        ? IQ_TICKS.map((seed, i) => {
            const x = IQ_GPU.x + seed * (1 - pack);
            return (
              <line
                key={`t-${i}`}
                x1={x - 4}
                y1={IQ_GPU.y}
                x2={x + 4}
                y2={IQ_GPU.y}
                stroke={color}
                strokeWidth="0.75"
                opacity={0.9 * (1 - pack)}
              />
            );
          })
        : null}

      <line
        x1={gpuFrom.x}
        y1={gpuFrom.y}
        x2={gpuTo.x}
        y2={gpuTo.y}
        stroke={edgeOn ? color : WHITE_HAIR}
        strokeWidth="0.7"
        strokeDasharray="3 4"
      />

      <Plate x={64} y={234} w={72} h={32} color={color} on={edgeOn} />
      <Label x={100} y={254} on={edgeOn} anchor="middle" size={8} tight>
        edge
      </Label>

      <circle cx={token.x} cy={token.y} r="5" fill={WHITE} stroke={color} strokeWidth="0.7" />
    </g>
  );
}

export function TallDiagram({ id, color }: { id: Project["id"]; color: string }) {
  const { t, reduce } = useTallClock();
  const cycle = id === "xqua" ? 8 : id === "iq" ? 7.4 : 8.2;
  const u = reduce ? 0.84 : (t % cycle) / cycle;
  const pick = reduce ? 1 : Math.floor(t / cycle) % 3;
  const copy =
    id === "iota"
      ? "Context is held. A specialist reasons. One path is chosen."
      : id === "xqua"
        ? "Idle nodes pool, weave into a fabric, then the mesh grows."
        : "Measure from the ledger, tighten the work, publish to the edge.";

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      className="absolute inset-0 size-full"
      preserveAspectRatio="xMidYMid meet"
      aria-label={copy}
    >
      {id === "iota" ? <IotaDiagram color={color} u={u} pick={pick} /> : null}
      {id === "xqua" ? <XquaDiagram color={color} u={u} t={t} /> : null}
      {id === "iq" ? <IqDiagram color={color} u={u} /> : null}
    </svg>
  );
}
