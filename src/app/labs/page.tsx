import { LabsNotebook } from "@/components/labs/labs-notebook";

export const metadata = {
  title: "Labs — InTacht",
  description: "InTacht lab notebook and working notes.",
};

export default function LabsPage() {
  return (
    <main className="pt-14">
      <LabsNotebook />
    </main>
  );
}
