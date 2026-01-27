import React from "react";
import { useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";
import { COLORS } from "../config/theme";
import { fontStyles } from "../config/fonts";

interface SecurityBadgeProps {
  label: string;
  icon: "shield" | "server" | "lock" | "network";
  startFrame?: number;
  index?: number;
}

const ICONS = {
  shield: "🛡️",
  server: "🖥️",
  lock: "🔒",
  network: "🔗",
};

export const SecurityBadge: React.FC<SecurityBadgeProps> = ({
  label,
  icon,
  startFrame = 0,
  index = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Staggered entrance based on index
  const delay = index * 15;
  const relativeFrame = frame - startFrame - delay;

  // Scale entrance
  const scale = spring({
    frame: relativeFrame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const opacity = interpolate(relativeFrame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle glow pulse
  const glowPulse = interpolate(
    Math.sin((frame + index * 20) * 0.06),
    [-1, 1],
    [0.5, 1]
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        padding: 24,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {/* Icon container */}
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 16,
          backgroundColor: `${COLORS.accentGreen}15`,
          border: `2px solid ${COLORS.accentGreen}40`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 ${20 * glowPulse}px ${COLORS.accentGreen}30`,
        }}
      >
        <span style={{ fontSize: 36 }}>{ICONS[icon]}</span>
      </div>

      {/* Label */}
      <span
        style={{
          ...fontStyles.subheading,
          fontSize: 18,
          color: COLORS.white,
          textAlign: "center",
          maxWidth: 140,
        }}
      >
        {label}
      </span>

      {/* Checkmark */}
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          backgroundColor: COLORS.accentGreen,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 10px ${COLORS.accentGreen}`,
        }}
      >
        <span
          style={{
            color: COLORS.black,
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          ✓
        </span>
      </div>
    </div>
  );
};
