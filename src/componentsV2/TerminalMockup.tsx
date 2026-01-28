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
  variant?: "default" | "gator";
  showAsciiHeader?: boolean;
}

const TYPE_COLORS = {
  input: COLORS.white,
  output: COLORS.grayText,
  success: COLORS.accentGreen,
  info: COLORS.info,
};

// GATOR terminal uses monochrome green
const GATOR_TYPE_COLORS = {
  input: COLORS.accentGreen,
  output: COLORS.accentGreen,
  success: COLORS.accentGreen,
  info: COLORS.accentGreen,
};

const TYPE_PREFIXES = {
  input: "$ ",
  output: "  ",
  success: "✓ ",
  info: "ℹ ",
};

const GATOR_TYPE_PREFIXES = {
  input: "gatorterm:~$ ",
  output: "",
  success: "",
  info: "",
};

const GATOR_ASCII_ART = `      .-''-._.-'00   '-' ' ' ' ' ' '-._
    '-._.--'._     '.__  '-' '-' '-'
      V:  V  'vv-'    '-._.-._.-'._.-'
       '=.____=_.-'   :_._._ :_.  ': . :
           (googol) /        \\   :  :  :
                   ((____))  /\\ / :.'
                  /((____)).'  '
                     '.__   _.'      (_)

==========================================
        GATOR Evaluation Environment
==========================================

Type help for available commands
`;

export const TerminalMockup: React.FC<TerminalMockupProps> = ({
  lines,
  title = "AI Evaluator",
  width = 600,
  startFrame = 0,
  variant = "default",
  showAsciiHeader = false,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  const isGator = variant === "gator";
  const colors = isGator ? GATOR_TYPE_COLORS : TYPE_COLORS;
  const prefixes = isGator ? GATOR_TYPE_PREFIXES : TYPE_PREFIXES;

  // Terminal entrance
  const terminalOpacity = interpolate(relativeFrame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const terminalScale = interpolate(relativeFrame, [0, 20], [0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ASCII header fade in (for gator variant)
  const asciiOpacity = interpolate(relativeFrame, [0, 15], [0, 1], {
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

  // GATOR variant - flat dark terminal
  if (isGator) {
    return (
      <div
        style={{
          width,
          backgroundColor: "#1a1a1a",
          borderRadius: 4,
          overflow: "hidden",
          opacity: terminalOpacity,
          transform: `scale(${terminalScale})`,
          border: `1px solid ${COLORS.accentGreen}30`,
        }}
      >
        {/* Terminal content */}
        <div
          style={{
            padding: 16,
            minHeight: 200,
          }}
        >
          {/* ASCII Header */}
          {showAsciiHeader && (
            <pre
              style={{
                ...fontStyles.mono,
                fontSize: 10,
                lineHeight: 1.2,
                color: COLORS.accentGreen,
                margin: 0,
                marginBottom: 16,
                opacity: asciiOpacity,
                whiteSpace: "pre",
              }}
            >
              {GATOR_ASCII_ART}
            </pre>
          )}

          {/* Terminal lines */}
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
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: colors[line.type],
                  opacity: lineOpacity,
                  display: "flex",
                }}
              >
                {prefixes[line.type] && (
                  <span style={{ color: colors[line.type], opacity: 0.8 }}>
                    {prefixes[line.type]}
                  </span>
                )}
                <span>{displayText}</span>
                {showCursor && (
                  <span
                    style={{
                      backgroundColor: COLORS.accentGreen,
                      width: 8,
                      height: 16,
                      display: "inline-block",
                      marginLeft: 2,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Default variant - macOS styled terminal
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
                color: colors[line.type],
                opacity: lineOpacity,
                display: "flex",
              }}
            >
              <span style={{ color: colors[line.type], opacity: 0.7 }}>
                {prefixes[line.type]}
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
