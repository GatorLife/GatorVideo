import React from "react";
import {
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  staticFile,
  OffthreadVideo,
  AbsoluteFill,
} from "remotion";
import { COLORS } from "../config/theme";
import { TIMING_V2, MESSAGING_V2 } from "../config/themeV2";
import { fontStyles } from "../config/fonts";

const { title, gaps } = MESSAGING_V2.readinessGap;

export const Scene2_ReadinessGap: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [0, 30], [-30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Gaps section timing
  const gapsStartFrame = 40;

  // Scene fade out
  const sceneOpacity = interpolate(
    frame,
    [TIMING_V2.scene2_readinessGap - 20, TIMING_V2.scene2_readinessGap],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      {/* Background video - subtle */}
      <AbsoluteFill style={{ opacity: 0.7 }}>
        <OffthreadVideo
          src={staticFile("Gator_Video_EmergencyOpsCenter.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </AbsoluteFill>

      {/* Dark overlay */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.95) 100%)`,
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
          padding: 60,
          opacity: sceneOpacity,
        }}
      >
        {/* Title */}
        <h1
          style={{
            ...fontStyles.heading,
            fontSize: 56,
            color: COLORS.warningRed,
            margin: 0,
            marginBottom: 40,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            textShadow: `0 0 30px ${COLORS.warningRed}50`,
          }}
        >
          {title}
        </h1>

        {/* The Three Gaps */}
        {frame >= gapsStartFrame && (
          <div
            style={{
              flex: 1,
              display: "flex",
              gap: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {gaps.map((gap, index) => {
              const delay = index * 20;
              const gapOpacity = interpolate(
                frame - gapsStartFrame - delay,
                [0, 20],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );

              const gapScale = spring({
                frame: frame - gapsStartFrame - delay,
                fps,
                config: { damping: 12, stiffness: 100 },
              });

              return (
                <div
                  key={index}
                  style={{
                    width: 400,
                    padding: 40,
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
                      fontSize: 22,
                      color: COLORS.warningRed,
                      marginBottom: 16,
                    }}
                  >
                    GAP {index + 1}
                  </div>

                  {/* Gap name */}
                  <h3
                    style={{
                      ...fontStyles.subheading,
                      fontSize: 28,
                      color: COLORS.white,
                      margin: 0,
                      marginBottom: 16,
                    }}
                  >
                    {gap.name}
                  </h3>

                  {/* Gap description */}
                  <p
                    style={{
                      ...fontStyles.body,
                      fontSize: 20,
                      color: COLORS.grayText,
                      margin: 0,
                      lineHeight: 1.5,
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
    </AbsoluteFill>
  );
};
