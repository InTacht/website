import { FieldIqStory } from "@/components/field-iq-story";
import { LandingView } from "@/components/landing-view";
import { SmoothScroll } from "@/components/ui/smooth-scroll";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative">
        <LandingView />
        <FieldIqStory />
      </main>
    </SmoothScroll>
  );
}
