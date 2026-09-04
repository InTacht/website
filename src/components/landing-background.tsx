import Image from "next/image";
import { TwinklingStars } from "@/components/twinkling-stars";

export function LandingBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0">
        <div className="relative h-full w-full -scale-y-100 rotate-180">
          <Image
            src="/landing-bg.png"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      </div>

      <TwinklingStars />
      <div className="absolute inset-0 bg-black/20" />
      {/* Soft blend into the black scroll section below */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-black/55 to-black md:h-52 lg:h-64" />
    </div>
  );
}
