export const W = 560;
export const H = 216;
export const COLS = 28;
export const ROWS = 9;
export const AREA = { x: 28, y: 32, w: 504, h: 148 };

export const SOURCES = [
  { c: 5, r: 4, mark: "the" },
  { c: 14, r: 4, mark: "cat" },
  { c: 22, r: 4, mark: "sat" },
] as const;

export type Source = (typeof SOURCES)[number];

export function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

/** Stable SVG numbers so Node SSR and the browser hydrate identically. */
export function svgNum(n: number, digits = 3) {
  const p = 10 ** digits;
  return Math.round(n * p) / p;
}

export function dotPoint(c: number, r: number) {
  return {
    x: svgNum(AREA.x + (c / (COLS - 1)) * AREA.w),
    y: svgNum(AREA.y + (r / (ROWS - 1)) * AREA.h),
  };
}

export function sourcePoint(source: Source) {
  return dotPoint(source.c, source.r);
}

export type FieldDot = {
  c: number;
  r: number;
  x: number;
  y: number;
  v: number;
};

export function buildDots(
  spread: number,
  t: number,
  wave: boolean,
  boostX: number | null,
  visibleMarks: ReadonlySet<string> | null,
) {
  const dots: FieldDot[] = [];
  for (let r = 0; r < ROWS; r += 1) {
    for (let c = 0; c < COLS; c += 1) {
      let value = 0;
      const along = 1.6 + spread * 9.4;
      const sources = visibleMarks
        ? SOURCES.filter((src) => visibleMarks.has(src.mark))
        : SOURCES;
      for (const src of sources) {
        const dc = c - src.c;
        const dr = r - src.r;
        const channel = Math.exp(-(dr * dr) / 5.4);
        const packet = Math.exp(-(dc * dc) / (2 * along * along));
        let signal = channel * packet;
        if (wave) {
          signal *= 0.52 + 0.48 * (0.5 + 0.5 * Math.sin(0.58 * dc - 1.6 * t));
        }
        value += signal;
      }
      const point = dotPoint(c, r);
      value = clamp01(value);
      if (boostX !== null) {
        const dx = (point.x - boostX) / 16;
        const proximity = Math.exp(-(dx * dx));
        value = clamp01(value * (1 + 0.55 * proximity) + 0.08 * proximity);
      }
      dots.push({ c, r, x: point.x, y: point.y, v: svgNum(value, 4) });
    }
  }
  return dots;
}

export function bloomRadii(spread: number) {
  return {
    rx: svgNum(22 + spread * 86),
    ry: svgNum(16 + spread * 22),
  };
}

export function lerp(a: number, b: number, u: number) {
  return a + (b - a) * u;
}

export function easeOutCubic(u: number) {
  const t = clamp01(u);
  return 1 - (1 - t) ** 3;
}

export function gravity(u: number) {
  const t = clamp01(u);
  return t * t;
}

export function colX(c: number) {
  return svgNum(AREA.x + (c / (COLS - 1)) * AREA.w);
}

export function wavePath(sourceX: number, sourceY: number, t: number, dir: 1 | -1) {
  const length = 158;
  const steps = 20;
  let d = `M${sourceX.toFixed(1)} ${sourceY.toFixed(1)}`;
  for (let i = 1; i <= steps; i += 1) {
    const u = i / steps;
    const x = sourceX + dir * length * u;
    const y = sourceY + Math.sin(u * 6.4 - t * 2.05) * 10 * (1 - u * 0.4);
    d += `L${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}

export function listenPath(x: number, t: number) {
  const top = AREA.y + 10;
  const height = AREA.h - 20;
  const steps = 24;
  let d = "";
  for (let i = 0; i <= steps; i += 1) {
    const u = i / steps;
    const envelope = Math.sin(u * Math.PI);
    const px = x + Math.sin(u * 9.4 - t * 2.55) * 6.4 * (0.28 + 0.72 * envelope);
    const py = top + u * height;
    d += `${i === 0 ? "M" : "L"}${px.toFixed(1)} ${py.toFixed(1)}`;
  }
  return d;
}

export function dropPath(x: number, yTarget: number, t: number, dir: 1 | -1) {
  const y0 = 28;
  const steps = 20;
  let d = "";
  for (let i = 0; i <= steps; i += 1) {
    const u = i / steps;
    const funnel = (1 - u) * (1 - u);
    const px = x + dir * Math.sin(u * 7.1 - t * 2.15) * 20 * funnel;
    const py = y0 + (yTarget - y0) * u;
    d += `${i === 0 ? "M" : "L"}${px.toFixed(1)} ${py.toFixed(1)}`;
  }
  return d;
}

export function dropPacket(x: number, yTarget: number, t: number, u: number) {
  const y0 = 28;
  const funnel = (1 - u) * (1 - u);
  return {
    x: svgNum(x + Math.sin(u * 7.1 - t * 2.15) * 20 * funnel),
    y: svgNum(y0 + (yTarget - y0) * u),
  };
}

export function nearestSource(x: number) {
  let best = SOURCES[0];
  let dist = Number.POSITIVE_INFINITY;
  for (const src of SOURCES) {
    const dx = Math.abs(sourcePoint(src).x - x);
    if (dx < dist) {
      dist = dx;
      best = src;
    }
  }
  return best;
}

export function dropProgress(t: number) {
  const local = t % 1.6;
  const index = Math.floor(t / 1.6) % SOURCES.length;
  const fall = local < 0.85 ? gravity(local / 0.85) : 1;
  return { index, fall };
}
