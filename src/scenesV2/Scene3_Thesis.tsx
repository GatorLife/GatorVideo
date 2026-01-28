import React from "react";
import {
  useCurrentFrame,
  spring,
  useVideoConfig,
  interpolate,
  staticFile,
  Img,
} from "remotion";
import { COLORS } from "../config/theme";
import { TIMING_V2, MESSAGING_V2 } from "../config/themeV2";
import { fontStyles } from "../config/fonts";

const { transition, subtitle, tagline } = MESSAGING_V2.thesis;

export const Scene3_Thesis: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo animation
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 80, mass: 0.8 },
  });

  const logoOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Transition text animation
  const transitionOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtitle animation
  const subtitleOpacity = interpolate(frame, [60, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tagline animation
  const taglineOpacity = interpolate(frame, [90, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Glow intensity builds up
  const glowIntensity = interpolate(frame, [0, 60, 120], [0, 0.8, 1.2], {
    extrapolateRight: "clamp",
  });

  // Scene fade out
  const sceneOpacity = interpolate(
    frame,
    [TIMING_V2.scene3_thesis - 15, TIMING_V2.scene3_thesis],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

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
        opacity: sceneOpacity,
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 800,
          background: `radial-gradient(circle, ${COLORS.accentGreen}20 0%, transparent 60%)`,
          filter: "blur(60px)",
          opacity: glowIntensity * 0.5,
        }}
      />

      {/* Transition statement - "From 'I Think' to 'I Know'" */}
      <div
        style={{
          opacity: transitionOpacity,
          marginBottom: 50,
        }}
      >
        <span
          style={{
            ...fontStyles.heading,
            fontSize: 64,
            color: COLORS.white,
          }}
        >
          {transition}
        </span>
      </div>

      {/* Logo */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
          marginBottom: 30,
          filter: `drop-shadow(0 0 ${25 * glowIntensity}px ${COLORS.accentGreen})`,
        }}
      >
        <Img
          src={staticFile("gator-logo.png")}
          style={{
            width: 280,
            height: "auto",
            objectFit: "contain",
          }}
        />
      </div>

      {/* GATOR text */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
        }}
      >
        <span
          style={{
            ...fontStyles.heading,
            fontSize: 72,
            color: COLORS.white,
            letterSpacing: 8,
          }}
        >
          GATOR
        </span>
      </div>

      {/* Subtitle */}
      <div
        style={{
          marginTop: 24,
          opacity: subtitleOpacity,
        }}
      >
        <span
          style={{
            ...fontStyles.subheading,
            fontSize: 28,
            color: COLORS.accentGreen,
            letterSpacing: 3,
          }}
        >
          {subtitle}
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
            ...fontStyles.body,
            fontSize: 22,
            color: COLORS.grayText,
          }}
        >
          {tagline}
        </span>
      </div>

      {/* Decorative lines */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 80,
          right: 80,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${COLORS.accentGreen}25, transparent)`,
          transform: "translateY(-200px)",
          opacity: transitionOpacity * 0.5,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 80,
          right: 80,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${COLORS.accentGreen}25, transparent)`,
          transform: "translateY(200px)",
          opacity: subtitleOpacity * 0.5,
        }}
      />
    </div>
  );
};
