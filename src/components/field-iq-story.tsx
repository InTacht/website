import Image from "next/image";
import { Act1Problem } from "@/components/sections/act1-problem";
import { Act2Solution } from "@/components/sections/act2-solution";
import { Act3Mechanics } from "@/components/sections/act3-mechanics";
import { Act4EngineRoom } from "@/components/sections/act4-engine-room";
import { Act5Impact } from "@/components/sections/act5-impact";
import { Act6Footer } from "@/components/sections/act6-footer";

/**
 * Field-IQ story.
 * Meadow sticks for the full scroll. Scrim is on the sticky plate (viewport-locked),
 * not on each section — section-local scrims caused meadow flashes at every boundary.
 */
export function FieldIqStory() {
  return (
    <div className="relative text-white">
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
        {/* Always black in the upper viewport, clear near the bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black from-[0%] via-black via-[42%] to-transparent to-[78%]" />
      </div>

      <div className="relative z-10 -mt-[100svh]">
        <Act1Problem />
        <Act2Solution />
        <Act3Mechanics />
        <Act4EngineRoom />
        <Act5Impact />
        <Act6Footer />
      </div>
    </div>
  );
}
