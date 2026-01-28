// GATOR Video V2 Theme Configuration
// Updated timing for GatorPromoV2 with pitch deck messaging

export { COLORS, TYPOGRAPHY, DIMENSIONS } from "./theme";

export const TIMING_V2 = {
  fps: 30,
  totalDuration: 1950, // ~65 seconds

  // Scene durations in frames (30fps = 30 frames per second)
  scene1_hook: 180, // 6 seconds - Matrix intro with NDAA reference
  scene2_readinessGap: 240, // 8 seconds - Three gaps problem framing
  scene3_thesis: 150, // 5 seconds - "I Think" to "I Know" + logo
  scene4_pillars: 720, // 24 seconds - Three pillars (8s each)
  scene5_security: 180, // 6 seconds - Trust signals
  scene6_resolution: 240, // 8 seconds - Testimonial + metrics
  scene7_cta: 240, // 8 seconds - Updated CTA with pilot mention

  // Pillar sub-timing (within Scene 4)
  pillar1_environment: 240, // 8 seconds
  pillar2_evaluator: 240, // 8 seconds
  pillar3_insights: 240, // 8 seconds

  // Transition durations
  glitchTransition: 12,
  fadeTransition: 15,
};

// Key messaging content for V2
export const MESSAGING_V2 = {
  // Scene 1 - Hook
  hook: {
    line1: "Are we mission ready?",
    line2: "STATUS: UNKNOWN",
    line3: "Congress demands proof.",
  },

  // Scene 2 - Readiness Gap
  readinessGap: {
    title: "The Readiness Gap",
    gaps: [
      {
        name: "Standards Drift & Churn",
        description: "JQR/JCT&CS cycle creates moving targets",
      },
      {
        name: "Subjective Evaluation",
        description: "Examiner fatigue introduces bias",
      },
      {
        name: "Speed-of-Change Gap",
        description: "Threats outpace training syllabi",
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
      description: "Adaptive ranges that evolve with the threat landscape",
    },
    pillar2: {
      title: "AI Evaluator",
      features: ["Zero Bias", "100% Precision", "Instant Assessment"],
      description: "Same standard for every operator, every time",
    },
    pillar3: {
      title: "Reporting & Insights",
      features: ["Role-Based Truth", "JQR Compliant", "Predictive Analysis"],
      description: "Commander to operator - everyone sees their truth",
    },
  },

  // Scene 5 - Security
  security: {
    title: "Enterprise Ready",
    badges: [
      { label: "SIPR/JWICS Ready", icon: "shield" },
      { label: "On-Premise LLMs", icon: "server" },
      { label: "Zero PII Retention", icon: "lock" },
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
    metrics: [
      { label: "Accuracy", value: "99.8%", status: "green" },
      { label: "Network Defense", value: "92%", status: "green" },
      { label: "Response Time", value: "0.2s", status: "green" },
    ],
    status: "FULLY MISSION CAPABLE",
  },

  // Scene 7 - CTA
  cta: {
    lines: ["Prove", "Mission", "Readiness."],
    pilot: "60-90 Day Pilot",
    tagline: "Let's move from range time to readiness.",
    url: "GoGATOR.ai",
    contact: "Cole@GoGATOR.ai",
  },
};
