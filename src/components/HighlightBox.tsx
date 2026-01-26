import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS } from "../config/theme";

interface HighlightBoxProps {
  children: React.ReactNode;
  width?: number;
  height?: number;
  strokeColor?: string;
  strokeWidth?: number;
  startFrame?: number;
  durationFrames?: number;
  cornerRadius?: number;
}

export const HighlightBox: React.FC<HighlightBoxProps> = ({
  children,
  width = 400,
  height = 200,
  strokeColor = COLORS.accentGreen,
  strokeWidth = 3,
  startFrame = 0,
  durationFrames = 30,
  cornerRadius = 8,
}) => {
  const frame = useCurrentFrame();

  // Calculate perimeter for stroke animation
  const perimeter = 2 * (width + height - 4 * cornerRadius) + 2 * Math.PI * cornerRadius;

  // Animate stroke-dashoffset from full perimeter to 0
  const progress = interpolate(
    frame - startFrame,
    [0, durationFrames],
    [perimeter, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // Glow animation after box is complete
  const glowOpacity = interpolate(
    frame - startFrame - durationFrames,
    [0, 15],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* SVG border */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "visible",
        }}
      >
        {/* Glow layer */}
        <rect
          x={strokeWidth / 2}
          y={strokeWidth / 2}
          width={width - strokeWidth}
          height={height - strokeWidth}
          rx={cornerRadius}
          ry={cornerRadius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth + 6}
          strokeDasharray={perimeter}
          strokeDashoffset={progress}
          style={{
            filter: "blur(8px)",
            opacity: glowOpacity * 0.6,
          }}
        />
        {/* Main stroke */}
        <rect
          x={strokeWidth / 2}
          y={strokeWidth / 2}
          width={width - strokeWidth}
          height={height - strokeWidth}
          rx={cornerRadius}
          ry={cornerRadius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={perimeter}
          strokeDashoffset={progress}
          strokeLinecap="round"
        />
      </svg>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: 16,
        }}
      >
        {children}
      </div>
    </div>
  );
};
