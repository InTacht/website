export const thesisMeta = {
  eyebrow: "The IOTA Thesis",
  headline: "Intelligence Is a System, Not a Single Model.",
  framing:
    "How IOTA composes context, specialists, routing, and confirmed outcomes into intelligence.",
  lede: "A model generates tokens from the context it receives. Useful intelligence also needs durable knowledge, current data, specialized computation, governed actions, memory across sessions, and a way to improve from verified outcomes.",
  premise:
    "Intelligence should not live inside a single model. It should emerge from a system that composes context, compute, tools, and specialist models for the task at hand.",
  product:
    "The working surface is a governed data intelligence endpoint, OpenAI-compatible, that answers over a connected database and chooses between efficient and capable models during the run.",
  destination:
    "The larger destination is organization-native intelligence that stays current, retains useful experience, coordinates local and cloud resources, and becomes more efficient through confirmed operating history.",
  mnemonic:
    "Cortex knows. Experts reason. The router decides. Confirmed outcomes improve the system.",
  beats: [
    { index: "01", name: "Cortex", line: "Knows what is current and allowed" },
    { index: "02", name: "Experts", line: "Reason with the right specialist" },
    { index: "03", name: "Router", line: "Decides each turn from evidence" },
    {
      index: "04",
      name: "Outcomes",
      line: "Confirmed results improve the next run",
    },
  ],
  glance: [
    {
      label: "Premise",
      title: "System, not checkpoint",
      body: "Intelligence should not live inside a single model. It should emerge from a system that composes context, compute, tools, and specialist models for the task at hand.",
    },
    {
      label: "Working surface",
      title: "Governed data intelligence",
      body: "An OpenAI-compatible endpoint that answers over a connected database and chooses between efficient and capable models during the run.",
    },
    {
      label: "Destination",
      title: "Organization-native intelligence",
      body: "Stays current, retains useful experience, coordinates local and cloud resources, and becomes more efficient through confirmed operating history.",
    },
  ],
  path: [
    { id: "limitation", label: "Problem", detail: "Why one model is not enough" },
    { id: "cortex", label: "Architecture", detail: "Cortex, profiles, experts, router" },
    { id: "durability", label: "Implications", detail: "State, privacy, learning, limits" },
    { id: "close", label: "Destination", detail: "Organization-native continuity" },
  ],
} as const;

export const thesisNav = [
  { id: "limitation", index: "01", label: "Limitation" },
  { id: "system", index: "02", label: "System" },
  { id: "cortex", index: "03", label: "Cortex" },
  { id: "iq-profiles", index: "04", label: "IQ Profiles" },
  { id: "experts", index: "05", label: "Experts" },
  { id: "router", index: "06", label: "Router" },
  { id: "durability", index: "07", label: "Durability" },
  { id: "privacy", index: "08", label: "Privacy" },
  { id: "learning", index: "09", label: "Learning" },
  { id: "horizon", index: "10", label: "Horizon" },
  { id: "uses", index: "11", label: "Use cases" },
  { id: "boundaries", index: "12", label: "Boundaries" },
  { id: "close", index: "13", label: "Destination" },
] as const;

export const limitation = {
  eyebrow: "01 · The Single-Model Limitation",
  headline: "The Interface Hides the System.",
  lead: "A chat box creates the impression that one model is doing everything. Behind any serious application, the model is only one participant.",
  body: "The application must decide which data to retrieve, which files to parse, which tools to expose, which operations to allow, how much context to include, where computation should run, how failures should be classified, and what should be remembered afterward. When those responsibilities stay implicit, the model is forced to compensate through prompting.",
  reasons: [
    {
      title: "Freshness",
      body: "Knowledge and model training operate at different speeds. Fine-tuning is not a storage layer for prices, records, policies, or code that change continuously.",
    },
    {
      title: "Memory",
      body: "A context window is a temporary input buffer. It has a hard capacity, a token cost, and no inherent continuity across sessions.",
    },
    {
      title: "Specialization",
      body: "General reasoning and specialized computation are different capabilities. A language model should not simulate a database planner or time-series engine in its token stream.",
    },
    {
      title: "Governance",
      body: "Generation is not an access-control boundary. The surrounding system must decide whether an action is allowed, validate it, and preserve evidence.",
    },
    {
      title: "Economics",
      body: "One model tier is a permanent mismatch. A frontier model is wasteful for routine work. A small model is insufficient for some difficult work.",
    },
  ],
  close:
    "The failure is architectural. We treat the model as the intelligence and everything else as plumbing. In an operational system, the model is a reasoning provider. The intelligence is the whole.",
} as const;

