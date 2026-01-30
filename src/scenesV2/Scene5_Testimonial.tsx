import React from "react";
import {
  useCurrentFrame,
  interpolate,
  AbsoluteFill,
  Audio,
  staticFile,
} from "remotion";
import { COLORS } from "../config/theme";
import { TIMING_V2, MESSAGING_V2 } from "../config/themeV2";
import { fontStyles } from "../config/fonts";

const { testimonial, testimonial2 } = MESSAGING_V2.resolution;

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  opacity: number;
  position: "top-left" | "bottom-right";
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  role,
  opacity,
  position,
}) => {
  const positionStyles =
    position === "top-left"
      ? { top: 80, left: 100 }
      : { bottom: 80, right: 100 };

  return (
    <div
      style={{
        position: "absolute",
        ...positionStyles,
        maxWidth: 800,
        padding: 40,
        opacity,
      }}
    >
      {/* Quote mark */}
      <div
        style={{
          ...fontStyles.heading,
          fontSize: 100,
          color: COLORS.accentGreen,
          opacity: 0.3,
          lineHeight: 0.5,
          marginBottom: 16,
        }}
      >
        "
      </div>

      {/* Quote text */}
      <p
        style={{
          ...fontStyles.body,
          fontSize: 42,
          color: COLORS.white,
          lineHeight: 1.4,
          margin: 0,
          marginBottom: 36,
        }}
      >
        {quote}
      </p>

      {/* Attribution */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 4,
            height: 50,
            backgroundColor: COLORS.accentGreen,
          }}
        />
        <div>
          <div
            style={{
              ...fontStyles.subheading,
              fontSize: 28,
              color: COLORS.white,
            }}
          >
            {author}
          </div>
          <div
            style={{
              ...fontStyles.body,
              fontSize: 20,
              color: COLORS.grayText,
            }}
          >
            {role}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Scene5_Testimonial: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneDuration = TIMING_V2.scene5_testimonial;

  // First testimonial (left) - appears immediately
  const testimonial1Opacity = interpolate(
    frame,
    [0, 20, sceneDuration - 20, sceneDuration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Second testimonial (right) - appears 3.5 seconds later (105 frames)
  const testimonial2Delay = 105;
  const testimonial2Opacity = interpolate(
    frame,
    [testimonial2Delay, testimonial2Delay + 20, sceneDuration - 20, sceneDuration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.black,
      }}
    >
      <Audio src={staticFile("Scene6.mp3")} playbackRate={1.1} />

      {/* Subtle background glow */}
      <AbsoluteFill
        style={{
          backgroundColor: `${COLORS.accentGreen}08`,
        }}
      />

      {/* First testimonial - Top Left */}
      <TestimonialCard
        quote={testimonial.quote}
        author={testimonial.author}
        role={testimonial.role}
        opacity={testimonial1Opacity}
        position="top-left"
      />

      {/* Second testimonial - Bottom Right */}
      <TestimonialCard
        quote={testimonial2.quote}
        author={testimonial2.author}
        role={testimonial2.role}
        opacity={testimonial2Opacity}
        position="bottom-right"
      />

      {/* Corner accents - moved to outer corners */}
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 30,
          width: 60,
          height: 60,
          borderTop: `2px solid ${COLORS.accentGreen}`,
          borderRight: `2px solid ${COLORS.accentGreen}`,
          opacity: 0.3,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: 30,
          width: 60,
          height: 60,
          borderBottom: `2px solid ${COLORS.accentGreen}`,
          borderLeft: `2px solid ${COLORS.accentGreen}`,
          opacity: 0.3,
        }}
      />
    </AbsoluteFill>
  );
};
