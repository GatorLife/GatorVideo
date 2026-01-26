import React from "react";
import { useCurrentFrame, interpolate, interpolateColors } from "remotion";
import { COLORS } from "../config/theme";
import { fontStyles } from "../config/fonts";

type StatusType = "red" | "yellow" | "green";

interface StatusIndicatorProps {
  status: StatusType;
  label?: string;
  size?: number;
  animate?: boolean;
  transitionFromStatus?: StatusType;
  transitionStartFrame?: number;
  transitionDuration?: number;
}

const STATUS_COLORS = {
  red: COLORS.warningRed,
  yellow: "#FFD700",
  green: COLORS.successGreen,
};

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  size = 24,
  animate = true,
  transitionFromStatus,
  transitionStartFrame = 0,
  transitionDuration = 30,
}) => {
  const frame = useCurrentFrame();

  // Color transition
  let currentColor = STATUS_COLORS[status];
  if (transitionFromStatus) {
    const progress = interpolate(
      frame - transitionStartFrame,
      [0, transitionDuration],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
    currentColor = interpolateColors(
      progress,
      [0, 1],
      [STATUS_COLORS[transitionFromStatus], STATUS_COLORS[status]]
    );
  }

  // Pulse animation
  const pulse = animate
    ? interpolate(Math.sin(frame * 0.15), [-1, 1], [0.8, 1.2])
    : 1;

  // Glow effect
  const glowSize = size * pulse * 0.5;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          position: "relative",
          width: size,
          height: size,
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: size + glowSize,
            height: size + glowSize,
            borderRadius: "50%",
            backgroundColor: currentColor,
            filter: `blur(${glowSize}px)`,
            opacity: 0.6,
          }}
        />
        {/* Main dot */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: size,
            height: size,
            borderRadius: "50%",
            backgroundColor: currentColor,
            boxShadow: `0 0 ${size / 2}px ${currentColor}`,
          }}
        />
      </div>
      {label && (
        <span
          style={{
            ...fontStyles.body,
            fontSize: size * 0.8,
            color: COLORS.white,
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
};
