import React from "react";
import {
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
} from "remotion";
import { COLORS } from "../config/theme";
import { MESSAGING_V2, TIMING_V2 } from "../config/themeV2";
import { fontStyles } from "../config/fonts";
import { GridPattern } from "../components/GridPattern";

const { eyebrow, title, features, description, trl, disclaimer } =
  MESSAGING_V2.businessModel;

// Beat marks aligned to public/SceneB.mp3, which starts at `voLeadIn` and plays
// at 1.1x. One feature per sentence: pilot (~1.8s), license (~4.5s), scale (~7s).
const FEATURE_START = 70;
const FEATURE_DELAY = 70;
const RING_START = 279; // "GATOR is at TRL six..." (~9.5s)
const DESC_START = 330;

const RING_SIZE = 340;

// A 6-of-9 segmented ring. This is deliberately not the readiness gauge - it
// reads as a maturity scale rather than a percentage, and it says something the
// three bullets do not, so the right half of the slide is not just a restatement.
const TrlRing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relative = frame - RING_START;

  const entrance = spring({
    frame: relative,
    fps,
    config: { damping: 15, stiffness: 60 },
  });

  // Segments light up one at a time.
  const litProgress = interpolate(relative, [15, 75], [0, trl.level], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const radius = RING_SIZE / 2 - 24;
  const center = RING_SIZE / 2;
  const gapDeg = 6;
  const stepDeg = 360 / trl.max;

  return (
    <div
      style={{
        opacity: entrance,
        transform: `scale(${interpolate(entrance, [0, 1], [0.8, 1])})`,
        position: "relative",
        width: RING_SIZE,
        height: RING_SIZE,
      }}
    >
      <svg width={RING_SIZE} height={RING_SIZE}>
        {new Array(trl.max).fill(0).map((_, i) => {
          // Start at 12 o'clock and go clockwise.
          const startDeg = -90 + i * stepDeg + gapDeg / 2;
          const endDeg = -90 + (i + 1) * stepDeg - gapDeg / 2;
          const toXY = (deg: number) => {
            const rad = (deg * Math.PI) / 180;
            return [center + radius * Math.cos(rad), center + radius * Math.sin(rad)];
          };
          const [x1, y1] = toXY(startDeg);
          const [x2, y2] = toXY(endDeg);
          const lit = i < litProgress;

          return (
            <path
              key={i}
              d={`M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}`}
              stroke={lit ? COLORS.accentGreen : COLORS.border}
              strokeWidth={16}
              strokeLinecap="round"
              fill="none"
              style={
                lit
                  ? { filter: `drop-shadow(0 0 8px ${COLORS.accentGreen})` }
                  : undefined
              }
            />
          );
        })}
      </svg>

      {/* Centre readout */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            ...fontStyles.mono,
            fontSize: 22,
            color: COLORS.grayText,
            textTransform: "uppercase",
            letterSpacing: 4,
          }}
        >
          TRL
        </span>
        <span
          style={{
            ...fontStyles.heading,
            fontSize: 96,
            lineHeight: 1,
            color: COLORS.accentGreen,
          }}
        >
          {Math.floor(litProgress)}
        </span>
      </div>
    </div>
  );
};

export const SceneB_BusinessModel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const titleOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [30, 60], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const descOpacity = interpolate(frame, [DESC_START, DESC_START + 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const trlLabelOpacity = interpolate(
    frame,
    [RING_START + 60, RING_START + 90],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const glowPulse = interpolate(Math.sin(frame * 0.08), [-1, 1], [0.6, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <Sequence from={TIMING_V2.voLeadIn}>
        <Audio src={staticFile("SceneB.mp3")} playbackRate={1.1} />
      </Sequence>

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
        {/* Eyebrow badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 20,
            transform: `scale(${badgeScale})`,
            transformOrigin: "left center",
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
            $
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
            {eyebrow}
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            ...fontStyles.heading,
            fontSize: 64,
            lineHeight: 1.1,
            color: COLORS.white,
            margin: 0,
            marginBottom: 28,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            whiteSpace: "pre-line",
          }}
        >
          {title}
        </h2>

        {/* Features */}
        <div style={{ marginBottom: 28 }}>
          {features.map((feature, index) => {
            const delay = index * FEATURE_DELAY;
            const featureOpacity = interpolate(
              frame - FEATURE_START - delay,
              [0, 30],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            const featureX = interpolate(
              frame - FEATURE_START - delay,
              [0, 30],
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
            whiteSpace: "pre-line",
          }}
        >
          {description}
        </p>
      </div>

      {/* Right side - technology readiness level */}
      <div
        style={{
          position: "absolute",
          right: 300,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        <TrlRing />
        <p
          style={{
            ...fontStyles.body,
            fontSize: 24,
            color: COLORS.grayText,
            margin: 0,
            textAlign: "center",
            lineHeight: 1.5,
            whiteSpace: "pre-line",
            opacity: trlLabelOpacity,
          }}
        >
          {trl.label}
        </p>
      </div>

      {/* Required by TSM Section VII.e.iv. Do not remove. */}
      <div
        style={{
          position: "absolute",
          bottom: 44,
          left: 0,
          right: 0,
          textAlign: "center",
          ...fontStyles.mono,
          fontSize: 17,
          color: COLORS.muted,
        }}
      >
        {disclaimer}
      </div>

      {/* Corner accent */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          width: 60,
          height: 60,
          borderBottom: `2px solid ${COLORS.accentGreen}`,
          borderRight: `2px solid ${COLORS.accentGreen}`,
          opacity: 0.4,
        }}
      />
    </AbsoluteFill>
  );
};