export const system = {
  eyebrow: "02 · Intelligence as a System",
  headline: "Separate What the System Knows From How It Reasons.",
  lead: "A reasoning model should receive the smallest relevant representation of a problem. It should not be the permanent store for an organization's knowledge.",
  body: "The system surrounding the model should know what data exists, how it may be accessed, what happened in previous runs, which outcomes were confirmed, and which compute engines can transform the data before reasoning begins.",
  duties: [
    {
      title: "Context",
      body: "What is known, what is current, what belongs to this organization, and what belongs only to this session.",
    },
    {
      title: "Reasoning",
      body: "Which model or specialist can make the next decision.",
    },
    {
      title: "Execution",
      body: "Which deterministic tool or compute environment should perform the operation.",
    },
    {
      title: "Adaptation",
      body: "What verified evidence from this run should influence future runs.",
    },
  ],
  close:
    "The unit of intelligence is no longer a checkpoint selected by name. It is a configured system that combines operational context, available expertise, policies, budgets, and memory.",
} as const;

export const cortex = {
  eyebrow: "03 · Cortex",
  headline: "Context That Outlives the Prompt.",
  lead: "Today Cortex is a governed database connection, its semantic model, and memory of confirmed question-to-SQL pairs. The broader Cortex is the active direction, not a claim of shipped capability.",
  cards: [
    {
      title: "Parent Cortex",
      body: "Durable knowledge that should accompany many requests: schema, research archive, policies, reusable tools, semantic definitions.",
    },
    {
      title: "Session Cortex",
      body: "Temporary working state for one user, conversation, or workflow. Uploaded files, intermediate artifacts, and the trajectory of that work.",
    },
    {
      title: "Mounted context",
      body: "A file, drive, database, or live API becomes attachable context. The developer receives a Cortex identifier, not bespoke prompt plumbing.",
    },
    {
      title: "Cortex Compute",
      body: "Large tables, streams, and repositories should often be processed where they already live. DuckDB, Polars, or Python can return the precise representation a model needs.",
    },
  ],
} as const;

export const iqProfiles = {
  eyebrow: "04 · IQ Profiles",
  headline: "Call an Intelligence, Not a Checkpoint.",
  lead: "An IQ profile looks like a model identifier. An application can send a standard OpenAI-compatible request with model: IQ01. Behind that name is not one fixed checkpoint.",
  binds: [
    { label: "Cortex", value: "One governed database" },
    { label: "Routes", value: "Efficient and capable models" },
    { label: "Policy", value: "Gates, thresholds, budgets" },
    { label: "Behavior", value: "Prompts and tool-loop rules" },
  ],
  wedge: [
    "Did the system understand the schema?",
    "Was the generated SQL valid?",
    "Did policy block an unsafe operation?",
    "Did a stronger model rescue a failure?",
    "How much did that escalation cost?",
  ],
  close:
    "The developer integrates once. The profile can evolve without forcing the application to rewrite itself around each new model, provider, connector, or routing policy.",
} as const;

export const experts = {
  eyebrow: "05 · A Mixture of Model Experts",
  headline: "Move the Expert Boundary Outside the Model.",
  lead: "IOTA uses the economic intuition of mixture-of-experts at the system level. The experts are complete models and specialized runtimes, not internal networks inside one checkpoint.",
  roster: [
    { title: "Time-series", body: "Representation and forecast work." },
    { title: "Tabular", body: "Structured data specialists." },
    { title: "Local SLM", body: "Routine classification and extraction." },
    { title: "Frontier", body: "Difficult cross-domain reasoning." },
    { title: "SQL engine", body: "Deterministic aggregation." },
    { title: "Python", body: "Custom transformation." },
  ],
  close:
    "Composition and orchestration are defensible today. Model merging has a specific technical meaning. IOTA does not claim literal fusion unless it performs and validates that mechanism.",
} as const;

