import React from "react";
import {
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  AbsoluteFill,
  interpolateColors,
} from "remotion";
import { COLORS } from "../config/theme";
import { TIMING_V2, MESSAGING_V2 } from "../config/themeV2";
import { fontStyles } from "../config/fonts";
import { StatusIndicator } from "../components/StatusIndicator";
import { MetricDisplay } from "../componentsV2/MetricDisplay";

const { metrics, status } = MESSAGING_V2.resolution;

export const Scene7_Metrics: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Metrics fade in
  const metricsOpacity = interpolate(
    frame,
    [0, 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Background color transition (red to green)
  const bgColor = interpolateColors(
    frame,
    [0, 60],
    [`${COLORS.warningRed}08`, `${COLORS.accentGreen}08`]
  );

  // Status text animation
  const statusScale = spring({
    frame: frame - 60,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const statusOpacity = interpolate(
    frame,
    [60, 80],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Scene fade out
  const sceneOpacity = interpolate(
    frame,
    [TIMING_V2.scene7_metrics - 20, TIMING_V2.scene7_metrics],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.black,
        opacity: sceneOpacity,
      }}
    >
      {/* Dynamic background */}
      <AbsoluteFill
        style={{
          backgroundColor: bgColor,
          transition: "background-color 0.5s",
        }}
      />

      {/* Metrics phase */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: metricsOpacity,
        }}
      >
        {/* Metrics row */}
        <div
          style={{
            display: "flex",
            gap: 80,
            marginBottom: 60,
          }}
        >
          {metrics.map((metric, index) => (
            <MetricDisplay
              key={index}
              value={metric.value}
              label={metric.label}
              status={metric.status as "green" | "yellow" | "red"}
              startFrame={index * 15}
              countUp
            />
          ))}
        </div>

        {/* Status indicator transition */}
        <div
          style={{
            display: "flex",
            gap: 40,
            marginBottom: 40,
            opacity: statusOpacity,
          }}
        >
          <StatusIndicator
            status="green"
            label=""
            size={20}
            transitionFromStatus="red"
            transitionStartFrame={30}
            transitionDuration={40}
          />
          <StatusIndicator
            status="green"
            label=""
            size={20}
            transitionFromStatus="red"
            transitionStartFrame={35}
            transitionDuration={40}
          />
          <StatusIndicator
            status="green"
            label=""
            size={20}
            transitionFromStatus="red"
            transitionStartFrame={40}
            transitionDuration={40}
          />
        </div>

        {/* Status text */}
        <div
          style={{
            opacity: statusOpacity,
            transform: `scale(${Math.max(0, statusScale)})`,
            marginTop: 40,
          }}
        >
          <span
            style={{
              ...fontStyles.heading,
              fontSize: 48,
              color: COLORS.accentGreen,
              letterSpacing: 6,
            }}
          >
            {status}
          </span>
        </div>
      </div>

      {/* Corner accents */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          width: 60,
          height: 60,
          borderTop: `2px solid ${COLORS.accentGreen}`,
          borderLeft: `2px solid ${COLORS.accentGreen}`,
          opacity: 0.3,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 30,
          right: 30,
          width: 60,
          height: 60,
          borderBottom: `2px solid ${COLORS.accentGreen}`,
          borderRight: `2px solid ${COLORS.accentGreen}`,
          opacity: 0.3,
        }}
      />
    </AbsoluteFill>
  );
};
