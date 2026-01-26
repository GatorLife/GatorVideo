import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../config/theme";

interface GridPatternProps {
  cellSize?: number;
  strokeColor?: string;
  strokeWidth?: number;
  opacity?: number;
  animate?: boolean;
}

export const GridPattern: React.FC<GridPatternProps> = ({
  cellSize = 60,
  strokeColor = COLORS.accentGreen,
  strokeWidth = 1,
  opacity = 0.15,
  animate = true,
}) => {
  const frame = useCurrentFrame();

  // Subtle animation - grid slowly moves
  const offsetX = animate ? (frame * 0.2) % cellSize : 0;
  const offsetY = animate ? (frame * 0.1) % cellSize : 0;

  // Pulse opacity
  const pulseOpacity = animate
    ? interpolate(Math.sin(frame * 0.02), [-1, 1], [opacity * 0.7, opacity])
    : opacity;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        opacity: pulseOpacity,
      }}
    >
      <svg
        width="100%"
        height="100%"
        style={{
          transform: `translate(${offsetX}px, ${offsetY}px)`,
        }}
      >
        <defs>
          <pattern
            id="grid-pattern"
            width={cellSize}
            height={cellSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
          </pattern>
        </defs>
        <rect
          x={-cellSize}
          y={-cellSize}
          width={1920 + cellSize * 2}
          height={1080 + cellSize * 2}
          fill="url(#grid-pattern)"
        />
      </svg>

      {/* Highlight lines at intersections */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.3) 100%)`,
        }}
      />
    </div>
  );
};
