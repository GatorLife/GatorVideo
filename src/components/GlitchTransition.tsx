import React from "react";
import { useCurrentFrame, random } from "remotion";

interface GlitchTransitionProps {
  children: React.ReactNode;
  intensity?: number;
  startFrame?: number;
  durationFrames?: number;
}

export const GlitchTransition: React.FC<GlitchTransitionProps> = ({
  children,
  intensity = 1,
  startFrame = 0,
  durationFrames = 15,
}) => {
  const frame = useCurrentFrame();
  const progress = Math.max(
    0,
    Math.min(1, (frame - startFrame) / durationFrames)
  );

  // Only apply glitch during transition
  if (progress <= 0 || progress >= 1) {
    return <>{children}</>;
  }

  // Glitch intensity peaks in middle of transition
  const glitchAmount =
    Math.sin(progress * Math.PI) * intensity * 20;

  // RGB channel split
  const redOffset = glitchAmount * (random(`red-${frame}`) - 0.5);
  const blueOffset = glitchAmount * (random(`blue-${frame}`) - 0.5);

  // Horizontal slice displacement
  const slices = 8;
  const sliceData = Array.from({ length: slices }, (_, i) => ({
    top: `${(i / slices) * 100}%`,
    height: `${100 / slices}%`,
    translateX: (random(`slice-${i}-${frame}`) - 0.5) * glitchAmount * 2,
    visible: random(`visible-${i}-${frame}`) > 0.3,
  }));

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* Red channel */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translateX(${redOffset}px)`,
          mixBlendMode: "screen",
          opacity: 0.8,
        }}
      >
        <div
          style={{
            filter: "url(#red-channel)",
            width: "100%",
            height: "100%",
          }}
        >
          {children}
        </div>
      </div>

      {/* Blue channel */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translateX(${blueOffset}px)`,
          mixBlendMode: "screen",
          opacity: 0.8,
        }}
      >
        <div
          style={{
            filter: "url(#blue-channel)",
            width: "100%",
            height: "100%",
          }}
        >
          {children}
        </div>
      </div>

      {/* Main content with slice displacement */}
      <div style={{ position: "absolute", inset: 0 }}>
        {sliceData.map((slice, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: slice.top,
              left: 0,
              width: "100%",
              height: slice.height,
              transform: `translateX(${slice.translateX}px)`,
              overflow: "hidden",
              opacity: slice.visible ? 1 : 0.5,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: `-${(i / slices) * 100}%`,
                left: 0,
                width: "100%",
                height: `${slices * 100}%`,
              }}
            >
              {children}
            </div>
          </div>
        ))}
      </div>

      {/* Scanlines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.1) 2px,
            rgba(0, 0, 0, 0.1) 4px
          )`,
          pointerEvents: "none",
          opacity: glitchAmount / 10,
        }}
      />

      {/* SVG filters for color separation */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="red-channel">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
            />
          </filter>
          <filter id="blue-channel">
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

// Preset for use with TransitionSeries
export const glitchPresentation = () => ({
  component: GlitchTransition,
});
