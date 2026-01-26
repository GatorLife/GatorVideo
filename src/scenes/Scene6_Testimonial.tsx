import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { QuoteCard } from "../components/QuoteCard";
import { GridPattern } from "../components/GridPattern";
import { COLORS } from "../config/theme";

export const Scene6_Testimonial: React.FC = () => {
  const frame = useCurrentFrame();

  // Fade in
  const fadeIn = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.deepGreen,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Grid pattern background */}
      <GridPattern
        strokeColor={COLORS.accentGreen}
        opacity={0.1}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 100%)`,
        }}
      />

      {/* Quote card */}
      <div style={{ opacity: fadeIn }}>
        <QuoteCard
          quote="I love using GATOR. It allows me to spin up evaluation environments in minutes saving me time and allowing me to focus on what matters most—the operators."
          author="SMSgt Larsen"
          title="Cyber Ops Squadron Stan Eval"
          startFrame={15}
        />
      </div>

      {/* Decorative corner elements */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          width: 60,
          height: 60,
          borderTop: `3px solid ${COLORS.accentGreen}`,
          borderLeft: `3px solid ${COLORS.accentGreen}`,
          opacity: fadeIn,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 40,
          width: 60,
          height: 60,
          borderTop: `3px solid ${COLORS.accentGreen}`,
          borderRight: `3px solid ${COLORS.accentGreen}`,
          opacity: fadeIn,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 40,
          width: 60,
          height: 60,
          borderBottom: `3px solid ${COLORS.accentGreen}`,
          borderLeft: `3px solid ${COLORS.accentGreen}`,
          opacity: fadeIn,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          width: 60,
          height: 60,
          borderBottom: `3px solid ${COLORS.accentGreen}`,
          borderRight: `3px solid ${COLORS.accentGreen}`,
          opacity: fadeIn,
        }}
      />
    </div>
  );
};
