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
import { TIMING_V2, MESSAGING_V2 } from "../config/themeV2";
import { fontStyles } from "../config/fonts";

const { lines, pilot, tagline, url, contact } = MESSAGING_V2.cta;

// Timing constants
const CROSSFADE_START = 60;
const CROSSFADE_DURATION = 25;
const CTA_START = 60;
const CTA_DURATION = TIMING_V2.scene7_cta - CTA_START;

const CTAContent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in opacity for CTA content
  const contentOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Staggered text reveals
  const lineStartFrames = [0, 25, 50];

  // Logo and URL fade in
  const logoOpacity = interpolate(frame, [80, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoScale = spring({
    frame: frame - 80,
    fps,
    config: { damping: 15, stiffness: 80, mass: 0.5 },
  });

  const urlOpacity = interpolate(frame, [110, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pilot badge animation
  const pilotOpacity = interpolate(frame, [130, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Final glow pulse
  const finalGlow = interpolate(frame, [100, 180], [1, 1.5], {
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
          background: `radial-gradient(circle, rgba(7, 217, 106, 0.15) 0%, transparent 60%)`,
          filter: "blur(80px)",
          opacity: finalGlow - 0.5,
        }}
      />

      {/* Staggered CTA text - "Prove Mission Readiness." */}
      <div
        style={{
          display: "flex",
          gap: 30,
          marginBottom: 60,
        }}
      >
        {lines.map((line, index) => {
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
          transform: `scale(${Math.max(0, logoScale)})`,
          marginBottom: 30,
          filter: `drop-shadow(0 0 ${15 * finalGlow}px ${COLORS.accentGreen})`,
        }}
      >
        <Img
          src={staticFile("gator-logo.png")}
          style={{
            width: 240,
            height: "auto",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Website URL */}
      <div style={{ opacity: urlOpacity, marginBottom: 20 }}>
        <span
          style={{
            ...fontStyles.mono,
            fontSize: 42,
            color: COLORS.accentGreen,
            letterSpacing: 4,
          }}
        >
          {url}
        </span>
      </div>

      {/* Pilot badge */}
      <div
        style={{
          opacity: pilotOpacity,
          marginBottom: 30,
        }}
      >
        <div
          style={{
            padding: "12px 28px",
            backgroundColor: `${COLORS.accentGreen}15`,
            border: `2px solid ${COLORS.accentGreen}`,
            borderRadius: 8,
          }}
        >
          <span
            style={{
              ...fontStyles.subheading,
              fontSize: 22,
              color: COLORS.accentGreen,
              letterSpacing: 2,
            }}
          >
            {pilot}
          </span>
        </div>
      </div>

      {/* Tagline */}
      <div
        style={{
          opacity: urlOpacity,
        }}
      >
        <span
          style={{
            ...fontStyles.body,
            fontSize: 28,
            color: COLORS.grayText,
            fontStyle: "italic",
          }}
        >
          {tagline}
        </span>
      </div>

      {/* Contact email */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          opacity: pilotOpacity,
        }}
      >
        <span
          style={{
            ...fontStyles.mono,
            fontSize: 20,
            color: COLORS.muted,
          }}
        >
          {contact}
        </span>
      </div>

      {/* Corner accents */}
      {[
        { top: 30, left: 30, borderTop: true, borderLeft: true },
        { top: 30, right: 30, borderTop: true, borderRight: true },
        { bottom: 30, left: 30, borderBottom: true, borderLeft: true },
        { bottom: 30, right: 30, borderBottom: true, borderRight: true },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: pos.top,
            right: pos.right,
            bottom: pos.bottom,
            left: pos.left,
            width: 60,
            height: 60,
            borderTop: pos.borderTop ? `2px solid ${COLORS.accentGreen}` : "none",
            borderRight: pos.borderRight ? `2px solid ${COLORS.accentGreen}` : "none",
            borderBottom: pos.borderBottom ? `2px solid ${COLORS.accentGreen}` : "none",
            borderLeft: pos.borderLeft ? `2px solid ${COLORS.accentGreen}` : "none",
            opacity: logoOpacity * 0.4,
          }}
        />
      ))}
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

      {/* CTA layer */}
      <Sequence from={CTA_START} durationInFrames={CTA_DURATION}>
        <CTAContent />
      </Sequence>
    </AbsoluteFill>
  );
};
