// Screen transition component with crossfade
import React from 'react';
import { ScreenContainer } from './ScreenContainer';
import { ScreenState, UIState } from '../../scenes/Scene4/types';

interface ScreenTransitionProps {
  uiState: UIState;
  screenStates: ScreenState[];
  showAnnotations?: boolean;
}

export const ScreenTransition: React.FC<ScreenTransitionProps> = ({
  uiState,
  screenStates,
  showAnnotations = true,
}) => {
  const { currentScreenId, previousScreenId, transitionProgress, isTransitioning } = uiState;

  // Find screen state objects
  const currentScreen = screenStates.find(s => s.id === currentScreenId);
  const previousScreen = previousScreenId
    ? screenStates.find(s => s.id === previousScreenId)
    : null;

  if (!currentScreen) {
    return null;
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {/* Previous screen (fading out) */}
      {isTransitioning && previousScreen && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
          }}
        >
          <ScreenContainer
            screenState={previousScreen}
            opacity={1 - transitionProgress}
            showAnnotations={false}
          />
        </div>
      )}

      {/* Current screen (fading in or fully visible) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
        }}
      >
        <ScreenContainer
          screenState={currentScreen}
          opacity={isTransitioning ? transitionProgress : 1}
          showAnnotations={showAnnotations}
        />
      </div>
    </div>
  );
};
