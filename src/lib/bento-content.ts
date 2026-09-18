import type { Project } from "@/lib/projects";

type BentoChip = {
  label: string;
  note: string;
};

export type BentoPanelContent = {
  mono: string;
  headline: string;
  chips: BentoChip[];
  metric: { value: string; label: string; sub?: string };
  access: string;
  output: string;
  phases: { title: string; detail: string }[];
  outputPoints: string[];
  metricPoints: string[];
};

export const bentoPanels: Record<Project["id"], BentoPanelContent> = {
  xqua: {
    mono: "[INFRASTRUCTURE · AQUA]",
    headline: "Open-source shared computing fabric",
    chips: [
      { label: "Distributed mesh", note: "Pool resources into one engine" },
      { label: "Open-source", note: "Bypass centralized farms" },
      { label: "Compute pooling", note: "Idle GPU and CPU cycles" },
      { label: "Shared fabric", note: "One engine for everyone" },
    ],
    metric: { value: "∞", label: "Scale potential", sub: "Nodes pooled" },
    access: "Open-source framework",
    output: "Shared computing fabric",
    outputPoints: [
      "Pool accessible resources into one engine.",
      "Idle GPU and CPU, not centralized farms.",
      "A shared compute fabric for everyone.",
    ],
    metricPoints: [
      "Pool resources into one engine",
      "Idle GPU and CPU cycles",
      "A fabric, not a central farm",
    ],
    phases: [
      {
        title: "Pool",
        detail: "Idle GPU and CPU cycles become one engine.",
      },
      {
        title: "Weave",
        detail: "Nodes unify into one cohesive compute fabric.",
      },
      {
        title: "Scale",
        detail: "Supercomputing as a shared fabric, not a farm.",
      },
    ],
  },
  iq: {
    mono: "[RESEARCH · INTECH IQ]",
    headline: "AI-native research on consumer hardware",
    chips: [
      { label: "1M param scale", note: "Efficiency bound for the lab" },
      { label: "Publications", note: "Numbers from the ledger" },
      { label: "Efficiency bridge", note: "Algorithmic efficiency" },
      { label: "Consumer GPUs", note: "Enterprise-grade on the edge" },
    ],
    metric: { value: "1M", label: "Parameter bound", sub: "Efficiency focus" },
    access: "Internal lab & research",
    output: "Theorems, proofs & models",
    outputPoints: [
      "Enterprise-grade work on consumer-grade GPUs.",
      "Algorithmic efficiency, not surface fine-tuning.",
      "Published numbers from the ledger, at 1M.",
    ],
    metricPoints: [
      "Efficiency bound for the lab",
      "Numbers from the ledger",
      "Enterprise-grade on the edge",
    ],
    phases: [
      {
        title: "Measure",
        detail: "Theorems, proofs, and numbers from the ledger.",
      },
      {
        title: "Optimize",
        detail: "Algorithmic efficiency on consumer-grade GPUs.",
      },
      {
        title: "Publish",
        detail: "Enterprise-grade work on edge hardware.",
      },
    ],
  },
  iota: {
    mono: "[APPLICATION · IOTA]",
    headline: "Intelligence is a system, not a single model.",
    chips: [
      { label: "Cortex memory", note: "Durable context outside weights" },
      { label: "IQ profiles", note: "One contract, changing internals" },
      { label: "Model experts", note: "Specialists, not one checkpoint" },
      { label: "Adaptive routing", note: "Evidence from the work itself" },
    ],
    metric: {
      value: "IQ01",
      label: "Context, models, and policy",
      sub: "OpenAI-compatible",
    },
    access: "OpenAI-compatible API",
    output: "Governed, context-aware intelligence",
    outputPoints: [
      "Durable context lives outside the model weights.",
      "Evidence routes work between specialist models.",
      "Confirmed outcomes become specific intelligence.",
    ],
    metricPoints: [
      "Durable context outside weights",
      "Specialists, not one checkpoint",
      "One contract, live internals",
    ],
    phases: [
      {
        title: "Contextualize",
        detail: "An IQ profile binds Cortex to the model routes the task needs.",
      },
      {
        title: "Route",
        detail: "Evidence from the work selects the model and compute path.",
      },
      {
        title: "Improve",
        detail: "Confirmed outcomes stay. Model output is not knowledge by default.",
      },
    ],
  },
};
