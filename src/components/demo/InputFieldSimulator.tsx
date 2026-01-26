// Input field simulator with typing animation overlay
import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../../config/theme';
import { fontStyles } from '../../config/fonts';
import { InputFieldConfig } from '../../scenes/Scene4/types';

interface InputFieldSimulatorProps {
  config: InputFieldConfig;
  displayText: string;
  isActive: boolean;
  cursorVisible: boolean;
}

export const InputFieldSimulator: React.FC<InputFieldSimulatorProps> = ({
  config,
  displayText,
  isActive,
  cursorVisible,
}) => {
  const frame = useCurrentFrame();

  // Glow effect when active
  const glowIntensity = isActive
    ? interpolate(Math.sin(frame * 0.2), [-1, 1], [0.3, 0.6])
    : 0;

  // When width is 0, expand horizontally with no padding
  const isAutoWidth = config.width === 0;

  return (
    <div
      style={{
        position: 'absolute',
        left: config.position.x,
        top: config.position.y,
        width: isAutoWidth ? 'auto' : config.width,
        height: isAutoWidth ? 'auto' : config.height,
        backgroundColor: isAutoWidth ? 'transparent' : 'rgba(0, 0, 0, 0.9)',
        border: isAutoWidth ? 'none' : `2px solid ${isActive ? COLORS.accentGreen : COLORS.border}`,
        borderRadius: isAutoWidth ? 0 : 6,
        display: 'flex',
        alignItems: 'center',
        padding: isAutoWidth ? 0 : '0 14px',
        whiteSpace: 'nowrap',
        boxShadow: isAutoWidth
          ? 'none'
          : isActive
            ? `0 0 ${20 * glowIntensity}px ${COLORS.accentGreen}60`
            : 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
    >
      {/* Text content */}
      <span
        style={{
          ...fontStyles.body,
          fontSize: 16,
          color: displayText ? COLORS.white : COLORS.muted,
          flex: isAutoWidth ? 'none' : 1,
        }}
      >
        {displayText || config.placeholder || ''}
      </span>

      {/* Blinking cursor - hide in auto-width mode */}
      {isActive && !isAutoWidth && (
        <span
          style={{
            width: 2,
            height: config.height - 16,
            backgroundColor: COLORS.accentGreen,
            opacity: cursorVisible ? 1 : 0,
            marginLeft: 2,
          }}
        />
      )}
    </div>
  );
};
