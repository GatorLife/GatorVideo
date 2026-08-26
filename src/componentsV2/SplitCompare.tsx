import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../config/theme";
import { fontStyles } from "../config/fonts";

interface CompareColumn {
  title: string;
  items: string[];
  color: string;
}

interface SplitCompareProps {
  left: CompareColumn;
  right: CompareColumn;
  startFrame?: number;
}

export const SplitCompare: React.FC<SplitCompareProps> = ({
  left,
  right,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = frame - startFrame;

  // Left side slides in from left
  const leftSlide = spring({
    frame: relativeFrame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  // Right side slides in from right (slightly delayed)
  const rightSlide = spring({
    frame: relativeFrame - 10,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const leftX = interpolate(leftSlide, [0, 1], [-100, 0]);
  const rightX = interpolate(rightSlide, [0, 1], [100, 0]);

  // Divider animation
  const dividerHeight = interpolate(relativeFrame, [20, 50], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Arrow animation (appears after both sides)
  const arrowOpacity = interpolate(relativeFrame, [60, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const arrowPulse = interpolate(
    Math.sin(relativeFrame * 0.1),
    [-1, 1],
    [0.8, 1.2]
  );

  const renderColumn = (
    column: CompareColumn,
    slideProgress: number,
    xOffset: number,
    isRight: boolean
  ) => (
    <div
      style={{
        flex: 1,
        padding: "16px 40px",
        opacity: slideProgress,
        transform: `translateX(${xOffset}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: isRight ? "flex-start" : "flex-end",
      }}
    >
      {/* Title */}
      <h3
        style={{
          ...fontStyles.heading,
          fontSize: 34,
          color: column.color,
          margin: 0,
          marginBottom: 24,
          textTransform: "uppercase",
          letterSpacing: 2,
        }}
      >
        {column.title}
      </h3>

      {/* Items */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 22,
          alignItems: isRight ? "flex-start" : "flex-end",
        }}
      >
        {column.items.map((item, index) => {
          const itemDelay = 30 + index * 15;
          const itemOpacity = interpolate(
            relativeFrame,
            [itemDelay, itemDelay + 20],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                opacity: itemOpacity,
                flexDirection: isRight ? "row" : "row-reverse",
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: column.color,
                  boxShadow: `0 0 10px ${column.color}`,
                }}
              />
              <span
                style={{
                  ...fontStyles.body,
                  fontSize: 28,
                  color: COLORS.white,
                }}
              >
                {item}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Left column */}
      {renderColumn(left, leftSlide, leftX, false)}

      {/* Center divider */}
      <div
        style={{
          width: 4,
          height: `${dividerHeight}%`,
          background: `linear-gradient(180deg, transparent, ${COLORS.grayText}40, transparent)`,
          position: "relative",
        }}
      >
        {/* Arrow pointing right */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${arrowPulse})`,
            opacity: arrowOpacity,
            fontSize: 40,
            color: COLORS.accentGreen,
            textShadow: `0 0 20px ${COLORS.accentGreen}`,
          }}
        >
          →
        </div>
      </div>

      {/* Right column */}
      {renderColumn(right, rightSlide, rightX, true)}
    </div>
  );
};
