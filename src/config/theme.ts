// GATOR Video Theme Configuration
// Colors adapted from GatorLife/Gator repository theme

export const COLORS = {
  // Primary brand colors (from gator-green palette)
  primary: "#07D96A",        // Main brand green (gator-green-500)
  primaryLight: "#2CF28D",   // Lighter accent (gator-green-400)
  primaryDark: "#038C44",    // Darker variant (gator-green-700)
  primaryDeep: "#0B5B32",    // Deep green (gator-green-900)

  // Semantic colors
  success: "#07D96A",        // Same as primary
  warning: "#FF8C00",        // Orange warning
  error: "#7F1D1D",          // Destructive red (darker)
  info: "#3B82F6",           // Blue info

  // Chart colors (for data visualization)
  chart1: "#07D96A",         // Green
  chart2: "#84CC16",         // Yellow-green
  chart3: "#F97316",         // Orange
  chart4: "#3B82F6",         // Blue
  chart5: "#EC4899",         // Pink

  // Role colors
  roleAdmin: "#A855F7",      // Purple
  roleStudent: "#3B82F6",    // Blue
  roleInstructor: "#07D96A", // Green
  roleSuper: "#EF4444",      // Red

  // Neutrals
  white: "#FAFAFA",          // Off-white foreground
  black: "#000000",
  darkBg: "#0A0A0A",         // Near-black background
  secondary: "#272729",      // Dark gray-blue secondary
  muted: "#71717A",          // Muted text (zinc-500)
  grayText: "#A1A1AA",       // Gray text (zinc-400)
  border: "#27272A",         // Border color (zinc-800)

  // Legacy aliases for compatibility
  deepGreen: "#0B5B32",
  accentGreen: "#07D96A",
  matrixGreen: "#2CF28D",
  warningRed: "#EF4444",
  successGreen: "#07D96A",
};

export const TIMING = {
  fps: 30,
  totalDuration: 3240, // ~108 seconds (Scene 7 extended to 330 frames)

  // Scene durations in frames
  scene1_hook: 240, // 0:00-0:08 (8 seconds)
  scene2_problem: 300, // 0:08-0:18 (10 seconds)
  scene3_logoReveal: 210, // 0:18-0:25 (7 seconds)
  scene4_productDemo: 1740, // 0:25-1:23 (58 seconds) - 600 + 690 + 450 frames
  scene5_resolution: 300, // 1:23-1:33 (10 seconds)
  scene6_testimonial: 210, // 1:33-1:40 (7 seconds)
  scene7_cta: 330, // 1:40-1:51 (11 seconds) - includes 4s video intro

  // Transition durations
  glitchTransition: 15,
  fadeTransition: 20,
};

export const TYPOGRAPHY = {
  heading: {
    fontFamily: "Inter",
    fontWeight: 700,
  },
  subheading: {
    fontFamily: "Inter",
    fontWeight: 600,
  },
  body: {
    fontFamily: "Inter",
    fontWeight: 400,
  },
  mono: {
    fontFamily: "JetBrains Mono",
    fontWeight: 400,
  },
};

export const DIMENSIONS = {
  width: 1920,
  height: 1080,
};
