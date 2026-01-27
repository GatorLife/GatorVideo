import React from "react";
import { useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";
import { COLORS } from "../config/theme";
import { fontStyles } from "../config/fonts";

interface PillarCardProps {
  title: string;
  features: string[];
  description: string;
  pillarNumber: 1 | 2 | 3;
  startFrame?: number;
}

const PILLAR_ICONS = {
  1: "🌐", // Environment/Network
  2: "🤖", // AI/Evaluator
  3: "📊", // Insights/Analytics
};

export const PillarCard: React.FC<PillarCardProps> = ({
  title,
  features,
  description,
  pillarNumber,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = frame - startFrame;

  // Card entrance animation
  const cardScale = spring({
    frame: relativeFrame,
    fps,
    config: { damping: 14, stiffness: 100, mass: 0.8 },
  });

  const cardOpacity = interpolate(relativeFrame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Staggered feature animations
  const featureDelays = [20, 35, 50];

  // Description fade in
  const descOpacity = interpolate(relativeFrame, [70, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Glow pulse
  const glowPulse = interpolate(
    Math.sin(relativeFrame * 0.1),
    [-1, 1],
    [0.5, 1]
  );

  return (
    <div
      style={{
        width: 500,
        padding: 40,
        backgroundColor: `${COLORS.secondary}`,
        borderRadius: 16,
        border: `2px solid ${COLORS.accentGreen}40`,
        opacity: cardOpacity,
        transform: `scale(${cardScale})`,
        boxShadow: `0 0 ${30 * glowPulse}px ${COLORS.accentGreen}30`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${COLORS.accentGreen}, ${COLORS.primaryLight})`,
        }}
      />

      {/* Pillar number badge */}
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
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
        }}
      >
        {pillarNumber}
      </div>

      {/* Icon */}
      <div
        style={{
          fontSize: 48,
          marginBottom: 16,
        }}
      >
        {PILLAR_ICONS[pillarNumber]}
      </div>

      {/* Title */}
      <h2
        style={{
          ...fontStyles.heading,
          fontSize: 32,
          color: COLORS.white,
          margin: 0,
          marginBottom: 24,
        }}
      >
        {title}
      </h2>

      {/* Features list */}
      <div style={{ marginBottom: 24 }}>
        {features.map((feature, index) => {
          const featureProgress = spring({
            frame: relativeFrame - featureDelays[index],
            fps,
            config: { damping: 15, stiffness: 120 },
          });

          const featureX = interpolate(featureProgress, [0, 1], [30, 0]);

          return (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 12,
                opacity: featureProgress,
                transform: `translateX(${featureX}px)`,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: COLORS.accentGreen,
                  boxShadow: `0 0 10px ${COLORS.accentGreen}`,
                }}
              />
              <span
                style={{
                  ...fontStyles.subheading,
                  fontSize: 22,
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
          fontSize: 18,
          color: COLORS.grayText,
          margin: 0,
          lineHeight: 1.5,
          opacity: descOpacity,
        }}
      >
        {description}
      </p>
    </div>
  );
};
