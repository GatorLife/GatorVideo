import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../config/theme";
import { fontStyles } from "../config/fonts";

interface PlaceholderProps {
  label: string;
  duration?: number;
  bgColor?: string;
  width?: number | string;
  height?: number | string;
  showBorder?: boolean;
}

export const Placeholder: React.FC<PlaceholderProps> = ({
  label,
  duration,
  bgColor = COLORS.deepGreen,
  width = "100%",
  height = "100%",
  showBorder = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animated border pulse
  const borderOpacity = showBorder
    ? interpolate(Math.sin(frame * 0.1), [-1, 1], [0.4, 1])
    : 0;

  // Subtle scale animation on enter
  const scale = spring({
    frame,
    fps,
    config: {
      damping: 200,
      stiffness: 100,
      mass: 0.5,
    },
  });

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: bgColor,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        transform: `scale(${scale})`,
        border: showBorder
          ? `3px dashed rgba(255, 255, 255, ${borderOpacity})`
          : "none",
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      {/* Asset label */}
      <div
        style={{
          ...fontStyles.body,
          color: COLORS.white,
          fontSize: 28,
          textAlign: "center",
          padding: "0 20px",
          opacity: 0.9,
        }}
      >
        {label}
      </div>

      {/* Duration indicator */}
      {duration !== undefined && (
        <div
          style={{
            position: "absolute",
            bottom: 16,
            right: 16,
            ...fontStyles.mono,
            color: COLORS.white,
            fontSize: 14,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            padding: "4px 8px",
            borderRadius: 4,
          }}
        >
          {(duration / 30).toFixed(1)}s
        </div>
      )}

      {/* Corner decorations */}
      <div
        style={{
          position: "absolute",
          top: 8,
          left: 8,
          width: 20,
          height: 20,
          borderTop: `2px solid ${COLORS.accentGreen}`,
          borderLeft: `2px solid ${COLORS.accentGreen}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          width: 20,
          height: 20,
          borderTop: `2px solid ${COLORS.accentGreen}`,
          borderRight: `2px solid ${COLORS.accentGreen}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 8,
          left: 8,
          width: 20,
          height: 20,
          borderBottom: `2px solid ${COLORS.accentGreen}`,
          borderLeft: `2px solid ${COLORS.accentGreen}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 8,
          right: 8,
          width: 20,
          height: 20,
          borderBottom: `2px solid ${COLORS.accentGreen}`,
          borderRight: `2px solid ${COLORS.accentGreen}`,
        }}
      />
    </div>
  );
};
