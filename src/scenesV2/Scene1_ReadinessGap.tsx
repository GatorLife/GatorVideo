import React from "react";
import {
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  staticFile,
  OffthreadVideo,
  AbsoluteFill,
  Audio,
  Sequence,
} from "remotion";
import { COLORS } from "../config/theme";
import { TIMING_V2, MESSAGING_V2 } from "../config/themeV2";
import { fontStyles } from "../config/fonts";

const { title, gaps } = MESSAGING_V2.readinessGap;

// Video plays for 8 seconds (240 frames), then components load
const CONTENT_START = 250; // Start content slightly after video ends

export const Scene1_ReadinessGap: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Content-relative frame (starts at 0 when content begins)
  const contentFrame = Math.max(0, frame - CONTENT_START);

  // Title animation (relative to content start)
  const titleOpacity = interpolate(contentFrame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(contentFrame, [0, 30], [-30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Gaps section timing (relative to content start)
  const gapsStartFrame = 40;

  // Scene fade out
  const sceneOpacity = interpolate(
    frame,
    [TIMING_V2.scene1_readinessGap - 20, TIMING_V2.scene1_readinessGap],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Content visibility (only show after video completes)
  const contentOpacity = interpolate(
    frame,
    [CONTENT_START - 10, CONTENT_START + 10],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      {/* Voiceover audio - starts when content loads */}
      <Sequence from={CONTENT_START}>
        <Audio src={staticFile("Scene2.mp3")} playbackRate={1.1} />
      </Sequence>

      {/* Background video - plays for 8 seconds then freezes, audio fades out */}
      <AbsoluteFill style={{ opacity: 0.7 }}>
        <OffthreadVideo
          src={staticFile("Gator_Video_EmergencyOpsCenter.mp4")}
          volume={(f) => {
            // Fade out video audio from frame 200-240 to blend with music
            if (f < 200) return 0.8;
            return interpolate(f, [200, 240], [0.8, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
          }}
          pauseWhenBuffering
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </AbsoluteFill>

      {/* Dark overlay - intensifies when content appears */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center, rgba(0,0,0,${0.5 + contentOpacity * 0.2}) 0%, rgba(0,0,0,${0.8 + contentOpacity * 0.15}) 100%)`,
        }}
      />

      {/* Content - appears after video completes */}
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 100,
          opacity: sceneOpacity * contentOpacity,
        }}
      >
        {/* Title - fixed height container to prevent shifting */}
        <div style={{ height: 100, display: "flex", alignItems: "center" }}>
          <h1
            style={{
              ...fontStyles.heading,
              fontSize: 56,
              color: COLORS.warningRed,
              margin: 0,
              textAlign: "center",
              opacity: titleOpacity,
              transform: `translateY(${titleY}px)`,
              textShadow: `0 0 30px ${COLORS.warningRed}50`,
            }}
          >
            {title}
          </h1>
        </div>

        {/* The Three Gaps - fixed height container */}
        <div style={{ height: 320, display: "flex", alignItems: "flex-start", paddingTop: 30 }}>
          {contentFrame >= gapsStartFrame && (
            <div
              style={{
                display: "flex",
                gap: 50,
                justifyContent: "center",
                alignItems: "stretch",
              }}
            >
            {gaps.map((gap, index) => {
              const delay = index * 40;
              const gapOpacity = interpolate(
                contentFrame - gapsStartFrame - delay,
                [0, 40],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );

              const gapScale = spring({
                frame: contentFrame - gapsStartFrame - delay,
                fps,
                config: { damping: 15, stiffness: 60 },
              });

              return (
                <div
                  key={index}
                  style={{
                    width: 480,
                    padding: 48,
                    backgroundColor: `rgba(0, 0, 0, 0.85)`,
                    border: `2px solid ${COLORS.warningRed}60`,
                    borderRadius: 16,
                    opacity: gapOpacity,
                    transform: `scale(${gapScale})`,
                    boxShadow: `0 4px 20px rgba(0, 0, 0, 0.5)`,
                  }}
                >
                  {/* Gap number */}
                  <div
                    style={{
                      ...fontStyles.heading,
                      fontSize: 28,
                      color: COLORS.warningRed,
                      marginBottom: 20,
                    }}
                  >
                    GAP {index + 1}
                  </div>

                  {/* Gap name */}
                  <h3
                    style={{
                      ...fontStyles.subheading,
                      fontSize: 36,
                      color: COLORS.white,
                      margin: 0,
                      marginBottom: 20,
                    }}
                  >
                    {gap.name}
                  </h3>

                  {/* Gap description */}
                  <p
                    style={{
                      ...fontStyles.body,
                      fontSize: 26,
                      color: COLORS.grayText,
                      margin: 0,
                      lineHeight: 1.5,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {gap.description}
                  </p>
                </div>
              );
            })}
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
