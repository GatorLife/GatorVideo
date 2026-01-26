import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../config/theme";
import { fontStyles } from "../config/fonts";

interface TypingEffectProps {
  text: string;
  startFrame?: number;
  charsPerSecond?: number;
  showCursor?: boolean;
  fontSize?: number;
  color?: string;
  fontStyle?: keyof typeof fontStyles;
}

export const TypingEffect: React.FC<TypingEffectProps> = ({
  text,
  startFrame = 0,
  charsPerSecond = 20,
  showCursor = true,
  fontSize = 48,
  color = COLORS.matrixGreen,
  fontStyle = "mono",
}) => {
  const frame = useCurrentFrame();
  const fps = 30;

  // Calculate how many characters to show
  const framesPerChar = fps / charsPerSecond;
  const adjustedFrame = Math.max(0, frame - startFrame);
  const charCount = Math.min(
    Math.floor(adjustedFrame / framesPerChar),
    text.length
  );

  // Cursor blink (30 frame cycle)
  const cursorOpacity = interpolate(
    (frame % 30) < 15 ? 1 : 0,
    [0, 1],
    [0, 1]
  );

  // Only show cursor if we haven't finished typing or if showCursor is always on
  const isTypingComplete = charCount >= text.length;
  const shouldShowCursor = showCursor && (isTypingComplete ? true : true);

  const displayedText = text.slice(0, charCount);

  return (
    <div
      style={{
        ...fontStyles[fontStyle],
        fontSize,
        color,
        display: "inline-flex",
        alignItems: "center",
        whiteSpace: "pre-wrap",
      }}
    >
      <span>{displayedText}</span>
      {shouldShowCursor && (
        <span
          style={{
            opacity: cursorOpacity,
            marginLeft: 2,
            backgroundColor: color,
            width: fontSize * 0.5,
            height: fontSize * 1.1,
            display: "inline-block",
          }}
        />
      )}
    </div>
  );
};
