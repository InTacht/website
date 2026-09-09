import { Act1Problem } from "@/components/sections/act1-problem";
import { Act2Solution } from "@/components/sections/act2-solution";
import { Act3Mechanics } from "@/components/sections/act3-mechanics";
import { Act4EngineRoom } from "@/components/sections/act4-engine-room";
import { Act5Impact } from "@/components/sections/act5-impact";
import { Act6Footer } from "@/components/sections/act6-footer";
import { StoryMeadowFrame } from "@/components/story-meadow";

/**
 * Field-IQ story.
 * Meadow sticks for the full scroll. Scrim is on the sticky plate (viewport-locked),
 * not on each section — section-local scrims caused meadow flashes at every boundary.
 */
export function FieldIqStory() {
  return (
    <StoryMeadowFrame>
      <Act1Problem />
      <Act2Solution />
      <Act3Mechanics />
      <Act4EngineRoom />
      <Act5Impact />
      <Act6Footer />
    </StoryMeadowFrame>
  );
}
