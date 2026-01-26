// Google Fonts Configuration for GATOR Video
// Fonts adapted from GatorLife/Gator repository theme

import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";

// Load all fonts
const interFont = loadInter();
const jetBrainsMonoFont = loadJetBrainsMono();

export const fontFamily = {
  inter: interFont.fontFamily,
  jetBrainsMono: jetBrainsMonoFont.fontFamily,
  // Aliases for convenience
  sans: interFont.fontFamily,
  mono: jetBrainsMonoFont.fontFamily,
};

// Export font styles for consistent usage
export const fontStyles = {
  heading: {
    fontFamily: fontFamily.inter,
    fontWeight: 700,
  },
  subheading: {
    fontFamily: fontFamily.inter,
    fontWeight: 600,
  },
  body: {
    fontFamily: fontFamily.inter,
    fontWeight: 400,
  },
  mono: {
    fontFamily: fontFamily.jetBrainsMono,
    fontWeight: 400,
  },
};
