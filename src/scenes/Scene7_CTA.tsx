import React from "react";
import {
  useCurrentFrame,
  spring,
  useVideoConfig,
  interpolate,
  staticFile,
  Img,
  OffthreadVideo,
  Sequence,
  AbsoluteFill,
} from "remotion";
import { GlowText } from "../components/GlowText";
import { GridPattern } from "../components/GridPattern";
import { COLORS } from "../config/theme";
import { fontStyles } from "../config/fonts";

// Timing constants
const CROSSFADE_START = 90; // Start crossfade at 3 seconds
const CROSSFADE_DURATION = 30; // 1 second crossfade
const CTA_START = 90; // CTA content starts at frame 90
const CTA_DURATION = 240; // Original CTA duration

const CTA_LINES = ["Train.", "Evaluate.", "Dominate."];

// Inner component for CTA content
const CTAContent: React.FC = () => {
  const frame = useCurrentFrame(); // This is relative to sequence start (0)
  const { fps } = useVideoConfig();

  // Fade in opacity for CTA content
  const contentOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Staggered text reveals
  const lineStartFrames = [0, 30, 60];

  // Logo and URL fade in
  const logoOpacity = interpolate(frame, [100, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoScale = spring({
    frame: frame - 100,
    fps,
    config: { damping: 15, stiffness: 80, mass: 0.5 },
  });

  const urlOpacity = interpolate(frame, [140, 170], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Final glow pulse
  const finalGlow = interpolate(frame, [180, 240], [1, 1.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.black,
        opacity: contentOpacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Subtle grid pattern */}
      <GridPattern strokeColor={COLORS.accentGreen} opacity={0.08} />

      {/* Central glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 800,
          background: `radial-gradient(circle, rgba(29, 185, 84, 0.2) 0%, transparent 60%)`,
          filter: "blur(80px)",
          opacity: finalGlow - 0.5,
        }}
      />

      {/* Staggered CTA text */}
      <div
        style={{
          display: "flex",
          gap: 40,
          marginBottom: 80,
        }}
      >
        {CTA_LINES.map((line, index) => {
          const startFrame = lineStartFrames[index];
          const progress = spring({
            frame: frame - startFrame,
            fps,
            config: { damping: 12, stiffness: 100, mass: 0.5 },
          });

          const yOffset = interpolate(progress, [0, 1], [40, 0]);

          return (
            <div
              key={index}
              style={{
                opacity: progress,
                transform: `translateY(${yOffset}px)`,
              }}
            >
              <GlowText
                fontSize={72}
                color={COLORS.white}
                glowColor={COLORS.accentGreen}
                glowIntensity={finalGlow}
                fontStyle="heading"
              >
                {line}
              </GlowText>
            </div>
          );
        })}
      </div>

      {/* Logo */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          marginBottom: 40,
          filter: `drop-shadow(0 0 ${15 * finalGlow}px ${COLORS.accentGreen})`,
        }}
      >
        <Img
          src={staticFile("gator-logo.png")}
          style={{
            width: 300,
            height: "auto",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Website URL */}
      <div
        style={{
          opacity: urlOpacity,
        }}
      >
        <span
          style={{
            ...fontStyles.mono,
            fontSize: 42,
            color: COLORS.accentGreen,
            letterSpacing: 4,
          }}
        >
          GoGATOR.ai
        </span>
      </div>

      {/* Tagline */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          opacity: urlOpacity,
        }}
      >
        <span
          style={{
            ...fontStyles.body,
            fontSize: 36,
            color: COLORS.grayText,
          }}
        >
          Gen AI Training & Operational Readiness
        </span>
      </div>

      {/* Corner accents */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          width: 80,
          height: 80,
          borderTop: `2px solid ${COLORS.accentGreen}`,
          borderLeft: `2px solid ${COLORS.accentGreen}`,
          opacity: logoOpacity * 0.5,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 30,
          width: 80,
          height: 80,
          borderTop: `2px solid ${COLORS.accentGreen}`,
          borderRight: `2px solid ${COLORS.accentGreen}`,
          opacity: logoOpacity * 0.5,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: 30,
          width: 80,
          height: 80,
          borderBottom: `2px solid ${COLORS.accentGreen}`,
          borderLeft: `2px solid ${COLORS.accentGreen}`,
          opacity: logoOpacity * 0.5,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 30,
          right: 30,
          width: 80,
          height: 80,
          borderBottom: `2px solid ${COLORS.accentGreen}`,
          borderRight: `2px solid ${COLORS.accentGreen}`,
          opacity: logoOpacity * 0.5,
        }}
      />
    </AbsoluteFill>
  );
};

export const Scene7_CTA: React.FC = () => {
  const frame = useCurrentFrame();

  // Video fades out during crossfade
  const videoOpacity = interpolate(
    frame,
    [CROSSFADE_START, CROSSFADE_START + CROSSFADE_DURATION],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      {/* Video layer - Gator_Outro.mp4 full screen */}
      <AbsoluteFill style={{ opacity: videoOpacity }}>
        <OffthreadVideo
          src={staticFile("Gator_Outro.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </AbsoluteFill>

      {/* CTA layer - starts at frame 90 */}
      <Sequence from={CTA_START} durationInFrames={CTA_DURATION}>
        <CTAContent />
      </Sequence>
    </AbsoluteFill>
  );
};
