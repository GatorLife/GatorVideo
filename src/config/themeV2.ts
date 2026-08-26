// GATOR Video V2 Theme Configuration
// Updated timing for GatorPromoV2 with pitch deck messaging

import { COLORS as PALETTE } from "./theme";

export { COLORS, TYPOGRAPHY, DIMENSIONS } from "./theme";

const FADE = 15;

// A TransitionSeries spans the sum of its sequences minus one fade per join.
// Deriving this (instead of hand-typing a total) is what keeps the composition
// length and the series length from drifting apart.
// NOTE: tsconfig `lib` is ["es2015"] - no Object.entries / Array.prototype.flat.
const seriesDuration = (parts: number[]): number =>
  parts.reduce((a, b) => a + b, 0) - FADE * (parts.length - 1);

const PILLARS = [540, 570, 360];

// Listed in the order they play in VideoV2.tsx. seriesDuration only sums, so
// the order does not change the total - but keeping it in playback order is
// what stops these comments from drifting away from the actual sequence.
const SCENES = [
  600, // scene1_readinessGap
  210, // scene2_thesis
  seriesDuration(PILLARS), // scene3_pillars
  580, // sceneA_stateOfArt
  490, // sceneB_businessModel
  240, // scene4_testimonial
  270, // scene5_security
  300, // scene6_cta
];

// TSM announcement Section VII.d.i: videos must be no longer than 5:00.
export const TSM_MAX_FRAMES = 9000;

export const TIMING_V2 = {
  fps: 30,
  // Derived, not hand-typed. 4025 frames = 134.2 seconds.
  totalDuration: seriesDuration(SCENES),

  // Scene durations in frames (30fps = 30 frames per second)
  scene1_readinessGap: 600, // 20 seconds - Video intro (8s) + Three gaps problem framing (12s)
  scene2_thesis: 210, // 7 seconds - "I Think" to "I Know" + logo
  scene3_pillars: seriesDuration(PILLARS), // 48 seconds - Three pillars (18s + 19s + 12s)
  // Scenes A and B are audio-derived, not hand-picked. Each voiceover plays at
  // playbackRate 1.1, so on-screen length is audioSeconds / 1.1 * 30, plus the
  // VO_LEAD_IN before it and a 2s hold after it.
  // SceneA.mp3 18.57s -> 507 frames; SceneB.mp3 14.94s -> 408 frames.
  sceneA_stateOfArt: 580, // 19.3 seconds - TSM element 3 (20 + 507 + 53)
  sceneB_businessModel: 490, // 16.3 seconds - TSM element 4 (20 + 408 + 62)
  scene4_testimonial: 240, // 8 seconds - Dual testimonials (5s + 3s read time)
  scene5_security: 270, // 9 seconds - Trust signals (6s content + 3s buffer)
  scene6_cta: 300, // 10 seconds - CTA with 1s audio delay

  // Frames of silence before each Scene A / Scene B voiceover starts, so the
  // eyebrow and title are on screen before the narration does.
  voLeadIn: 20,

  // Pillar sub-timing (within Scene 3) - includes 2s buffer at end
  pillar1_environment: PILLARS[0], // 18 seconds (16s content + 2s buffer)
  pillar2_evaluator: PILLARS[1], // 19 seconds (17s content + 2s buffer)
  pillar3_insights: PILLARS[2], // 12 seconds (10s content + 2s buffer)

  // Transition durations
  fadeTransition: FADE,
};