export const router = {
  eyebrow: "06 · Contextual Routing",
  headline: "Routing Is a Decision Process, Not a Prompt Classifier.",
  lead: "A front-door classifier sees only the opening prompt. The evidence required for good orchestration arrives during the work.",
  principles: [
    {
      title: "Decide each turn",
      body: "Inspect Cortex before inference. Inspect structured outcomes during execution. A severe infrastructure failure is not evidence that a stronger model will help.",
    },
    {
      title: "Escalate only when it changes the answer",
      body: "One planning failure can be a typo. Two similar failures form a pattern. A blocked statement can justify immediate escalation. A downed database never does.",
    },
    {
      title: "Replayable gates",
      body: "Given the recorded signals and policy, the gate returns the same decision. Thresholds can be calibrated offline.",
    },
  ],
  comparison: [
    {
      label: "Efficient only",
      body: "Establishes the cost floor.",
    },
    {
      label: "Capable only",
      body: "Establishes the quality ceiling.",
    },
    {
      label: "Gated route",
      body: "Must approach the ceiling while staying near the floor. Remove the router if it adds no value.",
    },
  ],
} as const;

export const durability = {
  eyebrow: "07 · Durability",
  headline: "A Longer Context Window Is Not a State Architecture.",
  lead: "Sending all material on every model call is economically unsound. Summarizing it repeatedly can erase details. Keeping it only in a process-local conversation makes it disappear when the process ends.",
  stitches: [
    "The application's system-level Cortex",
    "The current user or workflow Cortex",
    "Relevant source fragments",
    "Computed results",
    "Previous confirmed trajectories",
    "The recent conversational window",
  ],
  close:
    "The model sees the working set. IOTA retains the larger state. A durable agent can change reasoning models without destroying files, environment metadata, or confirmed operational knowledge.",
} as const;

export const privacy = {
  eyebrow: "08 · Privacy and Economics",
  headline: "Move Reasoning, Not Necessarily Raw Data.",
  lead: "Sensitive data can remain in a controlled environment while external models receive only the representation required for a reasoning step.",
  cards: [
    {
      title: "Constrained disclosure",
      body: "A local process can strip identifiers, compute an aggregate, or extract an approved schema slice. A cloud model can reason over that result rather than the underlying records.",
    },
    {
      title: "Conditional savings",
      body: "Applications also pay for moving context, re-parsing the same material, generic sandboxes, and bad routes. Smaller models are not automatically cheaper after retries. Measure per workload.",
    },
  ],
  caution:
    "This does not make the system private by default. Privacy depends on topology, access controls, connectors, logging, provider contracts, and the exact data in each request.",
} as const;

export const learning = {
  eyebrow: "09 · The Learning Loop",
  headline: "Define Self-Learning as an Auditable Pipeline.",
  lead: "A generated answer does not become knowledge merely because it exists. Silence is not confirmation. The current product implements the beginning of this ladder.",
  stages: [
    {
      index: "01",
      title: "Record the trajectory",
      body: "Route decisions, signals, model usage, tool calls, errors, SQL, cost, and latency.",
    },
    {
      index: "02",
      title: "Confirm the outcome",
      body: "A user or evaluator accepts the result. Explicit negative feedback can become an escalation signal.",
    },
    {
      index: "03",
      title: "Reuse confirmed knowledge",
      body: "Similar requests can retrieve the successful pattern and choose an efficient route.",
    },
    {
      index: "04",
      title: "Calibrate routing",
      body: "Aggregated traces show where capable models rescue efficient ones, and where escalation wastes money.",
    },
    {
      index: "05",
      title: "Distill repeated expertise",
      body: "Verified trajectories can become a dataset for a specialist model or a learned policy.",
    },
    {
      index: "06",
      title: "Validate before promotion",
      body: "A newly trained route must prove better outcomes on held-out work before it receives live traffic.",
    },
  ],
} as const;

