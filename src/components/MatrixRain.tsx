import React from "react";
import { useCurrentFrame, random } from "remotion";
import { COLORS } from "../config/theme";
import { fontStyles } from "../config/fonts";

interface MatrixRainProps {
  columns?: number;
  speed?: number;
  opacity?: number;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>[]{}";

interface ColumnData {
  x: number;
  chars: string[];
  speed: number;
  offset: number;
}

export const MatrixRain: React.FC<MatrixRainProps> = ({
  columns = 35,
  speed = 3,
  opacity = 1,
}) => {
  const frame = useCurrentFrame();

  // Generate deterministic column data
  const columnData: ColumnData[] = React.useMemo(() => {
    return Array.from({ length: columns }, (_, i) => {
      const seed = `column-${i}`;
      const x = (i / columns) * 1920;
      const charCount = Math.floor(random(seed + "-count") * 15) + 10;
      const chars = Array.from({ length: charCount }, (_, j) =>
        CHARS[Math.floor(random(seed + `-char-${j}`) * CHARS.length)]
      );
      const columnSpeed = speed * (0.8 + random(seed + "-speed") * 0.4);
      const offset = random(seed + "-offset") * 1000;

      return { x, chars, speed: columnSpeed, offset };
    });
  }, [columns, speed]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1920,
        height: 1080,
        overflow: "hidden",
        opacity,
      }}
    >
      {columnData.map((col, colIndex) => {
        const y = ((frame * col.speed + col.offset) % (1080 + col.chars.length * 28)) - col.chars.length * 28;

        return (
          <div
            key={colIndex}
            style={{
              position: "absolute",
              left: col.x,
              top: y,
              display: "flex",
              flexDirection: "column",
              ...fontStyles.mono,
              fontSize: 20,
              lineHeight: "28px",
            }}
          >
            {col.chars.map((char, charIndex) => {
              // Cycle through characters over time
              const charFrame = Math.floor((frame + charIndex * 3) / 4);
              const currentChar = CHARS[(CHARS.indexOf(char) + charFrame) % CHARS.length];

              // Head character is bright white, trail fades to dark green
              const isHead = charIndex === 0;
              const trailFade = Math.max(0, 1 - charIndex / (col.chars.length * 0.7));

              let color: string;
              if (isHead) {
                color = COLORS.white;
              } else if (charIndex < 3) {
                color = COLORS.matrixGreen;
              } else {
                // Interpolate from matrixGreen to dark green based on position
                const alpha = trailFade;
                color = `rgba(0, 255, 65, ${alpha * 0.8})`;
              }

              return (
                <span
                  key={charIndex}
                  style={{
                    color,
                    textShadow: isHead
                      ? `0 0 10px ${COLORS.matrixGreen}, 0 0 20px ${COLORS.matrixGreen}`
                      : charIndex < 3
                        ? `0 0 5px ${COLORS.matrixGreen}`
                        : "none",
                  }}
                >
                  {currentChar}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
