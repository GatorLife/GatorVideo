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
import { SplitCompare } from "../componentsV2/SplitCompare";
import { MetricDisplay } from "../componentsV2/MetricDisplay";
import { GridPattern } from "../components/GridPattern";

const { eyebrow, title, metrics, compare } = MESSAGING_V2.stateOfArt;

// Beat marks, in scene frames, aligned to the voiceover in public/SceneA.mp3.
// The VO starts at `voLeadIn` and plays at 1.1x, so audio second `t` lands on
// frame voLeadIn + t / 1.1 * 30 - about 27 frames per second of audio.
//
// The narration names the three alternatives across its first three sentences,
// then turns to GATOR, then closes on the evidence. The compare panel therefore
// builds early and the metrics land on that closing sentence, so the numbers
// appear exactly as they are spoken.
// Measured from the recording rather than estimated - each metric appears on
// the syllable that speaks it:
//   0.00s  "Grading is manual, and no two instructors score alike."
//   3.48s  "Prebuilt ranges go stale before they run."
//   6.20s  "Commercial platforms map to no joint standard."
//   9.08s  "Only GATOR authors the range and grades against JQR."
//  12.60s  "Five squadrons in evaluation, a hundred-plus evaluations,"
//  15.92s  "thirty templates, thousands of hours returned."
const COMPARE_START = 45; // just under a second in, as the first alternative is named
const METRIC_FRAMES = [364, 418, 454]; // 12.6s, 14.6s, 15.9s

// SplitCompare's divider is sized in %, so it needs a resolvable parent height
// or it collapses to nothing. An explicit height on the wrapper is not enough
// on its own - a block child stays auto-height - so the wrapper is a grid,
// which stretches its item to fill both axes.
const COMPARE_HEIGHT = 330;

// The two columns sit slightly above centre to leave the evidence band room
// along the bottom without crowding it.
const COLUMN_CENTER = "45%";

export const SceneA_StateOfArt: React.FC = () => {
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

  const glowPulse = interpolate(Math.sin(frame * 0.08), [-1, 1], [0.6, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <Sequence from={TIMING_V2.voLeadIn}>
        <Audio src={staticFile("SceneA.mp3")} playbackRate={1.1} />
      </Sequence>

      {/* Subtle grid */}
      <GridPattern strokeColor={COLORS.accentGreen} opacity={0.05} />

      {/* Left side - the claim */}
      <div
        style={{
          position: "absolute",
          left: 200,
          top: COLUMN_CENTER,
          transform: "translateY(-50%)",
          width: 620,
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
            ▲
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
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            whiteSpace: "pre-line",
          }}
        >
          {title}
        </h2>
      </div>

      {/* Right side - the alternatives, and why each is worse */}
      <div
        style={{
          position: "absolute",
          right: 120,
          top: COLUMN_CENTER,
          transform: "translateY(-50%)",
          width: 900,
          height: COMPARE_HEIGHT,
          display: "grid",
        }}
      >
        <SplitCompare
          left={compare.left}
          right={compare.right}
          startFrame={COMPARE_START}
        />
      </div>

      {/* Bottom band - the evidence. Criteria 3 scores "relevant evidence"
          separately from the comparison above, so it gets its own zone rather
          than being tucked into a column. */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 140,
        }}
      >
        {metrics.map((metric, index) => (
          <MetricDisplay
            key={metric.label}
            value={metric.value}
            label={metric.label}
            status="green"
            startFrame={METRIC_FRAMES[index]}
            countUp
          />
        ))}
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
