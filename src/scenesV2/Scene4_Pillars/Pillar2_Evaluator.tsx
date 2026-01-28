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
import { TerminalMockup } from "../../componentsV2/TerminalMockup";
import { GridPattern } from "../../components/GridPattern";

const { title, features, description } = MESSAGING_V2.pillars.pillar2;

const TERMINAL_LINES = [
  { text: "nmap 172.20.10.0/24", type: "input" as const, delay: 30 },
  { text: "Starting Nmap 7.94 ( https://nmap.org ) at 2026-01-25 22:24 UTC", type: "output" as const, delay: 50 },
  { text: "Nmap scan report for 172.20.10.4", type: "output" as const, delay: 70 },
  { text: "Host is up (0.000073s latency).", type: "output" as const, delay: 80 },
  { text: "All 1000 scanned ports on 172.20.10.4 are in ignored states.", type: "output" as const, delay: 90 },
  { text: "", type: "output" as const, delay: 100 },
  { text: "Nmap scan report for 172.20.10.100", type: "output" as const, delay: 110 },
  { text: "Host is up (0.000077s latency).", type: "output" as const, delay: 120 },
  { text: "PORT     STATE SERVICE", type: "output" as const, delay: 130 },
  { text: "80/tcp   open  http", type: "success" as const, delay: 140 },
  { text: "443/tcp  open  https", type: "success" as const, delay: 150 },
  { text: "", type: "output" as const, delay: 160 },
  { text: "Nmap done: 256 IP addresses (5 hosts up) scanned in 3.29 seconds", type: "output" as const, delay: 180 },
];

export const Pillar2_Evaluator: React.FC = () => {
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
            2
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
            Pillar Two
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
          }}
        >
          {description}
        </p>
      </div>

      {/* Right side - Terminal mockup */}
      <div
        style={{
          position: "absolute",
          right: 340,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <TerminalMockup
          lines={TERMINAL_LINES}
          width={624}
          startFrame={20}
          variant="gator"
          showAsciiHeader
          showWindowFrame
        />
      </div>

      {/* Corner accent */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          width: 60,
          height: 60,
          borderTop: `2px solid ${COLORS.accentGreen}`,
          borderLeft: `2px solid ${COLORS.accentGreen}`,
          opacity: 0.4,
        }}
      />
    </AbsoluteFill>
  );
};
