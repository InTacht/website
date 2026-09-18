export const TW = 560;
export const TH = 220;

export function svgNum(n: number, digits = 3) {
  const p = 10 ** digits;
  return Math.round(n * p) / p;
}

/** Clock values must stay finite and non-negative for diagram motion. */
export function safeTime(time: number) {
  return Number.isFinite(time) && time >= 0 ? time : 0;
}

/** Safe modular index into a fixed node list. */
export function clampIndex(i: number, n: number) {
  if (!Number.isFinite(i) || n <= 0) return 0;
  return ((Math.trunc(i) % n) + n) % n;
}

export function easeInOut(u: number) {
  const t = Math.min(1, Math.max(0, u));
  return t * t * (3 - 2 * t);
}

export function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function cubeFaces(x: number, y: number, s: number) {
  const dx = s * 0.72;
  const dy = s * 0.42;
  const h = s * 0.78;
  return {
    top: `${x},${y} ${x + dx},${y + dy} ${x},${y + dy * 2} ${x - dx},${y + dy}`,
    left: `${x - dx},${y + dy} ${x},${y + dy * 2} ${x},${y + dy * 2 + h} ${x - dx},${y + dy + h}`,
    right: `${x + dx},${y + dy} ${x},${y + dy * 2} ${x},${y + dy * 2 + h} ${x + dx},${y + dy + h}`,
  };
}
