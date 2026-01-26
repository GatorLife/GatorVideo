// Animated cursor component with SVG pointer, click animation, and glow trail
import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS } from '../../config/theme';
import { CursorState } from '../../scenes/Scene4/types';

interface AnimatedCursorProps {
  cursorState: CursorState;
  segmentFrame: number;
}

export const AnimatedCursor: React.FC<AnimatedCursorProps> = ({
  cursorState,
  segmentFrame,
}) => {
  const { fps } = useVideoConfig();
  const { position, isClicking, isTyping } = cursorState;

  // Click animation - scale down then back
  const clickScale = isClicking
    ? interpolate(
        segmentFrame % 10,
        [0, 3, 10],
        [1, 0.85, 1],
        { extrapolateRight: 'clamp' }
      )
    : 1;

  // Subtle breathing animation when idle
  const breathScale = interpolate(
    Math.sin(segmentFrame * 0.15),
    [-1, 1],
    [0.98, 1.02]
  );

  const scale = isClicking ? clickScale : breathScale;

  // Glow opacity pulses gently
  const glowOpacity = interpolate(
    Math.sin(segmentFrame * 0.1),
    [-1, 1],
    [0.3, 0.6]
  );

  // Hide cursor completely during typing
  if (isTyping) {
    return null;
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        transform: `translate(-4px, -2px) scale(${scale})`,
        pointerEvents: 'none',
        zIndex: 1000,
      }}
    >
      {/* Glow effect */}
      <div
        style={{
          position: 'absolute',
          top: 4,
          left: 4,
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.accentGreen}80 0%, transparent 70%)`,
          opacity: glowOpacity,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Pointer cursor SVG */}
      <svg
        width="32"
        height="40"
        viewBox="0 0 32 40"
        style={{
          filter: `drop-shadow(0 2px 4px rgba(0,0,0,0.4))`,
        }}
      >
        {/* Main pointer shape */}
        <path
          d="M4 2 L4 32 L10 26 L16 38 L20 36 L14 24 L24 24 Z"
          fill={COLORS.accentGreen}
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Inner highlight */}
        <path
          d="M6 6 L6 26 L10 22 L12 26 L14 25 L12 20 L18 20 Z"
          fill={COLORS.primaryLight}
          opacity="0.4"
        />
      </svg>
    </div>
  );
};
