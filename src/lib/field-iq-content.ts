export const act1 = {
  eyebrow: "1 · The Limitation",
  headline: "One Model Is Being Asked to Do Everything.",
  subheadline:
    "We ask one general model to absorb context, retrieve facts, inspect files, perform computation, use tools, reason, and make every decision.",
  body: "The result looks simple in a chat box, but the system behind it is expensive, repetitive, and fragile.",
  callout:
    "Each new session starts with missing context. Live data must be inserted again. The same files are parsed again. The same environment is rebuilt again. Easy questions are sent to models designed for the hardest ones. When something fails, a larger model is often called even when the real problem is a broken connection or unavailable data.",
  bottomLine:
    "The limitation is not only model intelligence. It is the architecture around the model.",
  metrics: [
    { id: "context", label: "Context rebuilt each session", icon: "database" as const },
    { id: "env", label: "Same files parsed again", icon: "zap" as const },
    { id: "cost", label: "Largest model by default", icon: "dollar" as const },
  ],
} as const;

export const act2 = {
  eyebrow: "2 · The Insight",
  headline: "Intelligence Should Not Live Inside a Checkpoint.",
  subheadline:
    "Reasoning and context change at different speeds. A model can provide reasoning, but an organization's data, tools, policies, files, and operating history change continuously.",
  productReveal:
    "IOTA separates these responsibilities. Models reason. Cortex holds the context they reason over. The router decides which model, tool, and compute path should act.",
  body: "Fine-tuning cannot be the storage layer for live reality, and a context window is not durable memory. The application sees one coherent intelligence instead of a collection of disconnected services.",
} as const;

export const act3 = {
  eyebrow: "3 · Introducing IOTA",
  headline: "One Intelligence, Assembled for the Task.",
  lead: "IOTA is the application-layer runtime for context-aware intelligence. Developers call an IQ profile, not a fixed model checkpoint.",
  steps: [
    {
      id: "deposit",
      index: "01",
      title: "Contextualize",
      subtitle: "Connect",
      body: "Connect the data, files, tools, and knowledge the task requires. Today, an IQ profile binds a governed database Cortex to efficient and capable model routes, gate thresholds, prompts, and execution budgets.",
      caption: "Give the work the context it needs",
      asset: "/assets/field-iq/deposit-diagram.svg",
    },
    {
      id: "propagate",
      index: "02",
      title: "Route",
      subtitle: "Decide",
      body: "Select the right model and compute path using evidence from the work itself. IQ01 can be called through an ordinary OpenAI-compatible request. It validates generated SQL, executes it read-only, and records the cost and decisions behind the answer.",
      caption: "Evidence chooses the path, not a fixed checkpoint",
      asset: "/assets/field-iq/propagate-fft.svg",
    },
    {
      id: "readback",
      index: "03",
      title: "Improve",
      subtitle: "Confirm",
      body: "Preserve confirmed outcomes so future decisions become more precise. A result is not treated as knowledge merely because a model produced it. Confirmation matters.",
      caption: "Confirmed answers inform the next route",
      asset: "/assets/field-iq/readback-pin.svg",
    },
  ],
} as const;

export const act4 = {
  eyebrow: "4 · The System",
  headline: "Cortex Knows. Experts Reason. The Router Decides.",
  lead: "Together, these parts behave as one intelligence without pretending they are one set of weights.",
  cards: [
    {
      id: "holo",
      title: "Cortex is the context layer",
      points: [
        "Today, it governs connected databases, semantic definitions, business rules, and confirmed answers.",
        "It is expanding toward persistent organizational Cortexes and temporary session Cortexes where files, APIs, tools, and working state become addressable context instead of prompt fragments.",
      ],
      asset: "/assets/field-iq/holo-wave.svg",
      speed: -0.15,
    },
    {
      id: "gmem",
      title: "The router coordinates the work",
      points: [
        "Today, it operates inside the governed data execution loop, where it can see more than the opening prompt.",
        "It distinguishes a model struggling with a schema from a database that is simply offline. It escalates when stronger reasoning can change the outcome, not merely when an error looks severe.",
      ],
      asset: "/assets/field-iq/grassmann-manifold.svg",
      speed: 0.2,
    },
  ],
} as const;

export const act5 = {
  eyebrow: "5 · The Evolution",
  headline: "From Confirmed Outcomes, Better Routing Evidence.",
  lead: "A result is not treated as knowledge merely because a model produced it. Confirmation matters. This prevents a confident mistake from teaching the system to repeat itself.",
  columns: ["Capability", "One-model stack", "IOTA"] as const,
  rows: [
    {
      metric: "Context",
      traditional:
        "Missing each new session. Live data and files inserted again as prompt fragments.",
      fieldIq:
        "Durable Cortex outside model weights. Confirmed answers stay available.",
    },
    {
      metric: "Routing",
      traditional:
        "One general model for every problem. Larger models called when anything fails.",
      fieldIq:
        "Evidence-based routing between specialist models. Escalate only when it changes the outcome.",
    },
    {
      metric: "Memory",
      traditional:
        "Fine-tuning cannot store live reality. A context window is not durable.",
      fieldIq:
        "Confirmed outcomes become routing evidence. Inspectable traces, cost, and latency sit behind each answer.",
    },
    {
      metric: "Compute",
      traditional:
        "The same environment is rebuilt again. Easy questions go to models meant for the hardest ones.",
      fieldIq:
        "Governed, read-only execution today. In-place Cortex compute is being built.",
    },
    {
      metric: "Improvement",
      traditional:
        "No inspectable path from an answer back to the decision that produced it.",
      fieldIq:
        "Self-learning grounded in outcomes the system can inspect and the organization can confirm.",
    },
  ],
} as const;

export const act6 = {
  eyebrow: "6 · The Destination",
  headline: "Stop Choosing One Model for Every Problem.",
  subheadline:
    "Connect a Cortex. Define an IQ profile. Let evidence decide how intelligence is assembled for the work.",
  note: "Research creates new capability. IOTA composes it into useful intelligence. XQUA makes it accessible.",
  ctas: [
    { label: "Read the IOTA Thesis", href: "/iota/thesis", variant: "primary" as const },
    { label: "IQ Research", href: "/research?from=home", variant: "secondary" as const },
  ],
} as const;

/** Paths match Assets.md. Photo JPGs remain as fallbacks for hardware/charts. */
export const fieldIqAssets = {
  nvidiaGpu: "/assets/field-iq/nvidia-gpu-chip.svg",
  energyChart: "/assets/field-iq/energy-chart.svg",
  waveVector: "/assets/field-iq/wave-vector.svg",
  kvCache: "/assets/field-iq/kv-cache-memory.svg",
  fallbacks: {
    nvidiaGpu: "/assets/field-iq/gpu-silicon.jpg",
    energyChart: "/assets/field-iq/energy-grid.jpg",
    waveVector: "/assets/field-iq/wave-field.jpg",
    spatialGrid: "/assets/field-iq/spatial-grid.jpg",
    mqarPlot: "/assets/field-iq/benchmark-chart.jpg",
    kvCache: "/assets/field-iq/memory-bars.jpg",
    deposit: "/assets/field-iq/deposit-field.jpg",
    holo: "/assets/field-iq/holo-wave.jpg",
  },
} as const;
