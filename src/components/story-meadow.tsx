import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Viewport-locked meadow plate. Shared by the Field-IQ story and the research hub
 * so the two surfaces cannot drift.
 */
export function StoryMeadowPlate() {
  return (
    <div
      className="pointer-events-none sticky top-0 z-0 h-svh overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-x-0 bottom-0 h-[min(70vh,780px)]">
        <Image
          src="/story-bg-4.jpg"
          alt=""
          fill
          className="object-cover object-bottom"
          sizes="100vw"
          priority={false}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black from-[0%] via-black via-[42%] to-transparent to-[78%]" />
    </div>
  );
}

export function StoryMeadowFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative text-white">
      <StoryMeadowPlate />
      <div className="relative z-10 -mt-[100svh]">{children}</div>
    </div>
  );
}
