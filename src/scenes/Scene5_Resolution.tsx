import React from "react";
import { useCurrentFrame, interpolate, interpolateColors, spring, useVideoConfig } from "remotion";
import { StatusIndicator } from "../components/StatusIndicator";
import { GridPattern } from "../components/GridPattern";
import { COLORS } from "../config/theme";
import { fontStyles } from "../config/fonts";

const METRICS = [
  { label: "Threat Detection", delay: 30, greenStatus: "REAL WORLD" },
  { label: "Evaluation Environment", delay: 60, greenStatus: "IMMEDIATE" },
  { label: "Capability Assessment", delay: 90, greenStatus: "ACCURATE" },
  { label: "Readiness Level", delay: 120, greenStatus: "OPTIMAL" },
];

export const Scene5_Resolution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background color transition from red to green
  const colorProgress = interpolate(frame, [0, 180], [0, 1], {
    extrapolateRight: "clamp",
  });

  const bgColor = interpolateColors(
    colorProgress,
    [0, 0.5, 1],
    ["#1a0505", "#0a0a0a", "#051a0a"]
  );

  const accentColor = interpolateColors(
    colorProgress,
    [0, 1],
    [COLORS.warningRed, COLORS.successGreen]
  );

  // Header text
  const headerProgress = spring({
    frame,
    fps,
    config: { damping: 200, stiffness: 100, mass: 0.5 },
  });

  // "READY" text appears at end
  const readyOpacity = interpolate(frame, [200, 240], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const readyScale = spring({
    frame: frame - 200,
    fps,
    config: { damping: 15, stiffness: 100, mass: 0.5 },
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: bgColor,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid pattern fades in */}
      <div style={{ opacity: colorProgress * 0.3 }}>
        <GridPattern strokeColor={accentColor} />
      </div>

      {/* Border that transitions color */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          border: `3px solid ${accentColor}`,
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: "50%",
          transform: `translateX(-50%) translateY(${(1 - headerProgress) * -30}px)`,
          opacity: headerProgress,
          textAlign: "center",
        }}
      >
        <span
          style={{
            ...fontStyles.heading,
            fontSize: 48,
            color: COLORS.white,
          }}
        >
          Transform Your Cyber Posture
        </span>
      </div>

      {/* Status indicators */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          gap: 40,
          alignItems: "flex-start",
        }}
      >
        {METRICS.map((metric, index) => {
          const metricProgress = interpolate(
            frame - metric.delay,
            [0, 60],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const statusTransitionStart = metric.delay + 30;
          const currentStatus =
            frame < statusTransitionStart
              ? "red"
              : frame < statusTransitionStart + 30
                ? "yellow"
                : "green";

          return (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 30,
                opacity: metricProgress,
                transform: `translateX(${(1 - metricProgress) * -50}px)`,
              }}
            >
              <StatusIndicator
                status={currentStatus as "red" | "yellow" | "green"}
                size={32}
                transitionFromStatus={
                  currentStatus === "yellow"
                    ? "red"
                    : currentStatus === "green"
                      ? "yellow"
                      : undefined
                }
                transitionStartFrame={0}
                transitionDuration={30}
              />
              <span
                style={{
                  ...fontStyles.subheading,
                  fontSize: 36,
                  color: COLORS.white,
                  minWidth: 340,
                }}
              >
                {metric.label}
              </span>
              <span
                style={{
                  ...fontStyles.mono,
                  fontSize: 28,
                  fontWeight: 700,
                  color: accentColor,
                  marginLeft: 20,
                }}
              >
                {currentStatus === "green"
                  ? metric.greenStatus
                  : currentStatus === "yellow"
                    ? "IMPROVING..."
                    : "AT RISK"}
              </span>
            </div>
          );
        })}
      </div>

      {/* READY text */}
      <div
        style={{
          position: "absolute",
          bottom: 140,
          left: "50%",
          transform: `translateX(-50%) scale(${readyScale})`,
          opacity: readyOpacity,
          textAlign: "center",
          whiteSpace: "nowrap",
        }}
      >
        <span
          style={{
            ...fontStyles.heading,
            fontSize: 80,
            color: COLORS.white,
          }}
        >
          Fully Mission Capable
        </span>
      </div>
    </div>
  );
};
