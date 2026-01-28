import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../config/theme";
import { fontStyles } from "../config/fonts";

interface MetricDisplayProps {
  value: string;
  label: string;
  status?: "green" | "yellow" | "red";
  startFrame?: number;
  countUp?: boolean;
}

const STATUS_COLORS = {
  green: COLORS.successGreen,
  yellow: "#FFD700",
  red: COLORS.warningRed,
};

export const MetricDisplay: React.FC<MetricDisplayProps> = ({
  value,
  label,
  status = "green",
  startFrame = 0,
  countUp = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = frame - startFrame;

  // Parse numeric value for count-up animation
  const numericMatch = value.match(/^([\d.]+)(.*)$/);
  const numericValue = numericMatch ? parseFloat(numericMatch[1]) : 0;
  const suffix = numericMatch ? numericMatch[2] : value;

  // Count-up animation
  const countProgress = interpolate(relativeFrame, [0, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const displayValue = countUp && numericMatch
    ? `${(numericValue * countProgress).toFixed(numericValue % 1 === 0 ? 0 : 1)}${suffix}`
    : value;

  // Entrance animation
  const scale = spring({
    frame: relativeFrame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const opacity = interpolate(relativeFrame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const statusColor = STATUS_COLORS[status];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {/* Value */}
      <div
        style={{
          ...fontStyles.heading,
          fontSize: 72,
          color: statusColor,
        }}
      >
        {displayValue}
      </div>

      {/* Label */}
      <div
        style={{
          ...fontStyles.subheading,
          fontSize: 24,
          color: COLORS.grayText,
          textTransform: "uppercase",
          letterSpacing: 2,
          marginTop: 8,
        }}
      >
        {label}
      </div>

      {/* Status indicator dot */}
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: statusColor,
          marginTop: 12,
        }}
      />
    </div>
  );
};
