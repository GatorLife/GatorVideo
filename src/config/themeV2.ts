// GATOR Video V2 Theme Configuration
// Updated timing for GatorPromoV2 with pitch deck messaging

export { COLORS, TYPOGRAPHY, DIMENSIONS } from "./theme";

export const TIMING_V2 = {
  fps: 30,
  totalDuration: 2901, // ~97 seconds (6 scenes with transitions)

  // Scene durations in frames (30fps = 30 frames per second)
  scene1_readinessGap: 600, // 20 seconds - Video intro (8s) + Three gaps problem framing (12s)
  scene2_thesis: 210, // 7 seconds - "I Think" to "I Know" + logo
  scene3_pillars: 1470, // 49 seconds - Three pillars (18s + 19s + 12s)
  scene4_testimonial: 210, // 7 seconds - Dual testimonials (5s + 2s read time)
  scene5_security: 240, // 8 seconds - Trust signals (6s content + 2s buffer)
  scene6_cta: 300, // 10 seconds - CTA with 1s audio delay

  // Pillar sub-timing (within Scene 3) - includes 2s buffer at end
  pillar1_environment: 540, // 18 seconds (16s content + 2s buffer)
  pillar2_evaluator: 570, // 19 seconds (17s content + 2s buffer)
  pillar3_insights: 360, // 12 seconds (10s content + 2s buffer)

  // Transition durations
  fadeTransition: 15,
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
    compare: {
      traditional: {
        title: "Traditional Readiness",
        items: ["Gut feeling", "Static scenarios", "Drifting standards"],
      },
      verifiable: {
        title: "Verifiable Lethality",
        items: ["Data-driven", "Living scenarios", "NDAA compliant metrics"],
      },
    },
  },

  // Scene 3 - Thesis
  thesis: {
    transition: "From 'I Think' to 'I Know'",
    subtitle: "The Transition to Verifiable Readiness",
    tagline: "Gen AI Training & Operational Readiness",
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
    },
    pillar2: {
      title: "AI Evaluator",
      features: ["Zero Bias", "100% Precision", "Instant Assessment"],
      description: "Same standard for every operator,\nevery time",
    },
    pillar3: {
      title: "Reporting & Insights",
      features: ["Role-Based Truth", "JQR Compliant", "Predictive Analysis"],
      description: "Commander to operator,\neveryone sees their truth",
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
    metrics: [
      { label: "Work Roles", value: "54", status: "green" },
      { label: "Environment Generation", value: "10s", status: "green" },
      { label: "Scenarios", value: "∞", status: "green" },
    ],
    status: "FULLY MISSION CAPABLE",
  },

  // Scene 7 - CTA
  cta: {
    lines: ["Readiness", "Guaranteed."],
    pilot: "30 Day Pilot Ready",
    tagline: "Let's move from range time to readiness.",
    url: "GoGATOR.ai",
    contact: "Cole@GoGATOR.ai",
  },
};
