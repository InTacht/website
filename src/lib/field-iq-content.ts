export const fieldIqTheme = {
  bg: "#090A0F",
  bgElevated: "#0D0E15",
  bgPanel: "#12141F",
  cyan: "#00F0FF",
  indigo: "#6366F1",
  alert: "#EF4444",
} as const;

export const act1 = {
  eyebrow: "1 · The Invisible Wall",
  headline: "Modern AI Is Running Into a Resource Wall.",
  subheadline:
    "Today's models are remarkably smart, but the math powering them is becoming impossibly expensive.",
  body: "To read long text, standard AI calculates attention by connecting every single word to every other word. When applied to massive frontier models like Kimi K3—with nearly 3 trillion parameters—the real-world strain is staggering.",
  callout:
    "Running just one instance of a model at this scale can require over 1.5 Terabytes of memory just to load the weights, a cluster of 64 high-end GPUs, hundreds of kilowatts of continuous power, and up to $500,000 a month in cloud compute rentals.",
  bottomLine:
    "As context grows, processing costs explode exponentially. AI isn't just running out of memory—it's running out of energy.",
  metrics: [
    { id: "vram", label: "1.5 TB VRAM", icon: "database" as const },
    { id: "power", label: "116 kW Power", icon: "zap" as const },
    { id: "rent", label: "$500k/mo Cloud Rent", icon: "dollar" as const },
  ],
} as const;

export const act2 = {
  eyebrow: "2 · The Turning Point",
  headline: "What If AI Didn't Need to Compare Every Word?",
  subheadline:
    "To make long-context AI fast, lightweight, and accessible, we have to rethink how information travels through a model.",
  productReveal: "Introducing Field-IQ (Field-Based Intelligence Models).",
  body: "Instead of forcing heavy, word-by-word matrix comparisons, Field-IQ passes information through continuous spatial fields—much like waves moving through water. By replacing brute-force matrix calculations with wave physics, AI can process massive documents in parallel at a fraction of the hardware cost.",
} as const;

export const act3 = {
  eyebrow: "3 · The Mechanics",
  headline: "Information Moving Like Waves",
  steps: [
    {
      id: "deposit",
      index: "01",
      title: "Deposit",
      subtitle: "Drop",
      body: "Words are placed directly onto a continuous field grid, creating localized signals of information.",
      caption: "Each word becomes a local signal",
      asset: "/assets/field-iq/deposit-diagram.svg",
    },
    {
      id: "propagate",
      index: "02",
      title: "Propagate",
      subtitle: "Flow",
      body: "Information travels naturally across the sequence using fast wave operations, combining context across thousands of words simultaneously.",
      caption: "Signals travel and mix",
      asset: "/assets/field-iq/propagate-fft.svg",
    },
    {
      id: "readback",
      index: "03",
      title: "Read Back",
      subtitle: "Listen",
      body: "The model simply samples the field state at the exact position where it needs an answer.",
      caption: "Listen here for the answer",
      asset: "/assets/field-iq/readback-pin.svg",
    },
  ],
} as const;

export const act4 = {
  eyebrow: "4 · The Engine Room",
  headline: "Built for Speed. Engineered for Precision.",
  cards: [
    {
      id: "holo",
      title: "Holographic Wave Fields",
      points: [
        "Context is the document the model is reading.",
        "Holographic wave fields store that whole document as one wave, so a longer page is not a slower read.",
      ],
      asset: "/assets/field-iq/holo-wave.svg",
      speed: -0.15,
    },
    {
      id: "gmem",
      title: "Grassmannian Precision Memory",
      points: [
        "A long conversation is a haystack of details.",
        "Grassmannian memory holds a fixed-size map of that haystack, then pins the needle with 97%+ recall.",
      ],
      asset: "/assets/field-iq/grassmann-manifold.svg",
      speed: 0.2,
    },
  ],
} as const;

export const act5 = {
  eyebrow: "5 · The Impact",
  headline: "Practical Comparison",
  columns: ["Metric", "Traditional", "Field-IQ"] as const,
  rows: [
    {
      metric: "Speed over Long Text",
      traditional: "Slows down dramatically as text gets longer",
      fieldIq: "Stays consistently fast across thousands of pages",
    },
    {
      metric: "Memory Growth (KV-Cache)",
      traditional: "Keeps expanding until memory fills up",
      fieldIq: "Stays small and constant, no matter the length",
    },
    {
      metric: "Recall Accuracy",
      traditional: "High, but requires massive hardware",
      fieldIq: "Matches top-tier precision (97%+) at a fraction of the cost",
    },
    {
      metric: "Hardware Required",
      traditional: "Massive, multi-server data centers",
      fieldIq: "Standard, accessible GPU hardware",
    },
    {
      metric: "Energy & Running Costs",
      traditional: "Extremely expensive to serve at scale",
      fieldIq: "Lightweight, sustainable execution",
    },
  ],
} as const;

export const act6 = {
  eyebrow: "6 · Call to Action",
  headline: "High-Performance AI, Built for Everyone.",
  subheadline:
    "Unlocking scalable context processing without exponential energy or server costs. Review our research and open benchmarks.",
  ctas: [
    { label: "Explore Research Code", href: "#", variant: "primary" as const },
    { label: "View Benchmarks", href: "#act-5", variant: "secondary" as const },
  ],
} as const;

/** Paths match Assets.md. Photo JPGs remain as fallbacks for hardware/charts. */
export const fieldIqAssets = {
  kimiLogo: "/assets/field-iq/kimi-logo.svg",
  nvidiaServer: "/assets/field-iq/nvidia-dgx-server.svg",
  nvidiaGpu: "/assets/field-iq/nvidia-gpu-chip.svg",
  energyChart: "/assets/field-iq/energy-chart.svg",
  waveVector: "/assets/field-iq/wave-vector.svg",
  spatialGrid: "/assets/field-iq/spatial-grid.svg",
  mqarPlot: "/assets/field-iq/benchmark-mqar-plot.svg",
  kvCache: "/assets/field-iq/kv-cache-memory.svg",
  fallbacks: {
    kimiLogo: "/assets/field-iq/frontier-model.jpg",
    nvidiaServer: "/assets/field-iq/server-rack.jpg",
    nvidiaGpu: "/assets/field-iq/gpu-silicon.jpg",
    energyChart: "/assets/field-iq/energy-grid.jpg",
    waveVector: "/assets/field-iq/wave-field.jpg",
    spatialGrid: "/assets/field-iq/spatial-grid.jpg",
    mqarPlot: "/assets/field-iq/benchmark-chart.jpg",
    kvCache: "/assets/field-iq/memory-bars.jpg",
    deposit: "/assets/field-iq/deposit-field.jpg",
    propagate: "/assets/field-iq/propagate-signal.jpg",
    readback: "/assets/field-iq/readback-focus.jpg",
    holo: "/assets/field-iq/holo-wave.jpg",
    gmem: "/assets/field-iq/grassmann-geo.jpg",
  },
} as const;
