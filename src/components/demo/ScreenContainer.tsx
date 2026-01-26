// Screen container with placeholder and capture annotations
import React from 'react';
import { useCurrentFrame, interpolate, Img, staticFile } from 'remotion';
import { Placeholder } from '../Placeholder';
import { COLORS } from '../../config/theme';
import { fontStyles } from '../../config/fonts';
import { ScreenState } from '../../scenes/Scene4/types';

interface ScreenContainerProps {
  screenState: ScreenState;
  opacity?: number;
  showAnnotations?: boolean;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  screenState,
  opacity = 1,
  showAnnotations = true,
}) => {
  const frame = useCurrentFrame();

  // Subtle Ken Burns effect
  const kenBurnsScale = interpolate(
    frame,
    [0, 300],
    [1.0, 1.02],
    { extrapolateRight: 'clamp' }
  );

  // Check if this is a split-screen layout
  const isSplitScreen = screenState.layout === 'split-horizontal';

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        opacity,
        position: 'relative',
      }}
    >
      {/* Main content - screenshot, split-screen, or placeholder */}
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: `scale(${kenBurnsScale})`,
          transformOrigin: 'center center',
        }}
      >
        {isSplitScreen ? (
          // Split-screen layout: two images side by side
          <div
            style={{
              display: 'flex',
              width: '100%',
              height: '100%',
              gap: 0,
            }}
          >
            {/* Left side */}
            <div style={{ flex: 1, height: '100%', position: 'relative' }}>
              {screenState.leftImagePath ? (
                <Img
                  src={staticFile(screenState.leftImagePath)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'right center',
                    borderRadius: '8px 0 0 8px',
                  }}
                />
              ) : (
                <Placeholder label="Left Panel" bgColor={COLORS.deepGreen} />
              )}
            </div>
            {/* Right side */}
            <div style={{ flex: 1, height: '100%', position: 'relative' }}>
              {screenState.rightImagePath ? (
                <Img
                  src={staticFile(screenState.rightImagePath)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'left center',
                    borderRadius: '0 8px 8px 0',
                  }}
                />
              ) : screenState.imagePath ? (
                <Img
                  src={staticFile(screenState.imagePath)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'left center',
                    borderRadius: '0 8px 8px 0',
                  }}
                />
              ) : (
                <Placeholder label="Right Panel" bgColor={COLORS.deepGreen} />
              )}
            </div>
          </div>
        ) : screenState.imagePath ? (
          <Img
            src={staticFile(screenState.imagePath)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        ) : (
          <Placeholder
            label={screenState.label}
            bgColor={COLORS.deepGreen}
          />
        )}
      </div>

      {/* Capture annotations overlay - only show for placeholders */}
      {showAnnotations && !screenState.imagePath && !isSplitScreen && (
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            left: 20,
            right: 20,
            padding: '16px 20px',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            borderRadius: 8,
            border: `1px solid ${COLORS.accentGreen}40`,
          }}
        >
          <div
            style={{
              ...fontStyles.subheading,
              fontSize: 14,
              color: COLORS.accentGreen,
              marginBottom: 8,
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            📸 Capture Notes
          </div>
          <div
            style={{
              ...fontStyles.body,
              fontSize: 13,
              color: COLORS.grayText,
              lineHeight: 1.5,
            }}
          >
            {screenState.captureNotes.map((note, index) => (
              <div key={index} style={{ marginBottom: 4 }}>
                • {note}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Screen state ID indicator - only show for placeholders */}
      {!screenState.imagePath && !isSplitScreen && (
        <div
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            padding: '6px 12px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderRadius: 4,
            ...fontStyles.mono,
            fontSize: 12,
            color: COLORS.muted,
          }}
        >
          {screenState.id}
        </div>
      )}
    </div>
  );
};
