export const site = {
  name: "InTacht",
  email: "labs@intacht.com",
  contactHref: "mailto:labs@intacht.com",
  labsNotebookHref: "https://intacht.notion.site/",
  socials: [
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com/intacht",
    },
    {
      id: "x",
      label: "X",
      href: "https://x.com/InTachtHQ",
    },
  ],
} as const;

export const labDestinations = [
  {
    id: "research",
    label: "IQ Research",
    href: "/research",
    detail: "Benchmarks, measurements, and lab notes from Field-IQ.",
  },
  {
    id: "thesis",
    label: "IOTA Thesis",
    href: "/iota/thesis",
    detail: "Why intelligence is a system, not a single checkpoint.",
  },
  {
    id: "notebook",
    label: "Field notes",
    href: "https://intacht.notion.site/",
    detail: "Working notebook. Experiments and drafts in Notion.",
    external: true,
  },
] as const;
