import React from "react";
import { useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";
import { COLORS } from "../config/theme";
import { fontStyles } from "../config/fonts";

interface TextOverlayProps {
  text: string;
  subtext?: string;
  position?: "center" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
  fontSize?: number;
  subtextSize?: number;
  color?: string;
  startFrame?: number;
  fadeOutFrame?: number;
  fontStyle?: keyof typeof fontStyles;
}

export const TextOverlay: React.FC<TextOverlayProps> = ({
  text,
  subtext,
  position = "center",
  fontSize = 64,
  subtextSize = 32,
  color = COLORS.white,
  startFrame = 0,
  fadeOutFrame,
  fontStyle = "heading",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring animation for entrance
  const enterProgress = spring({
    frame: frame - startFrame,
    fps,
    config: {
      damping: 200,
      stiffness: 100,
      mass: 0.5,
    },
  });

  // Fade out if specified
  let opacity = enterProgress;
  if (fadeOutFrame !== undefined && frame >= fadeOutFrame) {
    opacity = interpolate(
      frame - fadeOutFrame,
      [0, 20],
      [1, 0],
      { extrapolateRight: "clamp" }
    );
  }

  // Position styling
  const positionStyles: Record<string, React.CSSProperties> = {
    center: {
      top: "50%",
      left: "50%",
      transform: `translate(-50%, -50%) translateY(${(1 - enterProgress) * 30}px)`,
    },
    top: {
      top: 100,
      left: "50%",
      transform: `translateX(-50%) translateY(${(1 - enterProgress) * -30}px)`,
    },
    bottom: {
      bottom: 100,
      left: "50%",
      transform: `translateX(-50%) translateY(${(1 - enterProgress) * 30}px)`,
    },
    "top-left": {
      top: 80,
      left: 80,
      transform: `translateX(${(1 - enterProgress) * -30}px)`,
    },
    "top-right": {
      top: 80,
      right: 80,
      transform: `translateX(${(1 - enterProgress) * 30}px)`,
    },
    "bottom-left": {
      bottom: 80,
      left: 80,
      transform: `translateX(${(1 - enterProgress) * -30}px)`,
    },
    "bottom-right": {
      bottom: 80,
      right: 80,
      transform: `translateX(${(1 - enterProgress) * 30}px)`,
    },
  };

  if (frame < startFrame) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        opacity,
        textAlign: position.includes("right") ? "right" : position.includes("left") ? "left" : "center",
        ...positionStyles[position],
      }}
    >
      <div
        style={{
          ...fontStyles[fontStyle],
          fontSize,
          color,
          textShadow: `0 2px 20px rgba(0, 0, 0, 0.5)`,
          lineHeight: 1.2,
        }}
      >
        {text}
      </div>
      {subtext && (
        <div
          style={{
            ...fontStyles.body,
            fontSize: subtextSize,
            color,
            opacity: 0.8,
            marginTop: 16,
            textShadow: `0 2px 10px rgba(0, 0, 0, 0.5)`,
          }}
        >
          {subtext}
        </div>
      )}
    </div>
  );
};