export const horizon = {
  eyebrow: "10 · Current Wedge",
  headline: "Available Now. Being Built. Destination.",
  columns: [
    {
      title: "Available now",
      items: [
        "OpenAI-compatible IQ profiles",
        "Governed Postgres or DuckDB Cortex",
        "Semantic SQL, dry-run, read-only execution",
        "Per-turn routing between efficient and capable models",
        "Confirmed-answer memory",
        "Replayable traces, cost, and latency",
      ],
    },
    {
      title: "Being built",
      items: [
        "Files and folders as first-class context",
        "Drive, API, and live-data connectors",
        "Parent and session Cortexes",
        "In-place SQL, dataframe, and Python compute",
        "Broader model and tool routing",
        "Local and cloud execution paths",
      ],
    },
    {
      title: "Destination",
      items: [
        "Organization-native intelligence",
        "Working context assembled from a larger state",
        "Specialists for routine work, capable reasoners for hard work",
        "Sensitive stages near their source",
        "Confirmed trajectories as training material",
        "One contract while the internals evolve",
      ],
    },
  ],
} as const;

export const uses = {
  eyebrow: "11 · Use Cases",
  headline: "One Structure, Many Surfaces.",
  lead: "Governed data intelligence is available now. The remaining examples describe destination use cases. They are not claims of shipped capability.",
  cases: [
    {
      title: "Governed data intelligence",
      status: "Available now",
      body: "Connect a database, define semantic context, ask business questions. IOTA validates and executes the query under a read-only contract.",
    },
    {
      title: "Financial and research systems",
      status: "Destination",
      body: "A parent Cortex holds filings, datasets, and publication rules. Analysts work in session Cortexes. Specialists process series or documents. A capable reasoner synthesizes cited conclusions.",
    },
    {
      title: "Coding agents",
      status: "Destination",
      body: "A repository becomes a Cortex whose files, symbols, build procedures, and previous trajectories persist across model sessions.",
    },
    {
      title: "Multimodal workflows",
      status: "Destination",
      body: "Source media and derived representations stay together. Models receive the relevant slice. Provenance remains durable.",
    },
    {
      title: "Durable cloud agents",
      status: "Destination",
      body: "Work can begin locally, retain state in a Cortex, and move selected stages to remote compute without reducing continuity to one provider's chat history.",
    },
  ],
} as const;

export const boundaries = {
  eyebrow: "12 · Boundaries",
  headline: "What This Thesis Does Not Imply.",
  nots: [
    {
      title: "Not a foundation model",
      body: "IOTA can use InTacht models and external models. The primary innovation is the runtime that composes them with context and compute.",
    },
    {
      title: "Not literal model fusion",
      body: "Separate SLMs do not become one checkpoint merely because a router coordinates them.",
    },
    {
      title: "Not a generic model router",
      body: "Routing without Cortex, tool-loop evidence, governed execution, and durable outcomes captures only one part of the system.",
    },
    {
      title: "Not a vector database",
      body: "Cortex can use storage and retrieval. Its contract also includes semantics, lifecycle, permissions, computation, and state.",
    },
    {
      title: "Not autonomous correctness",
      body: "Models can fail. Semantic layers can be wrong. Users can confirm bad outcomes. Evaluation remains mandatory.",
    },
    {
      title: "Not an excuse to skip design",
      body: "Developers must still define what data exists, what actions are permitted, what success means, and which tradeoffs matter.",
    },
  ],
  obligations: [
    "Prove each specialist contributes beyond a simpler baseline",
    "Evaluate multi-step orchestration against single-model alternatives",
    "Bound routing latency and failure cascades",
    "Secure compute sandboxes and connector credentials",
    "Enforce tenant, parent, and session isolation",
    "Expose data flow for privacy review",
    "Prevent unconfirmed traces from contaminating memory",
    "Support rollback when adaptation regresses",
  ],
} as const;

export const close = {
  eyebrow: "13 · Organization-Native Intelligence",
  headline: "The Organization Owns the Continuity.",
  lead: "The dominant product pattern is provider-native intelligence. IOTA reverses the relationship. Models become replaceable reasoning resources selected according to the work.",
  ecosystem: [
    {
      name: "Field-IQ",
      body: "Explores more efficient foundations for reasoning and memory.",
    },
    {
      name: "IOTA",
      body: "Turns models and external capabilities into an adaptive system against real context.",
    },
    {
      name: "XQUA",
      body: "Provides the distributed infrastructure through which those systems can run and scale.",
    },
  ],
} as const;
