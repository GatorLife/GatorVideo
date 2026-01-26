import React from "react";
import { useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";
import { COLORS } from "../config/theme";
import { fontStyles } from "../config/fonts";

interface QuoteCardProps {
  quote: string;
  author: string;
  title?: string;
  startFrame?: number;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  author,
  title,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Staggered animations
  const quoteOpacity = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 200, stiffness: 80, mass: 0.5 },
  });

  const authorOpacity = spring({
    frame: frame - startFrame - 15,
    fps,
    config: { damping: 200, stiffness: 80, mass: 0.5 },
  });

  const quoteMarkScale = interpolate(
    frame - startFrame,
    [0, 20],
    [0.5, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 120px",
        maxWidth: 1400,
        textAlign: "center",
      }}
    >
      {/* Opening quote mark */}
      <div
        style={{
          ...fontStyles.heading,
          fontSize: 120,
          color: COLORS.accentGreen,
          lineHeight: 0.5,
          marginBottom: 20,
          opacity: quoteOpacity,
          transform: `scale(${quoteMarkScale})`,
        }}
      >
        "
      </div>

      {/* Quote text */}
      <div
        style={{
          ...fontStyles.subheading,
          fontSize: 48,
          color: COLORS.white,
          lineHeight: 1.4,
          opacity: quoteOpacity,
          textShadow: "0 2px 20px rgba(0, 0, 0, 0.5)",
        }}
      >
        {quote}
      </div>

      {/* Attribution */}
      <div
        style={{
          marginTop: 40,
          opacity: authorOpacity,
        }}
      >
        <div
          style={{
            ...fontStyles.heading,
            fontSize: 28,
            color: COLORS.accentGreen,
          }}
        >
          — {author}
        </div>
        {title && (
          <div
            style={{
              ...fontStyles.body,
              fontSize: 20,
              color: COLORS.grayText,
              marginTop: 8,
            }}
          >
            {title}
          </div>
        )}
      </div>
    </div>
  );
};
