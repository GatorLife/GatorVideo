import React from "react";
import { useCurrentFrame, interpolate, staticFile, Img } from "remotion";
import { MatrixRain } from "../components/MatrixRain";
import { COLORS, TIMING } from "../config/theme";
import { fontStyles } from "../config/fonts";

const LINE_1 = "Are we mission ready?";
const LINE_2 = "STATUS: UNKNOWN";
const CHARS_PER_SECOND = 12;
const FPS = 30;

export const Scene1_Hook: React.FC = () => {
  const frame = useCurrentFrame();

  // Timing calculations
  const framesPerChar = FPS / CHARS_PER_SECOND;

  // Line 1 timing
  const line1StartFrame = 10;
  const line1EndFrame = line1StartFrame + Math.ceil(LINE_1.length * framesPerChar);

  // Line 2 timing (starts after line 1 + processing pause)
  const line2StartFrame = line1EndFrame + 45;
  const line2EndFrame = line2StartFrame + Math.ceil(LINE_2.length * framesPerChar);

  // Matrix starts after all typing is done (+ brief pause)
  const matrixStartFrame = line2EndFrame + 25;

  // Calculate displayed characters for each line
  const line1Chars = Math.min(
    Math.max(0, Math.floor((frame - line1StartFrame) / framesPerChar)),
    LINE_1.length
  );

  const line2Chars = Math.min(
    Math.max(0, Math.floor((frame - line2StartFrame) / framesPerChar)),
    LINE_2.length
  );

  // Determine which line cursor should be on
  const isTypingLine1 = frame >= line1StartFrame && line1Chars < LINE_1.length;
  const isTypingLine2 = frame >= line2StartFrame && line2Chars < LINE_2.length;

  // Cursor blink
  const cursorVisible = (frame % 20) < 12;

  // Matrix opacity - only starts after typing is complete
  const matrixOpacity = interpolate(
    frame,
    [matrixStartFrame, matrixStartFrame + 30],
    [0, 0.6],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Text fade out at end of scene
  const textOpacity = interpolate(
    frame,
    [TIMING.scene1_hook - 30, TIMING.scene1_hook],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.black,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Matrix rain background - only appears after typing */}
      {frame >= matrixStartFrame && (
        <MatrixRain opacity={matrixOpacity} columns={70} speed={4} />
      )}

      {/* Dark overlay gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.7) 100%)`,
        }}
      />

      {/* Terminal text - top left with padding */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 80,
          opacity: textOpacity,
        }}
      >
        {/* Line 1 */}
        <div
          style={{
            ...fontStyles.mono,
            fontSize: 56,
            color: COLORS.matrixGreen,
            display: "flex",
            alignItems: "center",
            minHeight: 70,
          }}
        >
          <span>{LINE_1.slice(0, line1Chars)}</span>
          {isTypingLine1 && cursorVisible && (
            <Img
              src={staticFile("gator-icon.svg")}
              style={{
                width: 40,
                height: 40,
                marginLeft: 4,
              }}
            />
          )}
        </div>

        {/* Line 2 */}
        {frame >= line2StartFrame && (
          <div
            style={{
              ...fontStyles.mono,
              fontSize: 56,
              color: COLORS.warningRed,
              display: "flex",
              alignItems: "center",
              marginTop: 20,
              minHeight: 70,
            }}
          >
            <span>{LINE_2.slice(0, line2Chars)}</span>
            {isTypingLine2 && cursorVisible && (
              <Img
                src={staticFile("gator-icon.svg")}
                style={{
                  width: 40,
                  height: 40,
                  marginLeft: 4,
                }}
              />
            )}
          </div>
        )}

      </div>

      {/* Scanline effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 65, 0.03) 2px,
            rgba(0, 255, 65, 0.03) 4px
          )`,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
