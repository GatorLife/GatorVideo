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
import { COLORS } from "../config/theme";
import { TIMING_V2, MESSAGING_V2 } from "../config/themeV2";
import { fontStyles } from "../config/fonts";
import { SecurityBadge } from "../componentsV2/SecurityBadge";
import { GridPattern } from "../components/GridPattern";

const { title, badges, subtitle } = MESSAGING_V2.security;

export const Scene5_Security: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtitle animation
  const subtitleOpacity = interpolate(frame, [90, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene fade out
  const sceneOpacity = interpolate(
    frame,
    [TIMING_V2.scene5_security - 20, TIMING_V2.scene5_security],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Glow effect
  const glowPulse = interpolate(
    Math.sin(frame * 0.06),
    [-1, 1],
    [0.5, 1]
  );

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black, opacity: sceneOpacity }}>
      <Audio src={staticFile("Scene6_New.mp3")} playbackRate={1.1} />
      {/* Subtle grid */}
      <GridPattern strokeColor={COLORS.accentGreen} opacity={0.06} />

      {/* Central glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 800,
          background: `radial-gradient(circle, ${COLORS.accentGreen}15 0%, transparent 60%)`,
          filter: "blur(80px)",
          opacity: glowPulse,
        }}
      />

      {/* Content */}
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 60,
        }}
      >
        {/* Shield icon */}
        <div
          style={{
            fontSize: 80,
            marginBottom: 20,
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
          }}
        >
          🏛️
        </div>

        {/* Title */}
        <h1
          style={{
            ...fontStyles.heading,
            fontSize: 56,
            color: COLORS.white,
            margin: 0,
            marginBottom: 60,
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            textShadow: `0 0 ${20 * glowPulse}px ${COLORS.accentGreen}30`,
          }}
        >
          {title}
        </h1>

        {/* Security badges */}
        <div
          style={{
            display: "flex",
            gap: 60,
            justifyContent: "center",
          }}
        >
          {badges.map((badge, index) => (
            <SecurityBadge
              key={index}
              label={badge.label}
              icon={badge.icon as "shield" | "server" | "lock" | "network"}
              startFrame={30}
              index={index}
            />
          ))}
        </div>

        {/* Subtitle */}
        <div
          style={{
            marginTop: 60,
            opacity: subtitleOpacity,
          }}
        >
          <span
            style={{
              ...fontStyles.subheading,
              fontSize: 24,
              color: COLORS.accentGreen,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            {subtitle}
          </span>
        </div>

        {/* Decorative security line */}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 100,
            right: 100,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${COLORS.accentGreen}30, transparent)`,
            opacity: subtitleOpacity,
          }}
        />

        {/* "SECURE" indicators on corners */}
        {[
          { top: 40, left: 40 },
          { top: 40, right: 40 },
          { bottom: 40, left: 40 },
          { bottom: 40, right: 40 },
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              ...pos,
              ...fontStyles.mono,
              fontSize: 12,
              color: COLORS.accentGreen,
              opacity: interpolate(frame, [60 + i * 10, 80 + i * 10], [0, 0.5], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            ● SECURE
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
