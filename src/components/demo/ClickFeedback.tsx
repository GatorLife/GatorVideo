// Click feedback ripple effect component
import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS } from '../../config/theme';
import { ClickFeedbackState } from '../../scenes/Scene4/types';

interface ClickFeedbackProps {
  clicks: ClickFeedbackState[];
  segmentFrame: number;
}

const RIPPLE_DURATION = 20; // frames
const MAX_RIPPLE_SIZE = 80;

const SingleRipple: React.FC<{
  click: ClickFeedbackState;
  segmentFrame: number;
}> = ({ click, segmentFrame }) => {
  const { fps } = useVideoConfig();
  const framesSinceClick = segmentFrame - click.startFrame;

  // Only render if within duration
  if (framesSinceClick < 0 || framesSinceClick > RIPPLE_DURATION) {
    return null;
  }

  const progress = framesSinceClick / RIPPLE_DURATION;

  // Ripple expands from 0 to MAX_RIPPLE_SIZE
  const size = interpolate(
    progress,
    [0, 1],
    [0, MAX_RIPPLE_SIZE],
    { extrapolateRight: 'clamp' }
  );

  // Opacity fades out
  const opacity = interpolate(
    progress,
    [0, 0.3, 1],
    [0.7, 0.5, 0],
    { extrapolateRight: 'clamp' }
  );

  // Border width thins as it expands
  const borderWidth = interpolate(
    progress,
    [0, 1],
    [4, 1],
    { extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        position: 'absolute',
        left: click.position.x,
        top: click.position.y,
        width: size,
        height: size,
        borderRadius: '50%',
        border: `${borderWidth}px solid ${COLORS.accentGreen}`,
        opacity,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        boxShadow: `0 0 ${size / 4}px ${COLORS.accentGreen}40`,
      }}
    />
  );
};

export const ClickFeedback: React.FC<ClickFeedbackProps> = ({
  clicks,
  segmentFrame,
}) => {
  // Filter to only show recent clicks (within duration)
  const visibleClicks = clicks.filter(
    click =>
      segmentFrame >= click.startFrame &&
      segmentFrame <= click.startFrame + RIPPLE_DURATION
  );

  if (visibleClicks.length === 0) {
    return null;
  }

  return (
    <>
      {visibleClicks.map(click => (
        <SingleRipple
          key={click.id}
          click={click}
          segmentFrame={segmentFrame}
        />
      ))}
    </>
  );
};
