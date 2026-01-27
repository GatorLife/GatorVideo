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

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      {/* Subtle grid */}
      <GridPattern strokeColor={COLORS.accentGreen} opacity={0.05} />

      {/* Left side - Network graph visualization */}
      <div
        style={{
          position: "absolute",
          left: 80,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <NetworkGraph
          width={600}
          height={500}
          nodeCount={15}
          startFrame={30}
        />
      </div>

      {/* Right side - Content */}
      <div
        style={{
          position: "absolute",
          right: 80,
          top: "50%",
          transform: "translateY(-50%)",
          width: 550,
        }}
      >
        {/* Pillar badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
            transform: `scale(${badgeScale})`,
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              backgroundColor: COLORS.accentGreen,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ...fontStyles.heading,
              fontSize: 24,
              color: COLORS.black,
              boxShadow: `0 0 ${20 * glowPulse}px ${COLORS.accentGreen}`,
            }}
          >
            1
          </div>
          <span
            style={{
              ...fontStyles.mono,
              fontSize: 16,
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
            fontSize: 48,
            color: COLORS.white,
            margin: 0,
            marginBottom: 32,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          {title}
        </h2>

        {/* Features */}
        <div style={{ marginBottom: 32 }}>
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
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: COLORS.accentGreen,
                    boxShadow: `0 0 10px ${COLORS.accentGreen}`,
                  }}
                />
                <span
                  style={{
                    ...fontStyles.subheading,
                    fontSize: 26,
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
            fontSize: 20,
            color: COLORS.grayText,
            margin: 0,
            lineHeight: 1.6,
            opacity: descOpacity,
            borderLeft: `3px solid ${COLORS.accentGreen}40`,
            paddingLeft: 20,
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
