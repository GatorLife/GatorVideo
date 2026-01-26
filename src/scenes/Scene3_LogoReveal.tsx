import React from "react";
import { useCurrentFrame, spring, useVideoConfig, interpolate, staticFile, Img } from "remotion";
import { COLORS } from "../config/theme";
import { fontStyles } from "../config/fonts";

export const Scene3_LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo scale animation
  const logoScale = spring({
    frame,
    fps,
    config: {
      damping: 12,
      stiffness: 80,
      mass: 0.8,
    },
  });

  // Glow intensity builds up
  const glowIntensity = interpolate(frame, [0, 60, 120], [0, 1, 1.5], {
    extrapolateRight: "clamp",
  });

  // Tagline fade in
  const taglineOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtitle text
  const subtitleOpacity = interpolate(frame, [100, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.black,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Logo */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          marginBottom: 40,
          filter: `drop-shadow(0 0 ${20 * glowIntensity}px ${COLORS.accentGreen})`,
        }}
      >
        <Img
          src={staticFile("gator-logo.png")}
          style={{
            width: 400,
            height: "auto",
            objectFit: "contain",
          }}
        />
      </div>

      {/* GATOR text */}
      <div
        style={{
          transform: `scale(${logoScale})`,
        }}
      >
        <span
          style={{
            ...fontStyles.heading,
            fontSize: 96,
            color: COLORS.white,
          }}
        >
          GATOR
        </span>
      </div>

      {/* Tagline */}
      <div
        style={{
          marginTop: 20,
          opacity: taglineOpacity,
        }}
      >
        <span
          style={{
            ...fontStyles.subheading,
            fontSize: 36,
            color: COLORS.accentGreen,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          Gen AI Training & Operational Readiness
        </span>
      </div>

      {/* Subtitle */}
      <div
        style={{
          marginTop: 30,
          opacity: subtitleOpacity,
        }}
      >
        <span
          style={{
            ...fontStyles.body,
            fontSize: 28,
            color: COLORS.white,
            opacity: 0.8,
          }}
        >
          The DoD's Premier Cyber Readiness Platform
        </span>
      </div>

      {/* Decorative lines */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 100,
          right: 100,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${COLORS.accentGreen}20, transparent)`,
          transform: "translateY(-150px)",
          opacity: taglineOpacity,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 100,
          right: 100,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${COLORS.accentGreen}20, transparent)`,
          transform: "translateY(200px)",
          opacity: taglineOpacity,
        }}
      />
    </div>
  );
};
