// Segment 1: Template Creation & Evaluation Assignment
// Duration: 300 frames (10 seconds)
import React, { useMemo } from 'react';
import { useCurrentFrame } from 'remotion';
import { AnimatedCursor } from '../../../components/demo/AnimatedCursor';
import { ClickFeedback } from '../../../components/demo/ClickFeedback';
import { UIStateManager } from '../../../components/demo/UIStateManager';
import { TextOverlay } from '../../../components/TextOverlay';
import { CoordinateHelper } from '../../../components/demo/CoordinateHelper';
import { useCursorState } from '../hooks/useCursorState';
import { useUIState } from '../hooks/useUIState';
import { useActiveTyping } from '../hooks/useActiveTyping';
import { SEGMENT_1_CONFIG } from '../config';
import { COLORS } from '../../../config/theme';
import { ClickFeedbackState } from '../types';

// Toggle this to enable coordinate helper in dev mode
const DEV_COORDINATE_HELPER = true;

export const Segment1_EnvironmentCreation: React.FC = () => {
  const frame = useCurrentFrame();

  const { screenStates, inputFields, interactions, title, subtitle } = SEGMENT_1_CONFIG;

  // Compute cursor state
  const cursorState = useCursorState(interactions, frame);

  // Compute UI state (screen transitions)
  const uiState = useUIState(interactions, screenStates[0].id, frame);

  // Compute typing state
  const typingState = useActiveTyping(interactions, inputFields, frame);

  // Track click events for ripple effects
  const clickEvents = useMemo((): ClickFeedbackState[] => {
    const clicks: ClickFeedbackState[] = [];
    let clickId = 0;

    for (const interaction of interactions) {
      if (interaction.action.type === 'click') {
        clicks.push({
          id: `click-${clickId++}`,
          position: interaction.cursor,
          startFrame: interaction.frame,
        });
      }
    }

    return clicks;
  }, [interactions]);

  // Merge typing state into cursor state
  const enhancedCursorState = {
    ...cursorState,
    isTyping: typingState.isTyping,
    currentText: typingState.displayText,
    activeInputId: typingState.activeFieldId,
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.darkBg,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Main content area */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          left: 80,
          right: 80,
          bottom: 180,
        }}
      >
        <UIStateManager
          uiState={uiState}
          cursorState={enhancedCursorState}
          screenStates={screenStates}
          inputFields={inputFields}
          showAnnotations={true}
        />
      </div>

      {/* Animated cursor */}
      <AnimatedCursor
        cursorState={enhancedCursorState}
        segmentFrame={frame}
      />

      {/* Click feedback ripples */}
      <ClickFeedback
        clicks={clickEvents}
        segmentFrame={frame}
      />

      {/* Segment title overlay */}
      <TextOverlay
        text={title}
        subtext={subtitle}
        position="bottom"
        fontSize={42}
        subtextSize={24}
        startFrame={5}
        fadeOutFrame={280}
      />

      {/* Progress indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: 80,
          right: 80,
          height: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: 2,
        }}
      >
        <div
          style={{
            height: '100%',
            backgroundColor: COLORS.accentGreen,
            borderRadius: 2,
            width: `${(frame / SEGMENT_1_CONFIG.durationFrames) * 100}%`,
            boxShadow: `0 0 10px ${COLORS.accentGreen}`,
          }}
        />
      </div>

      {/* Segment indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 50,
          right: 80,
          color: COLORS.grayText,
          fontSize: 18,
          fontFamily: 'Inter',
        }}
      >
        1 / 3
      </div>

      {/* Coordinate helper for development */}
      {DEV_COORDINATE_HELPER && (
        <CoordinateHelper
          enabled={true}
          contentArea={{
            left: 80,
            top: 80,
            width: 1760,
            height: 820,
          }}
          screenshotDimensions={{
            width: 3092,
            height: 1908,
          }}
        />
      )}
    </div>
  );
};