// Key messaging content for V2
export const MESSAGING_V2 = {
  // Scene 1 - Readiness Gap
  readinessGap: {
    title: "The Readiness Gap",
    gaps: [
      {
        name: "Standards Drift",
        description: "Requirements change faster\nthan training adapts",
      },
      {
        name: "Subjective Evaluation",
        description: "Same performance,\ndifferent scores",
      },
      {
        name: "Speed-of-Cyber",
        description: "Today's threats,\nyesterday's scenarios",
      },
    ],

    // Transcribed from public/Scene2.mp3 (the legacy numbering is off by one -
    // Scene2.mp3 is Scene 1's narration). Source of truth if it is regenerated.
    script:
      "Today's cyber threats evolve faster than traditional training can keep " +
      "pace. Your teams need real-world readiness, not just classroom theory.",
  },

  // Scene 3 - Thesis
  thesis: {
    transition: "From 'I Think' to 'I Know'",
    subtitle: "The Transition to Verifiable Readiness",
    tagline: "Gen AI Training & Operational Readiness",
    // TSM Announcement Section VI. The Criteria 2 rubric (40%) grades focus-area
    // alignment at every band - "Lacks alignment" is Marginal - so the area has to
    // be said out loud somewhere. Must match the area selected on the submission
    // form (Section VII.c.iv).
    focusArea: "TSM Strategic Focus Area — Developing a Digital-Age Workforce",

    // Transcribed from public/Scene3.mp3.
    script:
      "Introducing GATOR, the DoD's AI-powered platform for cyber training and " +
      "operational readiness.",
  },

  // Scene 4 - Three Pillars
  pillars: {
    pillar1: {
      title: "AI Environment Generation",
      features: [
        "Living Scenarios",
        "JQR/JCT&CS Alignment",
        "Dynamic Complexity",
      ],
      description: "Adaptive ranges that evolve\nwith the threat landscape",
      // Transcribed from public/Scene4_Pillar1.mp3. Note "in minutes, not days" -
      // this pillar owns the speed claim, which is why Scene A does not repeat it.
      script:
        "GATOR puts evaluators in control. With AI-generated network " +
        "environments, you can build realistic training scenarios in minutes, " +
        "not days. Define your objectives, let the AI construct the " +
        "infrastructure, and deploy evaluations to your team instantly.",
    },
    pillar2: {
      title: "AI Evaluator",
      features: ["Zero Bias", "Live Terminal Access", "Instant Assessment"],
      description: "Same standard for every operator,\nevery time",
      // Transcribed from public/Scene4_Pillar2.mp3. The narration is about
      // hands-on student work in live environments; the slide text is about
      // grading objectivity. See the mismatch note in CLAUDE.md.
      script:
        "Students access hands-on evaluations through an intuitive interface. " +
        "GATOR's built-in AI assistant guides them through each scenario. They " +
        "engage directly with live terminal environments, executing real " +
        "commands, analyzing actual network traffic, and demonstrating " +
        "practical skills under realistic conditions.",
    },
    pillar3: {
      title: "Reporting & Insights",
      features: ["Role-Based Truth", "JQR Compliant", "Predictive Analysis"],
      description: "Commander to operator,\neveryone sees their truth",
      // Transcribed from public/Scene4_Pillar3.mp3.
      script:
        "Administrators get instant visibility into performance. AI-powered " +
        "grading delivers consistent, objective assessments, freeing your " +
        "evaluators to focus on coaching and mission preparation.",
    },
  },

  // Scene 5 - Security
  security: {
    title: "Enterprise Ready",
    badges: [
      { label: "SIPR/JWICS Ready", icon: "shield" },
      { label: "On-Premise LLMs", icon: "server" },
      { label: "NIST\nCompliant", icon: "lock" },
      { label: "JCC2-R Integration", icon: "network" },
    ],
    subtitle: "Data Sovereignty & Mission Assurance",
    // Transcribed from public/Scene6_New.mp3.
    script:
      "Built for classified networks. On-prem LLMs, NIST compliant, JCC2-R " +
      "ready. Your data stays yours.",
  },

  // Scene 6 - Resolution
  resolution: {
    testimonial: {
      quote:
        "GATOR gives us defensible readiness data - not just range time.",
      author: "SMSgt Larsen",
      role: "Cyber Operations",
    },
    testimonial2: {
      quote:
        "Real-world cyber attacks we can evaluate on. Its exactly what operators need and what GATOR provides.",
      author: "Capt Lewis",
      role: "Sq/DO",
    },
    // Transcribed from public/Scene6.mp3.
    script: "Don't just take our word for it. Hear from the operators themselves.",
  },

  // Scene A - Advancing the State of the Art
  // TSM Announcement Section VII.e.iii. Rubric Criteria 3, weighted 35%.
  // The rubric's top band asks for two specific things: "a clear and persuasive
  // comparison to alternative approaches" and "relevant evidence". Those are the
  // two halves of this slide - evidence on the left, alternatives on the right.
  // Nothing here restates Scene 1 or the pillars, which is most of what the slide
  // used to be made of.
  stateOfArt: {
    eyebrow: "State of the Art",
    // Not a speed claim - Pillar 1's narration already says "in minutes, not
    // days", and repeating it here is the exact duplication this scene is being
    // rebuilt to remove. The loop (author the range, grade the operator, map to
    // JQR) is the one assertion no other scene makes.
    title: "Nothing else\ncloses the loop.",

    // Evidence. These are unfunded pilots, not paying customers - the narration
    // says "in evaluation across five squadrons" in the same breath as the numbers
    // land, so the bare "5" on screen is never read as adoption.
    metrics: [
      { value: "5", label: "Squadrons" },
      { value: "100+", label: "Evaluations" },
      { value: "30", label: "Templates" },
    ],

    // The alternatives comparison. This used to be Today-vs-GATOR, whose left
    // column restated Scene 1's three gaps one for one. Re-pointed at the named
    // alternatives instead, which is what Criteria 3 actually scores.
    // SplitCompare requires a `color` on each column.
    compare: {
      left: {
        title: "Alternatives",
        items: ["Hand grading", "Prebuilt ranges", "Commercial platforms"],
        color: PALETTE.warningRed,
      },
      right: {
        title: "GATOR",
        // Positionally parallel to the left column: each item answers the
        // alternative sitting opposite it.
        items: ["Graded by AI", "Authored on demand", "Mapped to JQR"],
        color: PALETTE.accentGreen,
      },
    },

    // Source of truth for public/SceneA.mp3. Regenerate from this text if the copy
    // changes - the recording will otherwise silently disagree with the slide.
    // Every sentence earns its place against Criteria 3: three alternatives and
    // why each is worse, then the evidence. The problem framing that used to open
    // this track was cut - Scene 1 already does that, and it is only worth 15%.
    script:
      "Grading is manual, and no two instructors score alike. Prebuilt ranges " +
      "go stale before they run. Commercial platforms map to no joint standard. " +
      "Only GATOR authors the range and grades against JQR. Five squadrons in " +
      "evaluation: a hundred-plus evaluations, thirty templates, thousands of " +
      "hours returned.",
  },

  // Scene B - Business Model
  // TSM Announcement Section VII.e.iv. Rubric Criteria 4, weighted 10%.
  // Section VII.e.iv is explicit and in full caps: NO non-public pricing,
  // rates, or proprietary pricing information may appear here - which is why
  // neither the slide nor the script below carries a figure.
  businessModel: {
    eyebrow: "Business Model",
    title: "Pilot first.\nThen license.",

    features: ["30-Day Pilot", "Annual Subscription", "Scales By Unit"],

    description: "Fixed scope, then fixed price.\nNot seeking development funding.",

    // Rendered as the ring on the right: 6 of 9 segments lit.
    trl: { level: 6, max: 9, label: "Demonstrated in a\nRelevant Environment" },

    // Required by Section VII.e.iv. Do not remove.
    disclaimer:
      "Business model structure only. No proprietary or non-public pricing shown.",

    // Source of truth for public/SceneB.mp3.
    script:
      "The model is simple. A fixed-scope thirty-day pilot with one unit. Then " +
      "a fixed-price annual license, scaling by unit as you grow. GATOR is at " +
      "TRL six. Prove it in your environment first.",
  },

  // Scene 7 - CTA
  cta: {
    lines: ["Readiness", "Guaranteed."],
    pilot: "30 Day Pilot Ready",
    tagline: "Let's move from range time to readiness.",
    url: "GoGATOR.ai",
    contact: "Support@GoGATOR.ai",
    // Transcribed from public/Scene7.mp3.
    script:
      "Train smarter, evaluate faster, dominate the mission. Visit GoGATOR.ai " +
      "and get your team ready today.",
  },
};
