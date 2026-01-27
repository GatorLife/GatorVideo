import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../config/theme";
import { fontStyles } from "../config/fonts";

interface TerminalLine {
  text: string;
  type: "input" | "output" | "success" | "info";
  delay: number;
}

interface TerminalMockupProps {
  lines: TerminalLine[];
  title?: string;
  width?: number;
  startFrame?: number;
}

const TYPE_COLORS = {
  input: COLORS.white,
  output: COLORS.grayText,
  success: COLORS.accentGreen,
  info: COLORS.info,
};

const TYPE_PREFIXES = {
  input: "$ ",
  output: "  ",
  success: "✓ ",
  info: "ℹ ",
};

export const TerminalMockup: React.FC<TerminalMockupProps> = ({
  lines,
  title = "AI Evaluator",
  width = 600,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  // Terminal entrance
  const terminalOpacity = interpolate(relativeFrame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const terminalScale = interpolate(relativeFrame, [0, 20], [0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Cursor blink
  const cursorVisible = Math.floor(relativeFrame / 15) % 2 === 0;

  // Find the currently typing line
  let currentTypingLine = -1;
  for (let i = 0; i < lines.length; i++) {
    const lineStartFrame = lines[i].delay;
    const lineEndFrame =
      i < lines.length - 1 ? lines[i + 1].delay : lineStartFrame + 60;
    if (relativeFrame >= lineStartFrame && relativeFrame < lineEndFrame) {
      currentTypingLine = i;
      break;
    }
  }

  return (
    <div
      style={{
        width,
        backgroundColor: "#1a1a2e",
        borderRadius: 12,
        overflow: "hidden",
        opacity: terminalOpacity,
        transform: `scale(${terminalScale})`,
        boxShadow: `0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px ${COLORS.accentGreen}20`,
      }}
    >
      {/* Title bar */}
      <div
        style={{
          backgroundColor: "#0d0d1a",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: "flex", gap: 6 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#ff5f56",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#ffbd2e",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#27ca40",
            }}
          />
        </div>

        {/* Title */}
        <span
          style={{
            ...fontStyles.mono,
            fontSize: 14,
            color: COLORS.grayText,
            marginLeft: 12,
          }}
        >
          {title}
        </span>
      </div>

      {/* Terminal content */}
      <div
        style={{
          padding: 20,
          minHeight: 200,
        }}
      >
        {lines.map((line, index) => {
          const lineOpacity = interpolate(
            relativeFrame - line.delay,
            [0, 10],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          // Typing animation for input lines
          let displayText = line.text;
          if (line.type === "input" && relativeFrame < line.delay + 30) {
            const charCount = Math.floor(
              ((relativeFrame - line.delay) / 30) * line.text.length
            );
            displayText = line.text.slice(0, Math.max(0, charCount));
          }

          const showCursor =
            currentTypingLine === index &&
            line.type === "input" &&
            cursorVisible;

          return (
            <div
              key={index}
              style={{
                ...fontStyles.mono,
                fontSize: 16,
                lineHeight: 1.8,
                color: TYPE_COLORS[line.type],
                opacity: lineOpacity,
                display: "flex",
              }}
            >
              <span style={{ color: TYPE_COLORS[line.type], opacity: 0.7 }}>
                {TYPE_PREFIXES[line.type]}
              </span>
              <span>{displayText}</span>
              {showCursor && (
                <span
                  style={{
                    backgroundColor: COLORS.accentGreen,
                    width: 10,
                    height: 20,
                    display: "inline-block",
                    marginLeft: 2,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Status bar */}
      <div
        style={{
          backgroundColor: "#0d0d1a",
          padding: "8px 16px",
          borderTop: `1px solid ${COLORS.border}`,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            ...fontStyles.mono,
            fontSize: 12,
            color: COLORS.accentGreen,
          }}
        >
          READY
        </span>
        <span
          style={{
            ...fontStyles.mono,
            fontSize: 12,
            color: COLORS.grayText,
          }}
        >
          0.2s response
        </span>
      </div>
    </div>
  );
};
