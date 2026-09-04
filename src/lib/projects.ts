export type Project = {
  id: "iota" | "xqua" | "iq";
  name: string;
  tagline: string;
  description: string;
  color: string;
};

export const projects: Project[] = [
  {
    id: "iota",
    name: "IOTA",
    tagline: "Autonomous intelligence deployment",
    color: "#5B50DD",
    description:
      "The application layer of the ecosystem. A generalized, self-learning platform built for autonomous, continuous improvement through constant feedback loops—not a static model.",
  },
  {
    id: "xqua",
    name: "XQUA",
    tagline: "Infrastructure development & scaling",
    color: "#42E8FF",
    description:
      "An open-source framework that bypasses centralized server farms by pooling accessible resources into distributed supercomputing—a shared compute fabric for everyone.",
  },
  {
    id: "iq",
    name: "IQ",
    tagline: "Foundational research & analysis",
    color: "#8F55FB",
    description:
      "An AI-native research lab conducting foundational work to build cheaper, faster, and radically more accessible intelligence—engineered for consumer-grade GPUs.",
  },
];
