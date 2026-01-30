import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig, staticFile, Audio } from "remotion";
import { Video } from "@remotion/media";
import { COLORS } from "../config/theme";
import { fontStyles } from "../config/fonts";

const PROBLEMS = [
  "Traditional training doesn't prepare teams for real world threats",
  "Cyber exercises are expensive and time-consuming to set up",
  "No way to measure actual readiness against evolving attack vectors",
];

export const Scene2_Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Problem text reveals - timed to voiceover (8 seconds total)
  // Each statement appears slightly before it's spoken for better readability
  const problemStartFrames = [15, 85, 165];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.darkBg,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Voiceover audio */}
      <Audio src={staticFile("Scene2.mp3")} />

      {/* Full screen video background with dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.35,
        }}
      >
        <Video
          src={staticFile("Gator_Video_EmergencyOpsCenter.mp4")}
          muted
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Warning header - centered */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            ...fontStyles.heading,
            fontSize: 28,
            color: COLORS.warningRed,
            textTransform: "uppercase",
            letterSpacing: 4,
          }}
        >
          ⚠ Critical Vulnerabilities Detected
        </span>
      </div>

      {/* Problem statements - centered */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 100,
          gap: 30,
        }}
      >
        {PROBLEMS.map((problem, index) => {
          const startFrame = problemStartFrames[index];
          const progress = spring({
            frame: frame - startFrame,
            fps,
            config: { damping: 200, stiffness: 100, mass: 0.5 },
          });

          const yOffset = interpolate(progress, [0, 1], [20, 0]);
          const opacity = progress;

          return (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                opacity,
                transform: `translateY(${yOffset}px)`,
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: COLORS.warningRed,
                  borderRadius: "50%",
                  boxShadow: `0 0 10px ${COLORS.warningRed}`,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  ...fontStyles.subheading,
                  fontSize: 36,
                  color: COLORS.white,
                }}
              >
                {problem}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
