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
import { SplitCompare } from "../componentsV2/SplitCompare";

const { title, gaps, compare } = MESSAGING_V2.readinessGap;

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
  const compareStartFrame = 140;

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
      <AbsoluteFill style={{ opacity: 0.15 }}>
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
        {frame >= gapsStartFrame && frame < compareStartFrame && (
          <div
            style={{
              display: "flex",
              gap: 40,
              justifyContent: "center",
              marginTop: 20,
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
                    width: 320,
                    padding: 30,
                    backgroundColor: `${COLORS.warningRed}10`,
                    border: `1px solid ${COLORS.warningRed}40`,
                    borderRadius: 12,
                    opacity: gapOpacity,
                    transform: `scale(${gapScale})`,
                  }}
                >
                  {/* Gap number */}
                  <div
                    style={{
                      ...fontStyles.heading,
                      fontSize: 18,
                      color: COLORS.warningRed,
                      marginBottom: 12,
                    }}
                  >
                    GAP {index + 1}
                  </div>

                  {/* Gap name */}
                  <h3
                    style={{
                      ...fontStyles.subheading,
                      fontSize: 22,
                      color: COLORS.white,
                      margin: 0,
                      marginBottom: 12,
                    }}
                  >
                    {gap.name}
                  </h3>

                  {/* Gap description */}
                  <p
                    style={{
                      ...fontStyles.body,
                      fontSize: 16,
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

        {/* Split comparison */}
        {frame >= compareStartFrame && (
          <div
            style={{
              flex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SplitCompare
              left={{
                title: compare.traditional.title,
                items: compare.traditional.items,
                color: COLORS.warningRed,
              }}
              right={{
                title: compare.verifiable.title,
                items: compare.verifiable.items,
                color: COLORS.accentGreen,
              }}
              startFrame={compareStartFrame}
            />
          </div>
        )}

        {/* Key question at bottom */}
        {frame >= compareStartFrame + 80 && (
          <div
            style={{
              position: "absolute",
              bottom: 60,
              left: 0,
              right: 0,
              textAlign: "center",
              opacity: interpolate(
                frame,
                [compareStartFrame + 80, compareStartFrame + 100],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
            }}
          >
            <p
              style={{
                ...fontStyles.body,
                fontSize: 24,
                color: COLORS.grayText,
                fontStyle: "italic",
              }}
            >
              "If we had to mobilize a cyber team tomorrow, how do we prove we
              are ready?"
            </p>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
