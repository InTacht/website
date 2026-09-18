import { ThesisShell } from "@/components/iota/thesis-shell";
import { ThesisView } from "@/components/iota/thesis-view";

export const metadata = {
  title: "The IOTA Thesis — InTacht",
  description:
    "Intelligence is a system, not a single model. Cortex knows. Experts reason. The router decides.",
};

export default function IotaThesisPage() {
  return (
    <ThesisShell>
      <ThesisView />
    </ThesisShell>
  );
}
