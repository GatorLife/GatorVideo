import React from "react";
import {
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  AbsoluteFill,
  Audio,
  staticFile,
} from "remotion";
import { COLORS } from "../../config/theme";
import { MESSAGING_V2 } from "../../config/themeV2";
import { fontStyles } from "../../config/fonts";
import { NetworkGraph } from "../../componentsV2/NetworkGraph";
import { GridPattern } from "../../components/GridPattern";

const { title, features, description } = MESSAGING_V2.pillars.pillar1;

export const Pillar1_Environment: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Pillar number badge animation
  const badgeScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Title animation (delayed for 16s duration)
  const titleOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [30, 60], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Features staggered animation (spread out more)
  const featureStartFrame = 100;
  const featureDelay = 45; // More time between each feature

  // Description animation (appears later in the scene)
  const descOpacity = interpolate(frame, [280, 320], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Glow pulse
  const glowPulse = interpolate(
    Math.sin(frame * 0.08),
    [-1, 1],
    [0.6, 1]
  );

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <Audio src={staticFile("Scene4_Pillar1.mp3")} />
      {/* Subtle grid */}
      <GridPattern strokeColor={COLORS.accentGreen} opacity={0.05} />

      {/* Left side - Network graph visualization */}
      <div
        style={{
          position: "absolute",
          left: 230,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <NetworkGraph
          width={750}
          height={600}
          nodeCount={15}
          startFrame={45}
        />
      </div>

      {/* Right side - Content */}
      <div
        style={{
          position: "absolute",
          right: 300,
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
            1
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
            Pillar One
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
            const delay = index * featureDelay;
            const featureOpacity = interpolate(
              frame - featureStartFrame - delay,
              [0, 30],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            const featureX = interpolate(
              frame - featureStartFrame - delay,
              [0, 30],
              [30, 0],
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

      {/* Corner accent */}
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 40,
          width: 60,
          height: 60,
          borderTop: `2px solid ${COLORS.accentGreen}`,
          borderRight: `2px solid ${COLORS.accentGreen}`,
          opacity: 0.4,
        }}
      />
    </AbsoluteFill>
  );
};
