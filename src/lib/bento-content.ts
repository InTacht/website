import type { Project } from "@/lib/projects";

export type BentoPanelContent = {
  mono: string;
  headline: string;
  body: string;
  chips: string[];
  metric: { value: string; label: string; sub?: string };
  access: string;
  output: string;
  phases: { title: string; detail: string }[];
  highlights: string[];
};

export const bentoPanels: Record<Project["id"], BentoPanelContent> = {
  xqua: {
    mono: "[INFRASTRUCTURE · AQUA]",
    headline: "Open-source shared computing fabric",
    body: "AI demands massive compute. Aqua bypasses centralized server farms by pooling accessible resources into one cohesive, distributed engine for everyone.",
    chips: ["Distributed mesh", "Open-source", "Compute pooling", "Shared fabric"],
    metric: { value: "∞", label: "Scale potential", sub: "Nodes pooled" },
    access: "Open-source framework",
    output: "Shared computing fabric",
    highlights: [
      "Bypass centralized farms",
      "Pool idle GPU & CPU cycles",
      "Unified distributed engine",
    ],
    phases: [
      { title: "Pool", detail: "Aggregate accessible resources across the mesh" },
      { title: "Weave", detail: "Unify nodes into one cohesive compute fabric" },
      { title: "Scale", detail: "Deliver supercomputing power to everyone" },
    ],
  },
  iq: {
    mono: "[RESEARCH · INTECH IQ]",
    headline: "AI-native research on consumer hardware",
    body: "Foundational work—not surface fine-tuning. Engineering cheaper, faster intelligence through algorithmic efficiency on consumer-grade GPUs.",
    chips: ["1M param scale", "Published research", "Efficiency bridge", "Consumer GPUs"],
    metric: { value: "1M", label: "Parameter bound", sub: "Efficiency focus" },
    access: "Internal lab & research",
    output: "Theorems, proofs & models",
    highlights: [
      "Enterprise-grade on edge hardware",
      "Algorithmic efficiency bridge",
      "Actionable measurements at scale",
    ],
    phases: [
      { title: "Measure", detail: "Theorems, proofs & perplexity observations" },
      { title: "Optimize", detail: "Learning rates & tokenizer efficiency" },
      { title: "Publish", detail: "Radically accessible intelligence output" },
    ],
  },
  iota: {
    mono: "[APPLICATION · IOTA]",
    headline: "Generalized self-learning intelligence",
    body: "Not a static model—a platform for autonomous, continuous improvement through constant feedback loops across the full Intech ecosystem.",
    chips: ["Feedback loops", "Autonomous training", "Self-correction", "Live deployment"],
    metric: { value: "24/7", label: "Learning cycle", sub: "Always improving" },
    access: "Platform application",
    output: "Self-learning harness",
    highlights: [
      "Autonomous continuous training",
      "Real-time measurement & output",
      "Self-correction feedback loops",
    ],
    phases: [
      { title: "Train", detail: "Autonomous training on live signals" },
      { title: "Measure", detail: "Capture output, metrics & performance" },
      { title: "Correct", detail: "Close the loop with self-correction" },
    ],
  },
};
