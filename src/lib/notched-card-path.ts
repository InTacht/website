/**
 * Compact funnel notch. Corner arcs match the wall angle so lips and
 * floor join the taper with continuous tangents, not 90-degree kinks.
 */

export type NotchMode = "notch" | "rect";

export type NotchedCardLayout = {
  path: string;
  width: number;
  height: number;
  radius: number;
  scoop: number;
  notchWidth: number;
  notchHeight: number;
  tabOffsetY: number;
  padTop: number;
  mode: NotchMode;
};

const OUTER = 24;
const NOTCH_R = 8;
const PAD_X = 8;
const PAD_Y = 3;
const FLARE = 16;
const CONTENT_GAP = 20;

const f = (n: number) => Math.round(n * 100) / 100;

function roundRectPath(w: number, h: number, r: number) {
  const R = Math.min(r, w / 2, h / 2);
  return [
    `M ${f(R)} 0`,
    `H ${f(w - R)}`,
    `A ${f(R)} ${f(R)} 0 0 1 ${f(w)} ${f(R)}`,
    `V ${f(h - R)}`,
    `A ${f(R)} ${f(R)} 0 0 1 ${f(w - R)} ${f(h)}`,
    `H ${f(R)}`,
    `A ${f(R)} ${f(R)} 0 0 1 0 ${f(h - R)}`,
    `V ${f(R)}`,
    `A ${f(R)} ${f(R)} 0 0 1 ${f(R)} 0`,
    "Z",
  ].join(" ");
}

function closeCard(w: number, h: number, R: number) {
  return [
    `H ${f(w - R)}`,
    `A ${f(R)} ${f(R)} 0 0 1 ${f(w)} ${f(R)}`,
    `V ${f(h - R)}`,
    `A ${f(R)} ${f(R)} 0 0 1 ${f(w - R)} ${f(h)}`,
    `H ${f(R)}`,
    `A ${f(R)} ${f(R)} 0 0 1 0 ${f(h - R)}`,
    `V ${f(R)}`,
    `A ${f(R)} ${f(R)} 0 0 1 ${f(R)} 0`,
    "Z",
  ].join(" ");
}

function funnelNotchPath(
  w: number,
  h: number,
  R: number,
  S: number,
  floorL: number,
  floorR: number,
  flare: number,
  NH: number,
) {
  const mouthL = floorL - flare;
  const mouthR = floorR + flare;
  const wallLen = Math.hypot(flare, NH);
  const wx = flare / wallLen;
  const wy = NH / wallLen;
  const turn = Math.atan2(wy, wx);
  const T = S * Math.tan(turn / 2);

  return [
    `M ${f(R)} 0`,
    `H ${f(mouthL - T)}`,
    `A ${f(S)} ${f(S)} 0 0 1 ${f(mouthL + wx * T)} ${f(wy * T)}`,
    `L ${f(floorL - wx * T)} ${f(NH - wy * T)}`,
    `A ${f(S)} ${f(S)} 0 0 0 ${f(floorL + T)} ${f(NH)}`,
    `H ${f(floorR - T)}`,
    `A ${f(S)} ${f(S)} 0 0 0 ${f(floorR + wx * T)} ${f(NH - wy * T)}`,
    `L ${f(mouthR - wx * T)} ${f(wy * T)}`,
    `A ${f(S)} ${f(S)} 0 0 1 ${f(mouthR + T)} 0`,
    closeCard(w, h, R),
  ].join(" ");
}

export function layoutNotchedCard({
  width: w,
  height: h,
  tabWidth,
  tabHeight,
}: {
  width: number;
  height: number;
  tabWidth: number;
  tabHeight: number;
}): NotchedCardLayout {
  const empty = {
    path: "",
    width: w,
    height: h,
    radius: OUTER,
    scoop: 0,
    notchWidth: 0,
    notchHeight: 0,
    tabOffsetY: 0,
    padTop: tabHeight + CONTENT_GAP,
    mode: "rect" as const,
  };

  if (w < 64 || h < 64 || tabWidth < 32 || tabHeight < 20) {
    return { ...empty, path: roundRectPath(w, h, OUTER), padTop: 24 };
  }

  const notchWidth = tabWidth + PAD_X * 2;
  const notchHeight = tabHeight + PAD_Y * 2;
  const floorL = (w - notchWidth) / 2;
  const floorR = floorL + notchWidth;
  const R = Math.min(OUTER, h / 2, Math.max(12, floorL * 0.45));
  const flare = Math.min(FLARE, Math.max(0, floorL - R - NOTCH_R - 8));
  const wallLen = Math.hypot(flare, notchHeight);
  const turn = Math.atan2(notchHeight, flare);
  const maxS = Math.min(
    NOTCH_R,
    (notchHeight - 6) / 2,
    (wallLen - 4) / (2 * Math.tan(turn / 2) || 1),
    (notchWidth - 8) / 2,
  );
  const S = Math.max(0, maxS);

  if (S >= 6 && flare >= 8 && wallLen > 2 * S * Math.tan(turn / 2) + 4) {
    return {
      path: funnelNotchPath(w, h, R, S, floorL, floorR, flare, notchHeight),
      width: w,
      height: h,
      radius: R,
      scoop: S,
      notchWidth,
      notchHeight,
      tabOffsetY: PAD_Y,
      padTop: notchHeight + CONTENT_GAP,
      mode: "notch",
    };
  }

  return {
    ...empty,
    path: roundRectPath(w, h, R),
    radius: R,
    tabOffsetY: 10,
    padTop: tabHeight + 28,
  };
}

export function maskImageForPath(path: string, width: number, height: number) {
  if (!path || width < 1 || height < 1) return undefined;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><path fill="white" d="${path}"/></svg>`;
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
}
