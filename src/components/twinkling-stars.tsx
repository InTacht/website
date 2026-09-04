/** Fixed star field — top sky only, no randomness (SSR-safe). */
const TWINKLE_SCALE = 1.65;

const STARS = [
  { l: 4, t: 3, s: 2, d: 0, dur: 2.8 },
  { l: 8, t: 7, s: 2.5, d: 0.6, dur: 3.2 },
  { l: 14, t: 2, s: 1.5, d: 1.2, dur: 2.4 },
  { l: 19, t: 10, s: 3, d: 0.3, dur: 3.6 },
  { l: 26, t: 5, s: 2, d: 1.8, dur: 2.6 },
  { l: 33, t: 13, s: 1.5, d: 0.9, dur: 3.1 },
  { l: 40, t: 4, s: 2.5, d: 2.1, dur: 2.9 },
  { l: 47, t: 9, s: 2, d: 0.4, dur: 3.4 },
  { l: 54, t: 1, s: 1.5, d: 1.5, dur: 2.2 },
  { l: 61, t: 12, s: 2.5, d: 0.7, dur: 3.0 },
  { l: 68, t: 6, s: 2, d: 2.4, dur: 2.7 },
  { l: 75, t: 10, s: 1.5, d: 1.1, dur: 3.3 },
  { l: 82, t: 3, s: 3, d: 0.2, dur: 3.5 },
  { l: 89, t: 11, s: 2, d: 1.7, dur: 2.5 },
  { l: 95, t: 6, s: 2.5, d: 2.3, dur: 3.0 },
  { l: 6, t: 16, s: 1.5, d: 2.0, dur: 3.0 },
  { l: 12, t: 20, s: 2.5, d: 0.5, dur: 2.8 },
  { l: 20, t: 15, s: 2, d: 1.3, dur: 3.2 },
  { l: 27, t: 22, s: 1.5, d: 2.6, dur: 2.4 },
  { l: 34, t: 17, s: 2.5, d: 0.8, dur: 3.1 },
  { l: 41, t: 24, s: 2, d: 1.9, dur: 2.6 },
  { l: 48, t: 15, s: 1.5, d: 0.1, dur: 3.4 },
  { l: 55, t: 21, s: 3, d: 1.4, dur: 2.9 },
  { l: 62, t: 18, s: 2, d: 2.2, dur: 3.0 },
  { l: 69, t: 26, s: 1.5, d: 0.6, dur: 2.3 },
  { l: 76, t: 16, s: 2.5, d: 1.6, dur: 3.3 },
  { l: 83, t: 23, s: 2, d: 2.8, dur: 2.7 },
  { l: 90, t: 19, s: 1.5, d: 0.9, dur: 3.1 },
  { l: 2, t: 30, s: 2, d: 1.0, dur: 2.8 },
  { l: 10, t: 33, s: 1.5, d: 2.3, dur: 3.2 },
  { l: 17, t: 28, s: 2.5, d: 0.4, dur: 2.5 },
  { l: 24, t: 36, s: 2, d: 1.8, dur: 3.0 },
  { l: 31, t: 31, s: 1.5, d: 2.5, dur: 2.6 },
  { l: 38, t: 34, s: 2.5, d: 0.7, dur: 3.4 },
  { l: 45, t: 29, s: 2, d: 1.2, dur: 2.9 },
  { l: 52, t: 37, s: 1.5, d: 2.1, dur: 3.1 },
  { l: 59, t: 32, s: 3, d: 0.3, dur: 2.4 },
  { l: 66, t: 35, s: 2, d: 1.5, dur: 3.3 },
  { l: 73, t: 30, s: 1.5, d: 2.7, dur: 2.8 },
  { l: 80, t: 38, s: 2.5, d: 0.8, dur: 3.0 },
  { l: 87, t: 33, s: 2, d: 1.9, dur: 2.7 },
  { l: 94, t: 27, s: 1.5, d: 2.4, dur: 3.2 },
  { l: 1, t: 40, s: 2, d: 0.2, dur: 2.6 },
  { l: 9, t: 43, s: 2.5, d: 1.7, dur: 3.1 },
  { l: 16, t: 39, s: 1.5, d: 2.9, dur: 2.5 },
  { l: 44, t: 42, s: 2, d: 1.1, dur: 3.0 },
  { l: 51, t: 40, s: 1.5, d: 2.0, dur: 2.8 },
  { l: 86, t: 41, s: 2.5, d: 0.5, dur: 3.4 },
  { l: 5, t: 8, s: 2, d: 1.4, dur: 2.9 },
  { l: 22, t: 8, s: 1.5, d: 0.6, dur: 3.3 },
  { l: 37, t: 8, s: 2.5, d: 2.2, dur: 2.7 },
  { l: 58, t: 7, s: 2, d: 1.0, dur: 3.1 },
  { l: 72, t: 9, s: 1.5, d: 2.5, dur: 2.4 },
  { l: 91, t: 8, s: 2.5, d: 0.3, dur: 3.5 },
  { l: 3, t: 14, s: 2, d: 1.6, dur: 2.8 },
  { l: 16, t: 12, s: 1.5, d: 2.1, dur: 3.0 },
  { l: 30, t: 14, s: 2.5, d: 0.9, dur: 2.6 },
  { l: 44, t: 13, s: 2, d: 1.8, dur: 3.2 },
  { l: 57, t: 15, s: 1.5, d: 2.4, dur: 2.5 },
  { l: 71, t: 13, s: 2.5, d: 0.4, dur: 3.4 },
  { l: 84, t: 14, s: 2, d: 1.3, dur: 2.9 },
  { l: 97, t: 15, s: 1.5, d: 2.7, dur: 3.1 },
  { l: 7, t: 25, s: 2, d: 0.7, dur: 2.8 },
  { l: 15, t: 27, s: 1.5, d: 1.5, dur: 3.3 },
  { l: 23, t: 25, s: 2.5, d: 2.0, dur: 2.4 },
  { l: 36, t: 26, s: 2, d: 0.2, dur: 3.0 },
  { l: 49, t: 25, s: 1.5, d: 1.9, dur: 2.7 },
  { l: 63, t: 27, s: 2.5, d: 0.8, dur: 3.2 },
  { l: 77, t: 26, s: 2, d: 2.3, dur: 2.6 },
  { l: 92, t: 25, s: 1.5, d: 1.2, dur: 3.4 },
  { l: 11, t: 37, s: 2, d: 2.6, dur: 2.9 },
  { l: 28, t: 39, s: 1.5, d: 0.5, dur: 3.1 },
  { l: 42, t: 38, s: 2.5, d: 1.7, dur: 2.5 },
  { l: 56, t: 36, s: 2, d: 2.2, dur: 3.0 },
  { l: 70, t: 39, s: 1.5, d: 0.6, dur: 2.8 },
  { l: 85, t: 37, s: 2.5, d: 1.4, dur: 3.3 },
  { l: 98, t: 38, s: 2, d: 2.8, dur: 2.7 },
] as const;

export function TwinklingStars() {
  return (
    <div
      className="twinkling-stars absolute inset-x-0 top-0 h-[52%]"
      aria-hidden
    >
      {STARS.map((star, i) => (
        <span
          key={i}
          className="twinkle-star absolute rounded-full bg-white"
          style={{
            left: `${star.l}%`,
            top: `${star.t}%`,
            width: star.s,
            height: star.s,
            animationDelay: `${star.d * TWINKLE_SCALE}s`,
            animationDuration: `${star.dur * TWINKLE_SCALE}s`,
          }}
        />
      ))}
    </div>
  );
}
