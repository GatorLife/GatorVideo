import React from "react";
import { useCurrentFrame, interpolate, staticFile, Img } from "remotion";
import { MatrixRain } from "../components/MatrixRain";
import { COLORS } from "../config/theme";
import { TIMING_V2, MESSAGING_V2 } from "../config/themeV2";
import { fontStyles } from "../config/fonts";

const { line1, line2, line3 } = MESSAGING_V2.hook;
const CHARS_PER_SECOND = 14;
const FPS = 30;

export const Scene1_Hook: React.FC = () => {
  const frame = useCurrentFrame();

  // Timing calculations
  const framesPerChar = FPS / CHARS_PER_SECOND;

  // Line 1 timing - "Are we mission ready?"
  const line1StartFrame = 8;
  const line1EndFrame = line1StartFrame + Math.ceil(line1.length * framesPerChar);

  // Line 2 timing - "STATUS: UNKNOWN" (starts after line 1 + pause)
  const line2StartFrame = line1EndFrame + 30;
  const line2EndFrame = line2StartFrame + Math.ceil(line2.length * framesPerChar);

  // Line 3 timing - "Congress demands proof." (starts after line 2 + pause)
  const line3StartFrame = line2EndFrame + 25;
  const line3EndFrame = line3StartFrame + Math.ceil(line3.length * framesPerChar);

  // Matrix starts after all typing is done
  const matrixStartFrame = line3EndFrame + 15;

  // Calculate displayed characters for each line
  const line1Chars = Math.min(
    Math.max(0, Math.floor((frame - line1StartFrame) / framesPerChar)),
    line1.length
  );

  const line2Chars = Math.min(
    Math.max(0, Math.floor((frame - line2StartFrame) / framesPerChar)),
    line2.length
  );

  const line3Chars = Math.min(
    Math.max(0, Math.floor((frame - line3StartFrame) / framesPerChar)),
    line3.length
  );

  // Determine which line cursor should be on
  const isTypingLine1 = frame >= line1StartFrame && line1Chars < line1.length;
  const isTypingLine2 = frame >= line2StartFrame && line2Chars < line2.length;
  const isTypingLine3 = frame >= line3StartFrame && line3Chars < line3.length;

  // Cursor blink
  const cursorVisible = (frame % 18) < 10;

  // Matrix opacity - only starts after typing is complete
  const matrixOpacity = interpolate(
    frame,
    [matrixStartFrame, matrixStartFrame + 20],
    [0, 0.5],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Text fade out at end of scene
  const textOpacity = interpolate(
    frame,
    [TIMING_V2.scene1_hook - 25, TIMING_V2.scene1_hook],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const CursorIcon = () => (
    <Img
      src={staticFile("gator-icon.svg")}
      style={{
        width: 36,
        height: 36,
        marginLeft: 4,
      }}
    />
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
        <MatrixRain opacity={matrixOpacity} columns={60} speed={5} />
      )}

      {/* Dark overlay gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.75) 100%)`,
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
        {/* Line 1 - Question */}
        <div
          style={{
            ...fontStyles.mono,
            fontSize: 52,
            color: COLORS.matrixGreen,
            display: "flex",
            alignItems: "center",
            minHeight: 65,
          }}
        >
          <span>{line1.slice(0, line1Chars)}</span>
          {isTypingLine1 && cursorVisible && <CursorIcon />}
        </div>

        {/* Line 2 - Status */}
        {frame >= line2StartFrame && (
          <div
            style={{
              ...fontStyles.mono,
              fontSize: 52,
              color: COLORS.warningRed,
              display: "flex",
              alignItems: "center",
              marginTop: 16,
              minHeight: 65,
            }}
          >
            <span>{line2.slice(0, line2Chars)}</span>
            {isTypingLine2 && cursorVisible && <CursorIcon />}
          </div>
        )}

        {/* Line 3 - NDAA reference */}
        {frame >= line3StartFrame && (
          <div
            style={{
              ...fontStyles.mono,
              fontSize: 36,
              color: COLORS.grayText,
              display: "flex",
              alignItems: "center",
              marginTop: 32,
              minHeight: 50,
            }}
          >
            <span style={{ opacity: 0.7 }}>// </span>
            <span>{line3.slice(0, line3Chars)}</span>
            {isTypingLine3 && cursorVisible && <CursorIcon />}
          </div>
        )}
      </div>

      {/* NDAA badge - bottom right */}
      {frame >= line3EndFrame + 10 && (
        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 60,
            opacity: interpolate(
              frame,
              [line3EndFrame + 10, line3EndFrame + 30],
              [0, 0.8],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
          }}
        >
          <div
            style={{
              ...fontStyles.mono,
              fontSize: 18,
              color: COLORS.muted,
              padding: "12px 20px",
              border: `1px solid ${COLORS.border}`,
              borderRadius: 8,
            }}
          >
            2026 NDAA: $15.5B for cyber
          </div>
        </div>
      )}

      {/* Scanline effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 65, 0.02) 2px,
            rgba(0, 255, 65, 0.02) 4px
          )`,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
