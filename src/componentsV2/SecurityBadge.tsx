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
        gap: 24,
        padding: 36,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {/* Icon container */}
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: 24,
          backgroundColor: `${COLORS.accentGreen}15`,
          border: `3px solid ${COLORS.accentGreen}40`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 ${25 * glowPulse}px ${COLORS.accentGreen}30`,
        }}
      >
        <span style={{ fontSize: 54 }}>{ICONS[icon]}</span>
      </div>

      {/* Label */}
      <span
        style={{
          ...fontStyles.subheading,
          fontSize: 27,
          color: COLORS.white,
          textAlign: "center",
          maxWidth: 210,
          whiteSpace: "pre-line",
        }}
      >
        {label}
      </span>

      {/* Checkmark */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          backgroundColor: COLORS.accentGreen,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 15px ${COLORS.accentGreen}`,
        }}
      >
        <span
          style={{
            color: COLORS.black,
            fontSize: 21,
            fontWeight: "bold",
          }}
        >
          ✓
        </span>
      </div>
    </div>
  );
};
