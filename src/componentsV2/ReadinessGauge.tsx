import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../config/theme";
import { fontStyles } from "../config/fonts";

interface ReadinessGaugeProps {
  value: number; // 0-100
  targetValue?: number;
  label?: string;
  size?: number;
  startFrame?: number;
}

export const ReadinessGauge: React.FC<ReadinessGaugeProps> = ({
  value,
  targetValue = 95,
  label = "Unit Readiness",
  size = 300,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = frame - startFrame;

  // Entrance animation
  const entranceProgress = spring({
    frame: relativeFrame,
    fps,
    config: { damping: 15, stiffness: 60 },
  });

  // Value animation (fills up)
  const animatedValue = interpolate(relativeFrame, [20, 80], [0, value], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Calculate arc parameters
  const strokeWidth = size * 0.08;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * 0.75; // 270 degrees
  const valueOffset = arcLength * (1 - animatedValue / 100);

  // Status color based on value
  const getStatusColor = (v: number) => {
    if (v >= 90) return COLORS.successGreen;
    if (v >= 70) return "#FFD700";
    return COLORS.warningRed;
  };

  const statusColor = getStatusColor(animatedValue);

  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        opacity: entranceProgress,
        transform: `scale(${entranceProgress})`,
      }}
    >
      <svg width={size} height={size} style={{ transform: "rotate(135deg)" }}>
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={COLORS.border}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${arcLength} ${circumference}`}
        />

        {/* Value arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={statusColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeDashoffset={valueOffset}
        />

      </svg>

      {/* Center content */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -40%)",
          textAlign: "center",
        }}
      >
        {/* Value */}
        <div
          style={{
            ...fontStyles.heading,
            fontSize: size * 0.25,
            color: statusColor,
          }}
        >
          {Math.round(animatedValue)}%
        </div>

        {/* Label */}
        <div
          style={{
            ...fontStyles.subheading,
            fontSize: size * 0.06,
            color: COLORS.grayText,
            textTransform: "uppercase",
            letterSpacing: 2,
            marginTop: 8,
          }}
        >
          {label}
        </div>
      </div>

      {/* Status indicators */}
      <div
        style={{
          position: "absolute",
          bottom: size * 0.02,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 16,
        }}
      >
        {[
          { label: "Low", color: COLORS.warningRed },
          { label: "Med", color: "#FFD700" },
          { label: "High", color: COLORS.successGreen },
        ].map((status, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: status.color,
              }}
            />
            <span
              style={{
                ...fontStyles.mono,
                fontSize: size * 0.04,
                color: COLORS.grayText,
              }}
            >
              {status.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
