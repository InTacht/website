import { fieldIqAssets } from "@/lib/field-iq-content";

export type ResearchKind = "benchmark" | "measurement" | "method";

export type ResearchTable = {
  caption: string;
  columns: string[];
  rows: string[][];
};

export type ResearchFigure = {
  src: string;
  fallbackSrc?: string;
  label: string;
};

export type ResearchSection = {
  heading: string;
  body: string[];
  figure?: ResearchFigure;
  table?: ResearchTable;
};

export type ResearchCitation = {
  title: string;
  href: string;
  venue?: string;
};

export type ResearchArticle = {
  slug: string;
  title: string;
  date: string;
  kind: ResearchKind;
  excerpt: string;
  lead: string;
  cover: string;
  coverFallback: string;
  featured?: boolean;
  related: readonly string[];
  sections: ResearchSection[];
  citations?: readonly ResearchCitation[];
};

export const researchKindLabel: Record<ResearchKind, string> = {
  benchmark: "Benchmark",
  measurement: "Measurement",
  method: "Method",
};

/**
 * Public research catalog. Copy is lab-honest: numbers from the Field-IQ ledger,
 * scoped to this stack. Do not reintroduce Grassmannian 97%+ or "waves unlocked recall."
 */
export const researchArticles: readonly ResearchArticle[] = [
  {
    slug: "associative-recall",
    title: "Associative Recall",
    date: "2026-08-01",
    kind: "benchmark",
    featured: true,
    excerpt:
      "MQAR is the public kill probe for content addressing. Diagonal fields sat at 0.25. Matrix-delta memory reached 0.971, then audited as published GDN.",
    lead: "If a model cannot fetch a value by its key, it has no content addressing. Stanford Hazy Research built MQAR for that question. We use it as a one-minute kill switch, before perplexity gets a vote.",
    cover: "/assets/field-iq/benchmark-mqar-plot-lab.svg",
    coverFallback: "/assets/field-iq/benchmark-mqar-plot-lab.svg",
    related: ["matched-ppl", "false-depth", "constant-state"],
    sections: [
      {
        heading: "A public probe, not a private leaderboard",
        body: [
          "Arora, Eyuboglu, and colleagues introduced Multi-Query Associative Recall in Zoology (ICLR 2024). The task plants several key-value pairs in a sequence and asks the model to read them back by content, not by position. It exists because gated convolutions could ace older synthetic recall tests and still lose to attention on real in-context lookup. Hyena-class mixers looked solved on the old toys. MQAR was built to close that gap.",
          "The scientific point of the probe is identification. A language-model loss mixes syntax, frequency, and a little bit of memory. You cannot tell from perplexity whether the mixer can address what it wrote. MQAR can. Attention solves it with induction-style lookup: find a previous key, copy the value that sat next to it. Static kernels famously do not. That split is why Field-IQ treats the same public task as a routing kill switch rather than as a house leaderboard.",
          "Chance on our medium setting is about 0.02. A mixer that sits near chance has no content addressing, whatever its language-model loss says. We run the probe in about a minute. If it fails, the architecture does not get a story about waves, geometry, or energy. It gets a ceiling, and we move on.",
        ],
      },
      {
        heading: "The diagonal ceiling",
        body: [
          "On 2026-08-01, every diagonal-memory and holographic-field variant we trained pinned at about 0.25 recall. A matched attention baseline saturated at 1.0. That is a ceiling, not a tuning miss. Holo-noortho landed at 0.251. Selective-decay cousins sat at 0.254. Harmonic kernels, which were supposed to fix recall by changing kernel breadth, stayed at 0.26 against a 0.5 bar. Sharper reads did not move it. The numbers did not care about our intuition.",
          "The math underneath is blunt, and it has its own note. If you bind and erase with an invertible diagonal, erase-at-key is equivalent to global decay. The field cannot keep one association without dimming the rest. Key-selective forgetting needs a rank-one projector onto the key, not a wave on a grid. That is matrix state. Holographic reduced representations, Plate 1995, make unbinding cheap. They do not make selective overwrite cheap. We learned that the expensive way.",
        ],
        table: {
          caption:
            "MQAR v4 probe, 2026-08-01, Field-IQ lab stack. Artifact: recall_20260801_125100_merged.json and recall_20260801_143657_merged.json. Not a product claim.",
          columns: ["Variant", "MQAR accuracy", "What it is"],
          rows: [
            ["Attention baseline", "1.00", "Saturated content addressing"],
            ["Diagonal / holographic field", "0.251", "Pinned ceiling"],
            ["Matrix-delta memory", "0.971", "GDN-class state, not a new mixer"],
          ],
        },
      },
      {
        heading: "What actually broke the ceiling",
        body: [
          "The same day, a matrix-delta memory path reached 0.971 against holographic 0.251 and attention 1.000. That unlock is real and was reproduced across two runs. On a matched-parameter fair run at context 1024, the same family also beat tuned attention on perplexity, 2.82 versus 2.99, three seeds. The honest name for both results is gated delta-rule state: a delta write plus an adaptive forget gate, trained with a chunkwise scan.",
          "Yang et al. published that family as Gated DeltaNet, improving Mamba-2 with the delta rule. The lineage is older. Schlag, Irie, and Schmidhuber wrote the delta rule as a fast-weight overwrite in 2021. Yang et al. 2024 parallelized it over sequence length. GDN gated the forget. We called our internal branch gmem, then Grassmann, for a while. The next-day audit was gmem equals GDN. Novelty, if any, has to be measured against that paper, not against a transformer we already knew would saturate MQAR.",
          "Moonshot later shipped Kimi Delta Attention, a channel-wise refinement of the same family, inside a hybrid with Multi-Head Latent Attention. NVIDIA's Gated DeltaNet-2 splits erase and write into separate channel-wise gates. FG2-GDN replaces the scalar delta step with a channel-wise vector. That is occupied literature. It is not a Field-IQ invention, and it does not reopen a diagonal mixer.",
        ],
      },
      {
        heading: "A later screen is not this result",
        body: [
          "On 2026-08-28, medium MQAR with a different budget put GDN at 0.734 and a KDA adoption arm at 0.147. That row is directional only. Shared learning rates, short walls, and a different protocol mean it does not replace 0.971, and it does not grant KDA a win or a loss as a claim. Screens rank. They never claim. Folding that row into the 2026-08-01 probe is how a blog post accidentally invents a reversal.",
          "The same discipline applies to any later hybrid. Kimi Linear's 3:1 mix of KDA and latent attention is an industrial neighbor with its own measurements. We have not run that hybrid as a fair-tier mixer on this stack. Until we do, the public recall number from this lab remains the GDN-class 0.971 against a diagonal ceiling of 0.25 and attention at 1.0.",
        ],
      },
      {
        heading: "How a probe can cheat",
        body: [
          "We also found that our own nested-query ladder could leak. If a deeper query contains a shallower one as a suffix, the model can copy instead of compose. Depth-j containing depth-(j minus 1) is an induction-copy path, not a multi-hop test. A probe on the leaked run decoded the previous answer from early scan output at 0.97. Strip the lexical bridge and that copy collapsed. The fix is strict decreasing query order, plus a strip control that asks whether the task dies when the bridge is removed.",
          "RULER-style single-needle formats are usually clean of that suffix leak. They are also often one-hop ceilings. Multi-query aggregates on RULER are recall counts, not dependent-read depth. Passkey retrieval is one query per document. The longer note on this is When a Probe Is Not Depth. The short version for this page: any architecture that cannot pass MQAR does not get a routing story, and any depth claim that has not survived a strip control does not get a composition story.",
        ],
      },
      {
        heading: "How to read this going forward",
        body: [
          "Fair claims still need matched parameters, more than one seed, and the structural protocol with a 640-name pool and entity holdout. N=40 answer loss can look like structure and still be memorization. Perplexity without this probe is directional. A joule claim without this probe is a faster model that cannot find what it wrote.",
          "This page reports the probe that killed a family, and the published memory that replaced it. The story page still talks about waves. This research page does not promote that intuition to a result.",
        ],
      },
    ],
    citations: [
      {
        title: "Zoology: Measuring and Improving Recall in Efficient Language Models",
        href: "https://arxiv.org/abs/2312.04927",
        venue: "Arora, Eyuboglu, et al., ICLR 2024.",
      },
      {
        title: "Linear Transformers Are Secretly Fast Weight Programmers",
        href: "https://arxiv.org/abs/2102.11174",
        venue: "Schlag, Irie, Schmidhuber, ICML 2021.",
      },
      {
        title: "Gated Delta Networks: Improving Mamba2 with Delta Rule",
        href: "https://arxiv.org/abs/2412.06464",
        venue: "Yang et al., ICLR 2025.",
      },
      {
        title: "Kimi Linear: An Expressive, Efficient Attention Architecture",
        href: "https://arxiv.org/abs/2510.26692",
        venue: "Moonshot AI, 2025. Occupied neighbor, not a Field-IQ result.",
      },
    ],
  },
  {
    slug: "matched-ppl",
    title: "Matched-Parameter Perplexity",
    date: "2026-08-01",
    kind: "benchmark",
    excerpt:
      "At context 1024, GDN-class memory beat a tuned transformer by 0.17 PPL at matched parameters, three seeds. The winner is published gated delta-rule state, not a new mixer.",
    lead: "Associative recall is the kill switch. Language-model loss is the second vote. On this stack, the same matrix-delta family that broke the MQAR ceiling also beat tuned attention on perplexity, at matched size, with pairing that actually worked.",
    cover: "/assets/field-iq/benchmark-ppl-ctx1024.svg",
    coverFallback: fieldIqAssets.fallbacks.mqarPlot,
    related: ["associative-recall", "training-wall", "diagonal-erase"],
    sections: [
      {
        heading: "Why perplexity second",
        body: [
          "Associative recall asks whether the mixer can fetch. Language-model perplexity asks whether that mixer still produces a usable next-token distribution at matched size. A memory that aces MQAR and wrecks PPL is a probe champion, not a language model. A memory that wins PPL and fails MQAR is a fluent model with no content addressing. We run the kill switch first. This page is the second vote.",
          "The protocol is the thing that makes the vote real. Screen-tier PPL with a shared learning rate can hide an architecture that wants a hotter step size. The matrix-delta arm wanted about 3e-3. Holographic mixers had been happiest nearer 6e-4. Comparing them at one learning rate is how you accidentally crown the wrong winner. Fair-tier work tunes per architecture, matches parameters, and pairs seeds.",
        ],
      },
      {
        heading: "The fair run",
        body: [
          "On 2026-08-01 we ran a pre-registered fair_proof at context 1024, three seeds, both architectures at learning rate 3e-3, matched parameters to within a few hundred weights (1,244,232 versus 1,243,968). The corpus was the full 5M-character protocol. The matrix-delta arm landed at 2.82 plus or minus 0.03 perplexity. Transformer++ landed at 2.99 plus or minus 0.05. The paired gap was minus 0.172 plus or minus 0.019, with a win on every seed, about nine sigma on the paired statistic.",
          "Common-random-number pairing is why three seeds were enough to see that. Paired standard deviation was 0.019 against unpaired 0.03 to 0.05. Unpaired, you would want more seeds. Paired, the gap is a property of the architecture under the same noise, not a lucky seed. That is a ledger-grade result on this lab stack. It is not a 7B-scale law, and it is not a serving number.",
        ],
        table: {
          caption:
            "fair_proof ctx 1024, 3 seeds, both at 3e-3, matched params. Artifact: fair_proof_20260801_164045_28157.json. Lab stack only. Winner audited the next day as GDN.",
          columns: ["Arm", "PPL", "Notes"],
          rows: [
            ["Transformer++", "2.99 ± 0.05", "Tuned attention baseline"],
            ["Matrix-delta memory", "2.82 ± 0.03", "GDN-class state, not a new mixer"],
            ["Paired gap", "−0.172 ± 0.019", "3/3 seed wins"],
          ],
        },
      },
      {
        heading: "The wall we set aside",
        body: [
          "Wall time on that run was about 3.5 times slower on the chunked scan we had that day, 178 seconds versus 51. The first sequential scan had been about 12 times slower. Chunk 128 later cut the training-step tax to 1.78 times at the same length. None of that is this claim. Speed was deprioritized because the scientific question was whether the memory that can address content can also hold a language-model loss against attention. It could.",
          "A training-step tax is allowed if you can point at the arithmetic. The counted wall has its own note. Do not recycle 3.5 times, 1.78 times, or a later fused decode screen into this PPL table. They are different instruments.",
        ],
      },
      {
        heading: "Name the winner correctly",
        body: [
          "We called the branch gmem, then Grassmann. The next-day audit was gmem equals GDN. Yang et al. had already published gated delta-rule memory: a delta write, an adaptive forget gate, a chunkwise scan. The 0.17 PPL gap is a transfer of that family onto this bench, at this length, at this size. Novelty, if any, has to be measured against GDN, not against a transformer we already expected to lose MQAR and that we beat on this one PPL protocol.",
          "A later KDA screen is a different instrument and a different budget. On 2026-08-28, medium MQAR put GDN at 0.734 and a KDA adoption arm at 0.147. That row does not belong in this table. Screens rank. This page is the fair run that already exists. If a later hybrid beats GDN on this protocol, at matched params, with pairing, that becomes a new page. Until then, the winner's honest name is gated delta-rule state.",
        ],
      },
      {
        heading: "What a 0.17 gap is not",
        body: [
          "It is not a product quality number. It is not evidence that geometry caused the win. Written-key coherence stayed in the same band. It is not permission to skip entity holdout on structural tasks. N=40 breakaway can look like composition and still be memorization. And a single-seed PPL win smaller than about 0.3 is not a claim on this programme unless the pairing and the protocol say otherwise. This gap cleared that bar because it was pre-registered, paired, and three for three.",
          "Read it with Associative Recall and The Counted Training Wall, not instead of them.",
        ],
      },
    ],
    citations: [
      {
        title: "Gated Delta Networks: Improving Mamba2 with Delta Rule",
        href: "https://arxiv.org/abs/2412.06464",
        venue: "Yang et al., ICLR 2025. The honest name for the winning arm.",
      },
      {
        title: "Parallelizing Linear Transformers with the Delta Rule over Sequence Length",
        href: "https://arxiv.org/abs/2406.06484",
        venue: "Yang et al., NeurIPS 2024. Chunkwise delta-rule scan.",
      },
    ],
  },
  {
    slug: "constant-state",
    title: "Memory That Does Not Grow",
    date: "2026-08-22",
    kind: "measurement",
    excerpt:
      "O(1) mixer state is a class fact of gated delta-rule memory. Kimi Linear's 6x decode is Moonshot's serving result. Our 8GB map is screening, not a serving law.",
    lead: "A transformer keeps a key-value cache that grows with every token. A gated delta-rule mixer keeps a matrix of fixed size. That difference is real. Treating it as our measured serving win is not.",
    cover: fieldIqAssets.kvCache,
    coverFallback: fieldIqAssets.fallbacks.kvCache,
    related: ["associative-recall", "training-wall", "energy-wall"],
    sections: [
      {
        heading: "Two different memory bills",
        body: [
          "Self-attention stores keys and values for every past token. The KV cache is linear in sequence length, then linear again in batch and heads. Long conversations fill the GPU with history, not with the model. Prefill is a quadratic tax. Decode is a memory-bandwidth tax that grows as the prompt and the completion grow. That is why serving stacks treat the cache as a first-class object.",
          "Katharopoulos et al. showed in 2020 that a kernelized attention map can be rewritten as an RNN with a fixed-size state. Linear mixers since then, including Mamba, Mamba-2, DeltaNet, and Gated DeltaNet, sit on some version of that rewrite. The point is not that the weights are small. The point is that the past does not have to be stored token by token.",
          "Gated DeltaNet keeps a fixed-size state per head. Write is a rank-one delta update plus an adaptive forget gate. Read is a projection of that state. Length does not add new tensors. That O(1) state is a class fact of the family Yang et al. published. It does not need a new theorem from us. It also does not, by itself, tell you the millisecond or the megabyte you will see on a given card.",
        ],
        figure: {
          src: fieldIqAssets.kvCache,
          fallbackSrc: fieldIqAssets.fallbacks.kvCache,
          label: "KV cache growth versus constant delta state",
        },
      },
      {
        heading: "A neighbor, not our result",
        body: [
          "Moonshot's Kimi Linear paper reports a hybrid of Kimi Delta Attention and Multi-Head Latent Attention in a 3:1 layer mix. In their measurements, that architecture reduces KV cache by up to about 75 percent and reaches up to 6x decoding throughput at 1M context versus full MLA. They pretrain a 3B-active, 48B-total model. Those numbers are theirs, on their hardware, on their models. They are the industrial neighbor in this literature. They are not a Field-IQ result.",
          "Mooncake, their KV-cache serving platform, exists because the cache is a cluster problem: prefill and decode split across pools, extra DRAM and SSD used as a disaggregated cache, a scheduler that cares about time-to-first-token as much as tokens per second. Qin et al. 2024 is that paper. We have not built a Mooncake. We have not measured 1M decode. Citing them is how you keep the class fact honest instead of quietly inheriting their 6x.",
        ],
      },
      {
        heading: "What we measured, and what we did not",
        body: [
          "Track D on an RTX 5050 8GB is a screening map, not a serving law. At sequence length 1024 in fp32, a sequential GDN path was slower than attention. A fused rematch was directionally faster on the same card, about 0.43 ms versus 1.58 ms token time in that screening persist. Working VRAM at lab length did not separate the arms in our favor. Graph buffers and eager overhead can flip the working-set comparison at short length. We do not claim a VRAM win.",
          "An int8 delta-state quantization screen made the arithmetic obvious. The fp32 delta state was about 24 kilobytes against a 2.5 megabyte weight footprint. Cutting the state by 4x was invisible in working memory at lab length, and token time got worse from launch overhead. The transformer's KV cache is the object that grows into hundreds of megabytes at tens of thousands of tokens. Our 8GB map at length 1024 never reaches that regime. Premise measurement is not a 32k serving claim.",
        ],
        table: {
          caption:
            "Track D serving map, screening tier, RTX 5050 8GB, L=1024 fp32. Lab measurement. Not a serving claim. Do not claim a VRAM win.",
          columns: ["Quantity", "What held", "What did not"],
          rows: [
            ["State vs length", "Delta state O(1) in L", "KV cache grows with L"],
            ["Sequential decode", "GDN slower than attention", "Not a product kernel"],
            ["Fused rematch", "Directional TPOT win, screening", "Not a serving law"],
            ["Working VRAM", "No claimed advantage at lab L", "Do not claim a VRAM win"],
          ],
        },
      },
      {
        heading: "What a serving claim would need",
        body: [
          "A latency claim needs decode, not a training forward, and not a Python scan. A cache-size claim needs a length where KV actually dominates the working set. A quality claim still has to pass associative recall first. Skipping that order is how a faster mixer ships a model that cannot find what it wrote.",
          "Until those instruments run on hardware we name, O(1) state is the architecture fact, Kimi's 6x is their product measurement, and this page is a lab map with the VRAM sentence written in the caption so nobody has to scrape it out of a figure.",
        ],
      },
    ],
    citations: [
      {
        title: "Gated Delta Networks: Improving Mamba2 with Delta Rule",
        href: "https://arxiv.org/abs/2412.06464",
        venue: "Yang et al., ICLR 2025.",
      },
      {
        title: "Kimi Linear: An Expressive, Efficient Attention Architecture",
        href: "https://arxiv.org/abs/2510.26692",
        venue:
          "Moonshot AI, 2025. 75% KV reduction and up to 6x decode are their measurements.",
      },
      {
        title: "Mooncake: A KVCache-centric Disaggregated Architecture for LLM Serving",
        href: "https://arxiv.org/abs/2407.00079",
        venue: "Qin et al., 2024. KV cache as a serving problem.",
      },
      {
        title: "Transformers are RNNs: Fast Autoregressive Transformers with Linear Attention",
        href: "https://arxiv.org/abs/2006.16236",
        venue: "Katharopoulos et al., ICML 2020. Fixed-size state rewrite.",
      },
    ],
  },
  {
    slug: "energy-wall",
    title: "Energy Into Intelligence",
    date: "2026-07-29",
    kind: "method",
    excerpt:
      "Quadratic attention plus a growing cache is a real energy tax. Kimi's line is turning that tax into intelligence. We have not measured joules per token.",
    lead: "Moonshot frames research as turning energy into intelligence. The tax is real: attention is quadratic in the window, and the cache grows with every token. Naming the tax is not the same as paying less of it.",
    cover: fieldIqAssets.energyChart,
    coverFallback: fieldIqAssets.fallbacks.energyChart,
    related: ["constant-state", "training-wall", "associative-recall"],
    sections: [
      {
        heading: "The bill is not abstract",
        body: [
          "Dense attention costs compute that grows with the square of the window. Serving it costs memory that grows with every generated token. At short context those two facts are a rounding error on a training run. At long context they dominate the bill. Prefill is comparisons. Decode is the cache you have to keep hot, move, and sometimes spill. A research page that only publishes wins is a brochure. The reason this lab exists is that cost curve.",
          "The story page quotes a 3-trillion-class reference point: on the order of 1.5 TB just to load weights, a cluster of tens of GPUs, hundreds of kilowatts, and cloud rent that can reach hundreds of thousands of dollars a month for a single instance. Those figures describe the wall. They are not Field-IQ measurements. They are not a claim that we have removed it. They are the problem statement in units a buyer already understands.",
        ],
        figure: {
          src: fieldIqAssets.energyChart,
          fallbackSrc: fieldIqAssets.fallbacks.energyChart,
          label: "Energy cost of growth, problem framing",
        },
      },
      {
        heading: "Industrial answers, named as theirs",
        body: [
          "Kimi Linear is one industrial answer: keep most of the sequence in a linear mixer, spend full attention where the residual needs it, in a 3:1 mix. Their paper reports up to about 75 percent less KV and up to 6x decode at 1M context versus full MLA. Mooncake is the serving answer sitting under that: treat the cache as the thing you schedule, not as an accident of the layer. Qin et al. measured throughput and SLO behavior on real Kimi traffic.",
          "Those are neighbor results. They show the tax is being paid down in production. They do not transfer onto an RTX 5050 8GB lab pin by citation. We do not train 3-trillion-parameter models. We do not publish joules per token. Taking their line as our win is how a methods page becomes a press release.",
        ],
      },
      {
        heading: "What would count as paying it",
        body: [
          "A joule claim needs a watt-hour instrument, a named baseline, and the same sequence mix on both sides. A latency claim needs decode, not a training forward at length 1024. A cache claim needs a length where KV dominates the working set. A routing claim still has to pass associative recall first. Skipping that order is how a faster mixer ships a model that cannot find what it wrote.",
          "Kimi's public line is that research seeks the optimal conversion from energy into intelligence. We take that as a question, not a slogan, and not a win. Optimal is not a word this page uses for our own results. Until those instruments run, energy is the reason the work exists. It is not a result we have in hand.",
        ],
      },
      {
        heading: "Read the other notes for the evidence",
        body: [
          "Recall, matched-parameter perplexity, constant-state memory, and the counted training wall are the measured pieces. This note is the motive. If those pieces fail, the energy story is still true and we have not moved it. That is the honest order, and it is why this card is a method note rather than a benchmark.",
        ],
      },
    ],
    citations: [
      {
        title: "Kimi Linear: An Expressive, Efficient Attention Architecture",
        href: "https://arxiv.org/abs/2510.26692",
        venue: "Moonshot AI, 2025.",
      },
      {
        title: "Mooncake: A KVCache-centric Disaggregated Architecture for LLM Serving",
        href: "https://arxiv.org/abs/2407.00079",
        venue: "Qin et al., 2024.",
      },
    ],
  },
  {
    slug: "muon",
    title: "Optimizer, Not Architecture",
    date: "2026-08-23",
    kind: "measurement",
    excerpt:
      "Muon cut lab T* about 3.5x on memorization extraction. Moonshot reports about 2x FLOP at scale. Those are different claims. Lion did not reopen the slot.",
    lead: "Muon is a Newton-Schulz orthogonalized optimizer. In this lab it shortened time-to-threshold on a memorization extraction task. It did not move geometric coherence, and it did not become a composition result.",
    cover: fieldIqAssets.nvidiaGpu,
    coverFallback: fieldIqAssets.fallbacks.nvidiaGpu,
    related: ["key-coherence", "associative-recall", "proof-first"],
    sections: [
      {
        heading: "Two Muon stories",
        body: [
          "Keller Jordan and collaborators introduced Muon as a matrix-level optimizer. Two-dimensional weights get a Newton-Schulz orthogonalized update. The point is to take a more cautious, better-conditioned step on the matrices that actually do the mixing, rather than treating every parameter as an independent Adam coordinate. It is an optimizer paper, not an architecture paper.",
          "Moonshot's Moonlight paper then asked whether that idea scales. Liu et al. reported that, at their scale, Muon reaches similar loss with about half the FLOPs of AdamW, once you add weight decay and a per-parameter update scale. They trained Moonlight, a 3B-active 16B MoE, on 5.7 trillion tokens. That is a compute-efficiency claim at LLM scale. It is not our number.",
          "Our number is time-to-threshold on a memorization extraction task. On the Field-IQ stack, Muon moved extraction T* from about 5500 steps under AdamW to about 1500 to 2000, a 3.5x cut. Answer loss at step 2000 under Muon was already better than AdamW at step 8000. Geometric coherence stayed flat near 0.31. That is optimizer dynamics on this bench. It is not Moonshot's 2x FLOP result, and it is not a new mixer.",
        ],
        figure: {
          src: fieldIqAssets.nvidiaGpu,
          fallbackSrc: fieldIqAssets.fallbacks.nvidiaGpu,
          label: "Lab training pin, consumer GPU",
        },
        table: {
          caption:
            "Field-IQ identity bench, memorization and replication tiers. Lab stack only. Not Moonshot's ~2x FLOP result.",
          columns: ["Lever", "What we saw", "Scope"],
          rows: [
            ["AdamW to Muon", "~3.5× faster extraction T*", "This stack, memorization regime"],
            ["Moonshot Muon", "~2× FLOP vs AdamW at scale", "Liu et al., not our T*"],
            ["Lion vs Muon", "Muon remains the bar", "2-seed replication, MUON_STANDS"],
            ["Write / read / geometry gadgets", "Parity or worse", "Structural regime, replicated"],
          ],
        },
      },
      {
        heading: "Coherence did not come along for the ride",
        body: [
          "The etiology question was whether slow extraction was an AdamW artifact: per-coordinate normalization struggling to carve a readout direction under superimposed keys. Muon answered that in one direction. Extraction got cheaper. Key coherence did not move. F1 is optimizer-invariant on this stack, inside the 0.28 to 0.33 band, under AdamW, Muon, and later Lion. Speed to memorize a closed set and geometric clustering of keys are different findings. Mixing them is how a blog post invents a theory of intelligence.",
          "That is why architecture-side decorrelators were the wrong next patch. If the optimizer that actually moves T* leaves coherence where it was, handing the model extra rotational degrees of freedom is unlikely to be the lever. T31 later confirmed the unused-rotation control. That measurement lives on the coherence note.",
        ],
      },
      {
        heading: "What breakaway was",
        body: [
          "N=40 answer loss can look like structure and still be entity-set memorization. On the holdout gate, in-pool answers sat near 1.6 to 1.7 while held-out answers rose to about 5.8 to 6.8. The model had learned the closed name set. It had not learned a composition rule that transfers to new names. Structural claims on this programme require a 640-name pool and entity holdout. Without that control, a fast optimizer can make a model memorize the closed set sooner. That is still useful. It is not composition, and it is not a reason to change the mixer.",
          "A Lion replication was run to test whether any fast orthogonal optimizer would do. The pre-registered bar was Lion within 0.05 perplexity of Muon and a T* ratio at most 1.25 on the seed-123 pair. Both clauses failed: Lion 2.134 versus Muon 2.031, T* 4250 versus 2500. Direction agreed on the second seed. Muon stands on this stack. Lion does not replace it.",
        ],
      },
      {
        heading: "How to use this",
        body: [
          "If a new mixer is proposed, it has to beat GDN under Muon, on the structural protocol, not under a weaker optimizer that makes every method look slow. Write-side gadgets, read-side tricks, and live decorrelators were already tried against that bar and came back at parity or worse. Optimizer gains are not architecture gains. We record them so they are not spent twice.",
        ],
      },
    ],
    citations: [
      {
        title: "Muon: An optimizer for hidden layers in neural networks",
        href: "https://kellerjordan.github.io/posts/muon/",
        venue: "Jordan et al., 2024.",
      },
      {
        title: "Muon is Scalable for LLM Training",
        href: "https://arxiv.org/abs/2502.16982",
        venue:
          "Liu et al., Moonshot, 2025. ~2x FLOP is their scale result, not our T*.",
      },
    ],
  },
  {
    slug: "proof-first",
    title: "What Died, And Why",
    date: "2026-08-28",
    kind: "method",
    excerpt:
      "Components with a theorem survived. Components justified by analogy died. That filter is now process, including how we adopted GDN.",
    lead: "Most research pages only show what shipped. This lab's public residue includes a kill list. Analogy is cheap. GPU time is not.",
    cover: fieldIqAssets.waveVector,
    coverFallback: fieldIqAssets.fallbacks.waveVector,
    related: ["diagonal-erase", "codebook-floor", "associative-recall"],
    sections: [
      {
        heading: "The filter that actually worked",
        body: [
          "Through the first half of this programme we tried solitons, Kuramoto oscillators, harmonic kernels, Lie folds, and a holographic field story. The pieces that had a precise claim and a proof or an identifying test survived as instruments. The pieces that were metaphors for how information might flow did not. That split is not a taste. It is the empirical record as of 2026-08-01, restated after the salvage audit of 2026-08-28.",
          "Soliton was analogy-only Kerr physics. A clean rescreen showed no recall gain. Kuramoto was neutral at short context and lost where it was supposed to win. Harmonic assumed kernel breadth was the recall bottleneck, a premise that was never measured. Recall stayed at 0.26 against a 0.5 bar. You cannot fix a bottleneck you have not established. Analogy to physics is not a substitute for that step.",
          "Bochner features and holographic reduced representations had statements about what they could represent. They survived as instruments even when they lost as mixers. The capacity bound that said a diagonal field cannot do key-selective erase survived by killing the field. Gated delta-rule memory survived because the rank-one write is the thing the theorem asked for, and because Yang et al. had already published the scan.",
        ],
        figure: {
          src: fieldIqAssets.waveVector,
          fallbackSrc: fieldIqAssets.fallbacks.waveVector,
          label: "Wave intuition. Not the mixer that won recall.",
        },
      },
      {
        heading: "Adoption is not invention",
        body: [
          "Diagonal holographic recall pinned at 0.25. Matrix-delta memory broke that ceiling, then audited the next day as GDN. FFT waves are O(n log n). That is a complexity class, not an invention. When we take a published technique, we do not write a new theorem for it. We reduce to the paper's baseline in high precision where the statement allows, measure the premise on our bench, and cite. GDN is on that path. It is the current mixer remainder. Calling it Field-IQ geometry is a branding error we already made once.",
          "The adoption lane is now programme law. It never emits a mechanism claim. Promotion to a claim requires the proof-first chain retroactively. Harmonic is the guardrail: premise measurement precedes any fair-tier spend. Occupancy gates claims, never questions. A late kill is ledgered as occupied adoption, never as novel failure.",
          "We still use wave language on the story page as intuition for 'do not compare every word to every word.' This research page does not promote that intuition to a result.",
        ],
        table: {
          caption:
            "Salvage audit, 2026-08-28. Process record. Claimed: nothing. Negative results are first-class.",
          columns: ["Object", "Status", "Honest remainder"],
          rows: [
            ["Soliton / Kuramoto / harmonic", "Dead", "Analogy, false or unmeasured premise"],
            ["Diagonal holographic field", "Ceiling", "Recall pinned ~0.25"],
            ["Matrix-delta / GDN", "Adopted", "Published linear memory, not a new mixer"],
            ["Capacity and coherence instruments", "Standing", "Diagnose the stack we train"],
          ],
        },
      },
      {
        heading: "The other ways a result dies",
        body: [
          "N=40 breakaway without entity holdout is not composition. Nested queries in increasing order are not multi-hop. Screens that rank under a shared learning rate are not claims. A 12M-parameter matrix that burns the weekly envelope without a question budget is not exploration, it is occupancy of the GPU. Those are method kills, and they belong next to the architecture kills because they produce the same public residue: a number that looked like a finding and was not.",
          "A new component needs a claim about what the current architecture cannot do, a proof or a complete sketch, a named gap (learnability is usually unproven), and a numeric bar at machine precision where the statement permits. Screens rank. They do not claim. That is the method. It is also why this card belongs next to the benchmarks rather than in a footnotes page.",
        ],
      },
    ],
    citations: [
      {
        title: "Gated Delta Networks: Improving Mamba2 with Delta Rule",
        href: "https://arxiv.org/abs/2412.06464",
        venue: "The published remainder after the analogy kills.",
      },
    ],
  },
  {
    slug: "key-coherence",
    title: "Why Readout Is Hard",
    date: "2026-08-10",
    kind: "measurement",
    excerpt:
      "On this stack, keys of one class cluster with cosine about 0.31. An unused rotation did not change that. Whether the objective chooses the geometry is still open.",
    lead: "F1 is a measurement: same-class keys are closer than chance on this lab stack. It is not a universal law, and it is not yet proof that the loss function selected the geometry.",
    cover: "/assets/field-iq/holo-wave.svg",
    coverFallback: fieldIqAssets.fallbacks.holo,
    related: ["codebook-floor", "cascade-load", "muon"],
    sections: [
      {
        heading: "The standing measurement",
        body: [
          "Fixed-size memory superimposes what it stores. Readout is an inner product against that pile. If the keys that address the pile point in similar directions, the inner product is crowded. You can still bind. Getting one binding back out is the slow step. That is the readout problem this page is about, and it is why a constant-size state is not a free lunch.",
          "On Field-IQ gated-delta stacks, the pairwise mean absolute cosine of written keys sits near 0.31 from early training through breakaway, inside a band of about 0.28 to 0.33. We see it under AdamW, Muon, and Lion, at memorization and structural pool sizes. Random would be near zero. That clustering is F1. It is reproducible here. It is not a law of every learner, and it is not a claim about public checkpoints of other houses. Cross-stack probes exist as measurements with their own caveats. This page does not promote them.",
          "Muon, which cut extraction time, left F1 where it was. Speed to memorize a closed set and geometric clustering of keys are different findings. Mixing them is how a blog post accidentally invents a theory of intelligence.",
        ],
        figure: {
          src: "/assets/field-iq/holo-wave.svg",
          fallbackSrc: fieldIqAssets.fallbacks.holo,
          label: "Superimposed field state, readout problem",
        },
        table: {
          caption:
            "Written-key coherence on Field-IQ gated-delta stacks. Lab measurement. Not a universal law. F13 remains open.",
          columns: ["Object", "Value", "Scope"],
          rows: [
            ["g_coh (mean |cos|)", "~0.31", "This lab stack, standing"],
            ["Optimizer", "Flat under AdamW, Muon, Lion", "Same band, 0.28–0.33"],
            ["Free key rotation (T31)", "Unused, coherence unmoved", "Not a hidden-frame miss"],
            ["F13 causal origin", "Open", "Not 'chosen by the objective'"],
          ],
        },
      },
      {
        heading: "What is still open",
        body: [
          "We ran an unused-rotation control (T31): apply a free per-position rotation on keys and queries that the model never has to use, then read F1 again. It did not spend those degrees of freedom on decorrelation. Clustering did not require a hidden frame we failed to ablate. Attacking coherence with another architectural gadget is closed on this stack. The geometry we measure is in the learned keys.",
          "F13 is the causal question: does the objective choose this clustering, or is clustering a side effect of a solution that would work without it, including a tokenizer codebook floor at layer one? A local denoising objective was screened against cross-entropy. Answer loss was viable. Geometry did not separate. The follow-up probe at layers two and three closed as unidentifiable at budget. We do not say coherence is selected by the loss. We say it appears, on this stack, and that the causal link is still a probe, not a result.",
        ],
      },
      {
        heading: "What it does not buy",
        body: [
          "Coherence is not capacity. A diagonal field can cluster keys and still fail MQAR. The routing win that followed was matrix-delta memory, which does not need this geometric story to be true. If keys stay aligned, a fancier write or a fancier geometry does not create a new address. It writes another vector into a crowded subspace. That is consistent with the kill list: read-side tricks, write-side gates, and a live decorrelator all failed to move extraction in the structural regime.",
          "F1 remains a measurement worth tracking. It is not the reason the architecture changed, and it is not a product metric. Future work has to route around coherence, or change the objective with an instrument that can falsify the idea. Until then, this is the constraint the rest of the programme pays for, stated without a causal leap.",
        ],
      },
    ],
  },
  {
    slug: "diagonal-erase",
    title: "Why a Diagonal Cannot Forget",
    date: "2026-08-01",
    kind: "method",
    excerpt:
      "If binding is invertible and elementwise, forget-this-key is just global decay. That is why every diagonal decoration we tried stuck near 0.25 recall until the state became a matrix.",
    lead: "The holographic mixer failed MQAR for a reason you can write on one line. Selective erase needs a rank-one projector. A diagonal cannot supply one.",
    cover: "/assets/field-iq/holo-wave.svg",
    coverFallback: fieldIqAssets.fallbacks.holo,
    related: ["associative-recall", "matched-ppl", "proof-first"],
    sections: [
      {
        heading: "The degeneracy",
        body: [
          "Holographic reduced representations bind with a diagonal, or with circular convolution that behaves like one in the Fourier basis. Unbinding is cheap: you invert the bind and hop to recover a noisy copy of the item. Plate published that in 1995. Forgetting a single key is a different operation. If the bind is invertible and elementwise, erase-at-key is equivalent to multiplying every stored association by the same decay. You cannot dim one address without dimming the rest.",
          "That statement is T4. It is a standing degeneracy, not a tuning miss. We verified the empirical prediction the same day we needed it: harmonic kernels, selective-decay cousins, and holo-noortho all pinned MQAR at about 0.25, plus or minus 0.01. Attention sat at 1.0. Sharper reads did not move the ceiling. The harmonic premise, that kernel breadth was the recall bottleneck, was never measured and died on contact. The premise was rank.",
        ],
        table: {
          caption:
            "T4 prediction on the 2026-08-01 MQAR probe. Standing degeneracy, not a tuning miss. Capacity for exact recall under linearly independent keys is T5, later realized as GDN-class matrix state.",
          columns: ["Object", "Prediction", "What we saw"],
          rows: [
            ["Invertible diagonal bind", "Erase equals global decay", "MQAR pinned at ~0.25"],
            ["Rank-one matrix write", "Key-selective overwrite", "MQAR 0.971"],
            ["Attention", "Induction lookup", "MQAR 1.00"],
          ],
        },
      },
      {
        heading: "What rank-one write actually is",
        body: [
          "Key-selective overwrite needs a projector onto the current key, then a write of the new value along that direction. In a matrix state that is a rank-one update. T5 says that under linearly independent keys, that write gives exact recall. We verified the exact-recall capacity statement to machine precision before treating the mixer as a candidate. Learnability by SGD is the usual unproven gap. Experiments closed that gap on MQAR at 0.971, then the next-day audit named the mixer.",
          "Schlag, Irie, and Schmidhuber published the delta rule as a fast-weight overwrite in 2021: subtract what you currently read at this key, then write the new value. Sequential, small-scale. Yang et al. 2024 parallelized it with a chunkwise WY scan. Gated DeltaNet added an adaptive forget gate. That is the family. T4 tells you why our diagonal field could not compete with it. T5 tells you what the family is doing that the diagonal cannot.",
        ],
      },
      {
        heading: "Occupied finer control",
        body: [
          "Later papers occupy the remaining write and decay knobs. Kimi Delta Attention makes decay channel-wise. Gated DeltaNet-2 splits erase and write into separate channel-wise gates, reducing to KDA if those gates collapse to one scalar and to GDN if decay collapses too. FG2-GDN replaces the scalar delta step size with a channel-wise vector, analogous to going from SGD to a per-coordinate adaptive optimizer. Those are neighbors. They do not reopen a diagonal mixer, and they are not Field-IQ inventions.",
          "Rahimi and Recht's random Fourier features, and Bochner's theorem behind them, are why a Bochner feature map was a legal instrument here. An instrument is not a mixer. Surviving as math is not surviving as architecture. That distinction is the whole of the proof-first note.",
          "What this page will not say: that we invented matrix memory, that Grassmannian geometry unlocked 97 percent recall, or that a wave on a grid can do key-selective erase if we tune it harder. The diagonal cannot forget one key. The matrix can. The published family already does. Our contribution, such as it is, was to kill the field with a theorem instead of with another month of screens.",
        ],
      },
    ],
    citations: [
      {
        title: "Holographic Reduced Representations",
        href: "https://doi.org/10.1109/72.377968",
        venue: "Plate, IEEE TNN 1995. Public parent of the diagonal bind.",
      },
      {
        title: "Linear Transformers Are Secretly Fast Weight Programmers",
        href: "https://arxiv.org/abs/2102.11174",
        venue: "Schlag, Irie, Schmidhuber, ICML 2021. Original delta-rule overwrite.",
      },
      {
        title: "Gated Delta Networks: Improving Mamba2 with Delta Rule",
        href: "https://arxiv.org/abs/2412.06464",
        venue: "Yang et al., ICLR 2025.",
      },
      {
        title: "Gated DeltaNet-2: Decoupling Erase and Write in Linear Attention",
        href: "https://arxiv.org/abs/2605.22791",
        venue: "Hatamizadeh, Choi, Kautz, 2026. Occupied write/erase split. Not a Field-IQ result.",
      },
      {
        title: "FG2-GDN: Enhancing Long-Context Gated Delta Networks with Doubly Fine-Grained Control",
        href: "https://arxiv.org/abs/2604.19021",
        venue: "Sun et al., 2026. Occupied channel-wise delta step. Not a Field-IQ result.",
      },
      {
        title: "Random Features for Large-Scale Kernel Machines",
        href: "https://papers.nips.cc/paper_files/paper/2007/hash/013a006f03dbc5392effeb8f18fda755-Abstract.html",
        venue: "Rahimi and Recht, NeurIPS 2007. Bochner features as instrument, not mixer.",
      },
    ],
  },
  {
    slug: "cascade-load",
    title: "Collapse by Load, Not Depth",
    date: "2026-08-18",
    kind: "measurement",
    excerpt:
      "On a leak-free ladder, depth 5 still learned when load was light. At three hops the cascade died between about 7 and 11 bindings per document, not when layers ran out.",
    lead: "A four-layer model was supposed to hit a wall at hop five. It did not. The cascade died when the document got crowded. That is a load boundary, not a depth theorem we still live on.",
    cover: "/assets/field-iq/benchmark-cascade-load.svg",
    coverFallback: fieldIqAssets.fallbacks.spatialGrid,
    related: ["false-depth", "key-coherence", "associative-recall"],
    sections: [
      {
        heading: "What we thought we were measuring",
        body: [
          "A four-layer model was supposed to hit a wall at hop five. That was P1: depth beyond layer count as a budget wall. If it had held, the story would have been that multi-hop composition needs depth the way transformers need induction heads stacked through layers. It did not hold. The cascade died when the document got crowded. That is a load boundary, not a depth theorem we still live on.",
          "We almost measured the wrong thing. T34 v1 nested each deeper query so that it contained the shallower query as a suffix. The model could copy the previous answer instead of hopping. A probe on that leaked run decoded the previous entity from early scan output at 0.97. Strip the lexical bridge and the copy collapsed to 0.17. v1 is voided for hops at or above 2. Decreasing query order plus a strip control is now standing discipline. The public-format version of that discipline is the false-depth note.",
        ],
      },
      {
        heading: "The leak-free ladder",
        body: [
          "v2 emits queries in strictly decreasing order and keeps a strip control. On that ladder, with one distractor as the yardstick, depths 1 through 5 all learned. Depth 5 finished at 2.37 and 2.38 against a floor of 2.83, with holdout at 2.03 and 1.97, on two seeds. A four-layer stack reading past its layer count is not a layer-budget wall. P1 as that wall is behaviorally falsified.",
          "Breakaway order was not depth-ordered. Depth 4 moved first, around step 3000. Depth 5 around 6000 to 6750. Depths 1 and 2 last. Deep queries sat nearer the facts. Depth 1's reworded surface mismatches fact keys. Surface form still confounds which hop looks first. The honest sentence is narrower than 'deeper is easier.' Forward-serial reading of hops deeper than the layer count is withdrawn. The bench was archived as a capability vehicle, not as a living reverse-walk theorem.",
        ],
      },
      {
        heading: "The load window",
        body: [
          "At three hops, load is the thing that moves. One extra name per document stays in a working band, final answer loss about 0.9 to 1.65. Four extra names make the deepest hop marginal first, around 2.63 to 2.66, near the floor. That 'deepest degrades first' signature is the compounding one, with a later re-read as farthest-from-sink after the walk-and-halt kill. Eight extra names collapse every depth to the floor. No breakaways. The measured boundary is between 7 and 11 bindings per document at the standing coherence of about 0.31.",
          "That is Thm 4 as a scoped measurement: compounding fails by crowding, not by running out of layers. Coherence stays in the picture because a crowded superimposed state is how the load arrives at readout. It is not a claim that Field-IQ composes arbitrarily. It is not a product multi-hop number. RULER's multi-hop tracing tasks are a public neighbor for the question, not a substitute for this ladder, and not a score we report.",
        ],
        table: {
          caption:
            "T34 v2, 2026-08-18, two seeds, decreasing query order, nd=1 yardstick then load sweep at k=3. Bench later archived. Report the boundary. Do not claim a living hop-depth theorem.",
          columns: ["Condition", "What held", "Read as"],
          rows: [
            ["k=5, nd=1", "Depth 5 learns (2.37 / 2.38 vs floor 2.83)", "Not a layer wall"],
            ["k=3, nd=1", "Sustained (ans ~0.9–1.65)", "Light load"],
            ["k=3, nd=4", "Deepest hop marginal (~2.63–2.66)", "Compounding signature"],
            ["k=3, nd=8", "All depths at floor", "Load collapse"],
            ["N_c(k=3)", "(7, 11) bindings/doc", "Measured window at γ≈0.31"],
          ],
        },
      },
    ],
    citations: [
      {
        title: "RULER: What's the Real Context Size of Your Long-Context Language Models?",
        href: "https://arxiv.org/abs/2404.06654",
        venue: "Hsieh et al., COLM 2024. Public neighbor for multi-hop tracing. Not our ladder.",
      },
    ],
  },
  {
    slug: "false-depth",
    title: "When a Probe Is Not Depth",
    date: "2026-08-23",
    kind: "method",
    excerpt:
      "Canonical RULER and passkey formats are mostly leak-clean. Several of them are still one-hop ceilings or multi-needle counts, not compositional depth.",
    lead: "A nested query that contains the previous query as a suffix is an induction-copy path. Public long-context tests can be clean of that leak and still fail to measure the thing their leaderboard name suggests.",
    cover: fieldIqAssets.spatialGrid,
    coverFallback: fieldIqAssets.fallbacks.spatialGrid,
    related: ["cascade-load", "associative-recall", "proof-first"],
    sections: [
      {
        heading: "The lab accident, generalized",
        body: [
          "F11 was discovered on our own depth ladder. Depth-j contained depth-(j minus 1) as a suffix. The model could copy the previous answer instead of composing a hop. A probe on the leaked run decoded the previous entity from early scan output at 0.97. Strip the lexical bridge and that copy collapsed. Decreasing query order plus a strip control is now standing eval discipline here. v1 is voided. v2 is the ladder we report.",
          "On 2026-08-23 we asked the same predicate of public formats, with no GPU: does a nested query suffix make induction-copy possible. The instrument encodes canonical strings and evaluates the F11 condition. Lab v1 was the positive control and fired. Lab v2 was the negative control and stayed clean. Verdict on the public set: CLEAN_WITH_CEILING. Clean of that leak, and still often not a depth measure.",
        ],
      },
      {
        heading: "One query is not composition",
        body: [
          "Passkey retrieval hides an integer in a long filler prompt and asks for it later. Landmark Attention (Mohtashami and Jaggi, NeurIPS 2023) is the usual academic source. Needle-in-a-haystack plants a fact in Paul Graham essays and sweeps length against depth. That is Greg Kamradt's 2023 GitHub test, not a paper. RULER is the academic expansion: Hsieh et al., COLM 2024, arguing that vanilla NIAH is too easy.",
          "Passkey and single-needle-in-a-haystack cannot leak by suffix nesting. They are one query per document. They are also a k equals 1 ceiling. Strip the lexical bridge and the task collapses to chance, because the task is the bridge. A model that aces passkey has found a needle. It has not shown that it can chain two needles. Reporting passkey as multi-hop is a category error, even when the format is leak-clean.",
        ],
      },
      {
        heading: "What RULER actually scores",
        body: [
          "RULER NIAH single, multi-key, and multi-value are clean on the F11 predicate and remain one hop per query. Multi-key and multi-value raise the recall count. They do not raise the hop depth. RULER multi-query packs sibling sub-queries into one composite question. There is no suffix nesting, so F11 does not fire. The score is a parallel recall count, not dependent-read depth. Treating an MQ number as a composition number is the generalized hazard.",
          "RULER variable tracking is clean as published: a single set query. A per-hop re-query variant of it would leak, and would need decreasing order plus a strip control before anyone called it depth. We did not claim to solve RULER. We did not run RULER-128k. This page is an identification audit of the formats, not a leaderboard.",
        ],
        table: {
          caption:
            "Zero-GPU F11-generalization audit, 2026-08-23. Verdict CLEAN_WITH_CEILING. Artifact: theory_run_20260823_f11_leak_audit.json. Do not claim RULER is solved.",
          columns: ["Format", "F11 suffix leak", "What the score is"],
          rows: [
            ["Passkey / NIAH", "Impossible (one query)", "k=1 ceiling"],
            ["RULER NIAH S/MK/MV", "Clean", "k=1 per query"],
            ["RULER MQ", "Clean (no suffix nesting)", "Multi-needle count, not depth"],
            ["RULER VT as published", "Clean", "Set query, not per-hop re-query"],
            ["Lab ladder v1 / v2", "Fired / clean", "Positive and negative controls"],
          ],
        },
      },
      {
        heading: "What this page is for",
        body: [
          "Read it before you read a depth ladder, a RULER number, or a product claim about long context. A format can be leak-clean and still be the wrong question. Passkey is a needle. MQAR is content addressing. A decreasing-order strip-controlled ladder is the only nested-query instrument we will stand behind, and even that bench is archived as a capability vehicle rather than as a living hop theorem.",
          "If a later paper reports a multi-hop win on a format we have not decoded, the first question is F11. The second is whether the score is a recall count. The third is whether a strip control exists. Those three questions are cheaper than another training run, and they have already voided a battery we liked.",
        ],
      },
    ],
    citations: [
      {
        title: "RULER: What's the Real Context Size of Your Long-Context Language Models?",
        href: "https://arxiv.org/abs/2404.06654",
        venue: "Hsieh et al., COLM 2024.",
      },
      {
        title: "Landmark Attention: Random-Access Infinite Context Length for Transformers",
        href: "https://arxiv.org/abs/2305.16300",
        venue: "Mohtashami and Jaggi, NeurIPS 2023. Canonical passkey source.",
      },
      {
        title: "LLMTest Needle In A Haystack",
        href: "https://github.com/gkamradt/LLMTest_NeedleInAHaystack",
        venue: "Kamradt, 2023. GitHub test, not a paper.",
      },
    ],
  },
  {
    slug: "codebook-floor",
    title: "The Codebook Floor",
    date: "2026-08-22",
    kind: "measurement",
    excerpt:
      "On byte data, layer-1 written-key coherence sits on a codebook Gram floor near 0.38. Trained BPE arms both landed near 0.264 and missed the transfer prediction. F13 stays open.",
    lead: "If layer one is a token codebook, some of the clustering we measure in keys is inherited from the alphabet, not chosen by the mixer. That is a measurement. It is not a closed origin theorem.",
    cover: "/assets/field-iq/deposit-diagram.svg",
    coverFallback: fieldIqAssets.fallbacks.deposit,
    related: ["key-coherence", "proof-first", "cascade-load"],
    sections: [
      {
        heading: "Why the alphabet might be in the keys",
        body: [
          "If layer one is a token codebook, some of the clustering we measure in keys is inherited from the alphabet, not chosen by the mixer. Byte data is an extreme codebook: 256 symbols, a Gram you can compute on a CPU. Subword data is a milder one. The question is whether written-key coherence at layer one sits on that Gram floor, and whether changing the tokenizer moves it in a way a formula can predict.",
          "Gao et al. named the representation degeneration problem: token embeddings collapse into a narrow cone. Yu et al. argued that rare-token gradients drag the whole vocabulary into that cone under maximum likelihood, and gated those gradients. Their result is embedding geometry in softmax transformers. It is the closest public neighbor. It is not a proof that gated-delta keys must cluster, and it is not F13 closed.",
        ],
      },
      {
        heading: "Byte data, a real floor",
        body: [
          "On the CPU codebook-floor probe, byte-level layer-1 coherence reproduced at 0.3817, matching an earlier 0.381726. That number sits on the Gram of the unigram codebook closely enough to take seriously as a screening floor. It is a measurement on a probe corpus, not a law of every byte-level model, and not a claim about public checkpoints.",
          "If the transfer story were true, a subword vocabulary should sit somewhere predictable between that floor and a more isotropic map. Smaller vocabularies should sit closer to the byte floor. That was the formula the trained battery was supposed to test.",
        ],
      },
      {
        heading: "BPE did not close the map",
        body: [
          "A trained BPE-GDN battery put 1k and 8k vocabularies through the same gated-delta stack. Both arms landed at mean layer-1 coherence about 0.264, against transfer predictions of 0.376 and 0.407. The two BPE arms were indistinguishable from each other. Both sat 0.118 below the byte floor. The transfer map failed at the trained layer. Status MIXED_RE_SCOPE. Not a law. Does not close F13.",
          "A later BPE-dropout premise check was flat, max absolute delta 0.0086 against a 0.01 bar, and spent no GPU. Segmentation methods in the wild are occupied: BLT, MambaByte, CANINE, H-Net. This page does not claim a tokenizer fixes coherence. It does not claim a tokenizer-to-capacity law. It says the codebook story remains open measurement on this stack, with a real byte floor and a failed transfer at the trained layer.",
          "I8, a continuous embedding-noise denoising objective, was screened against cross-entropy on the same gated-delta stack. Answer loss was viable. Layer-one coherence stayed pinned near the codebook number. Layers two and three did not separate cleanly, and the follow-up closed as unidentifiable at budget. Diffusion-LM and block-diffusion LMs occupy local denoising as a training method. They are not this measurement. F13 stays open. The codebook floor is an instrument on stacks we train, not an origin theorem we get to announce.",
        ],
        table: {
          caption:
            "Track A screening, 2026-08-22. CPU codebook floor plus trained BPE-GDN battery. F13 remains open. Not a tokenizer-to-capacity law.",
          columns: ["Arm", "Layer-1 γ", "Read as"],
          rows: [
            ["Byte codebook (CPU)", "0.3817", "Reproduced Gram floor"],
            ["BPE-1k trained", "~0.264", "Missed transfer 0.376"],
            ["BPE-8k trained", "~0.264", "Missed transfer 0.407; 1k ≈ 8k"],
            ["F13", "Open", "Not a living origin theorem"],
          ],
        },
      },
    ],
    citations: [
      {
        title:
          "Rare Tokens Degenerate All Tokens: Improving Neural Text Generation via Adaptive Gradient Gating for Rare Token Embeddings",
        href: "https://arxiv.org/abs/2109.03127",
        venue: "Yu et al., ACL 2022. Embedding-cone neighbor, not a GDN-key law.",
      },
      {
        title: "The Representation Degeneration Problem in Neural Language Models",
        href: "https://arxiv.org/abs/1907.12009",
        venue: "Gao et al., ICLR 2019. Names the cone.",
      },
      {
        title: "Diffusion-LM Improves Controllable Text Generation",
        href: "https://arxiv.org/abs/2205.14217",
        venue: "Li et al., 2022. Occupied neighbor for embedding-space denoising. Not I8.",
      },
    ],
  },
  {
    slug: "training-wall",
    title: "The Counted Training Wall",
    date: "2026-08-01",
    kind: "measurement",
    excerpt:
      "After the chunked scan shipped, the remaining training wall at context 1024 was 1.78 times, not an unexplained tax. FLOP count already expected about 2 times more mixing work.",
    lead: "A slower mixer is allowed to be slower if you can point at the arithmetic. The 1.78 times training wall at length 1024 is priced. It is not a serving law, and it is not mysterious.",
    cover: fieldIqAssets.nvidiaGpu,
    coverFallback: fieldIqAssets.fallbacks.nvidiaGpu,
    related: ["matched-ppl", "constant-state", "energy-wall"],
    sections: [
      {
        heading: "The first sequential tax",
        body: [
          "Matrix-delta memory was about 12 times slower than attention on the first sequential scan, 400 seconds versus 33 on the recall-day medium run. That number is real and uninteresting as a product fact. A Python loop over tokens is not a kernel. It did block context-1024 tests, which is why wall became an engineering item the same day the ceiling broke.",
          "Chunking is a pure speed knob once the math is equivalent. We have that equivalence obligation in fp64 before a fast path ships. D1 on the systems path: chunked output has to match the sequential reference at machine precision. Without that, a 1.78 times 'win' could be a different function. With it, the U-shape is accounting.",
        ],
      },
      {
        heading: "The U-shape",
        body: [
          "After the chunked scan shipped, a context-1024 medium sweep on bench.wall was a clean U. Chunk 32 sat at 3.56 times transformer++, 64 at 2.08, 128 at 1.78, 256 at 2.16, 512 at 3.08. Below 128 you pay Python-loop and kernel-launch overhead. Above 128 you pay quadratic work inside the chunk: Gram and triangular solve that grow with chunk length. Default moved from 64 to 128. Every later gmem run inherited the cut.",
          "The remaining 1.78 times gap at the operating point lives in complex einsums and a triangular solve, plus the fact that attention already has fused kernels. A back-of-envelope mixing-MAC count already predicted about 2.1 times before that fused-attention advantage. Measured 1.78 is the same story with better kernels on the other side. The deficit is priced, not mystical.",
        ],
        table: {
          caption:
            "bench.wall, ctx 1024, medium gmem vs transformer++, 2026-08-01. Training-step wall. Not decode. Not a serving claim. Pre-crossover regime, L at most 1024.",
          columns: ["Chunk", "Wall vs transformer++", "Regime"],
          rows: [
            ["32", "3.56×", "Launch-bound"],
            ["64", "2.08×", "Prior default"],
            ["128", "1.78×", "Operating point"],
            ["256", "2.16×", "Intra-chunk quadratic"],
            ["512", "3.08×", "Intra-chunk quadratic"],
          ],
        },
      },
      {
        heading: "Keep this off the serving page",
        body: [
          "The fair PPL run at context 1024 still paid about 3.5 times wall, 178 seconds versus 51, on the chunked scan of that day. That is a training-step tax on a scientific protocol. Track D decode on an 8GB card is a different instrument. Sequential GDN was slower there. A fused rematch was only directional. Working VRAM at lab length did not separate the arms in our favor.",
          "This page does not recycle 1.78 times as a product latency number. It does not claim asymptotic superiority at short context. Linear mixers earn their keep at lengths where attention's cache and quadratic prefill dominate. At 1024, on this card, you are still in the pre-crossover regime. The note exists so nobody has to rediscover the tax as a mystery, and so nobody has to sell it as a serving win.",
          "Dao and Gu's Mamba-2 paper is the systems neighbor: structured state-space duality, a layer that is a lot closer to fused attention than a Python scan. GDN's public title is literally improving Mamba-2 with the delta rule. Our 1.78 times is what you pay before that class of kernel is on the card. It is not a claim that we have that kernel, and it is not a claim that GDN is slower than attention as a law. It is a lab training-step price list.",
        ],
      },
    ],
    citations: [
      {
        title: "Gated Delta Networks: Improving Mamba2 with Delta Rule",
        href: "https://arxiv.org/abs/2412.06464",
        venue: "Yang et al., ICLR 2025. Chunkwise scan is theirs; this page prices our lab wall.",
      },
      {
        title: "Transformers are SSMs: Generalized Models and Efficient Algorithms Through Structured State Space Duality",
        href: "https://arxiv.org/abs/2405.21060",
        venue: "Dao and Gu, ICML 2024. Mamba-2 SSD, the family GDN was written against.",
      },
    ],
  },
];

export function getResearchArticles(): readonly ResearchArticle[] {
  return researchArticles;
}

export function getResearchArticle(slug: string): ResearchArticle | undefined {
  return researchArticles.find((article) => article.slug === slug);
}

export function getRelatedArticles(article: ResearchArticle): ResearchArticle[] {
  return article.related
    .map((slug) => getResearchArticle(slug))
    .filter((related): related is ResearchArticle => related != null);
}
