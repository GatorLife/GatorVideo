import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../config/theme";
import { fontStyles } from "../config/fonts";

interface GlowTextProps {
  children: React.ReactNode;
  color?: string;
  glowColor?: string;
  fontSize?: number;
  fontStyle?: keyof typeof fontStyles;
  glowIntensity?: number;
  animate?: boolean;
}

export const GlowText: React.FC<GlowTextProps> = ({
  children,
  color = COLORS.white,
  glowColor = COLORS.accentGreen,
  fontSize = 48,
  fontStyle = "heading",
  glowIntensity = 1,
  animate = true,
}) => {
  const frame = useCurrentFrame();

  // Pulsing glow effect
  const glowMultiplier = animate
    ? interpolate(Math.sin(frame * 0.08), [-1, 1], [0.6, 1])
    : 1;

  const intensity = glowIntensity * glowMultiplier;

  const textShadow = `
    0 0 ${10 * intensity}px ${glowColor},
    0 0 ${20 * intensity}px ${glowColor},
    0 0 ${40 * intensity}px ${glowColor},
    0 0 ${80 * intensity}px ${glowColor}
  `;

  return (
    <span
      style={{
        ...fontStyles[fontStyle],
        fontSize,
        color,
        textShadow,
        display: "inline-block",
      }}
    >
      {children}
    </span>
  );
};
