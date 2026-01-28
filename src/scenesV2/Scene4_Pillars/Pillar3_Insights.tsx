import React from "react";
import {
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  AbsoluteFill,
} from "remotion";
import { COLORS } from "../../config/theme";
import { MESSAGING_V2 } from "../../config/themeV2";
import { fontStyles } from "../../config/fonts";
import { ReadinessGauge } from "../../componentsV2/ReadinessGauge";
import { MetricDisplay } from "../../componentsV2/MetricDisplay";
import { GridPattern } from "../../components/GridPattern";

const { title, features, description } = MESSAGING_V2.pillars.pillar3;

export const Pillar3_Insights: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Pillar number badge animation
  const badgeScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Title animation
  const titleOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [15, 35], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Features staggered animation
  const featureStartFrame = 50;

  // Description animation
  const descOpacity = interpolate(frame, [140, 160], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Glow pulse
  const glowPulse = interpolate(
    Math.sin(frame * 0.08),
    [-1, 1],
    [0.6, 1]
  );

  // Metrics timing
  const metricsStartFrame = 60;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      {/* Subtle grid */}
      <GridPattern strokeColor={COLORS.accentGreen} opacity={0.05} />

      {/* Left side - Content */}
      <div
        style={{
          position: "absolute",
          left: 300,
          top: "50%",
          transform: "translateY(-50%)",
          width: 560,
        }}
      >
        {/* Pillar badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 20,
            transform: `scale(${badgeScale})`,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              backgroundColor: COLORS.accentGreen,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ...fontStyles.heading,
              fontSize: 28,
              color: COLORS.black,
              boxShadow: `0 0 ${20 * glowPulse}px ${COLORS.accentGreen}`,
            }}
          >
            3
          </div>
          <span
            style={{
              ...fontStyles.mono,
              fontSize: 24,
              color: COLORS.accentGreen,
              textTransform: "uppercase",
              letterSpacing: 3,
            }}
          >
            Pillar Three
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            ...fontStyles.heading,
            fontSize: 64,
            color: COLORS.white,
            margin: 0,
            marginBottom: 28,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          {title}
        </h2>

        {/* Features */}
        <div style={{ marginBottom: 28 }}>
          {features.map((feature, index) => {
            const delay = index * 20;
            const featureOpacity = interpolate(
              frame - featureStartFrame - delay,
              [0, 20],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            const featureX = interpolate(
              frame - featureStartFrame - delay,
              [0, 20],
              [-30, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginBottom: 16,
                  opacity: featureOpacity,
                  transform: `translateX(${featureX}px)`,
                }}
              >
                <div
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    backgroundColor: COLORS.accentGreen,
                    boxShadow: `0 0 10px ${COLORS.accentGreen}`,
                  }}
                />
                <span
                  style={{
                    ...fontStyles.subheading,
                    fontSize: 36,
                    color: COLORS.white,
                  }}
                >
                  {feature}
                </span>
              </div>
            );
          })}
        </div>

        {/* Description */}
        <p
          style={{
            ...fontStyles.body,
            fontSize: 26,
            color: COLORS.grayText,
            margin: 0,
            lineHeight: 1.6,
            opacity: descOpacity,
            borderLeft: `3px solid ${COLORS.accentGreen}40`,
            paddingLeft: 20,
            whiteSpace: "pre-line",
          }}
        >
          {description}
        </p>
      </div>

      {/* Right side - Dashboard visualization */}
      <div
        style={{
          position: "absolute",
          right: 340,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* Main gauge */}
        <ReadinessGauge
          value={87}
          targetValue={95}
          label="Unit Readiness"
          size={280}
          startFrame={20}
        />

        {/* Secondary metrics */}
        <div
          style={{
            display: "flex",
            gap: 60,
            marginTop: 16,
          }}
        >
          <MetricDisplay
            value="92%"
            label="Net Analyst"
            status="green"
            startFrame={metricsStartFrame}
            countUp
          />
          <MetricDisplay
            value="65%"
            label="Host Analyst"
            status="yellow"
            startFrame={metricsStartFrame + 15}
            countUp
          />
        </div>

      </div>

      {/* Corner accents */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          width: 60,
          height: 60,
          borderBottom: `2px solid ${COLORS.accentGreen}`,
          borderRight: `2px solid ${COLORS.accentGreen}`,
          opacity: 0.4,
        }}
      />
    </AbsoluteFill>
  );
};
