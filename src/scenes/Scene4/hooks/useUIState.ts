// Hook to compute UI/screen state from interaction timeline
import { useMemo } from 'react';
import { InteractionEvent, UIState } from '../types';
import { TRANSITION_FRAMES } from '../config';

// Find screen state changes from interactions
function findScreenStateChanges(
  interactions: InteractionEvent[]
): { frame: number; screenId: string }[] {
  const changes: { frame: number; screenId: string }[] = [];

  for (const interaction of interactions) {
    if (interaction.screenState) {
      changes.push({
        frame: interaction.frame,
        screenId: interaction.screenState,
      });
    }
  }

  return changes;
}

export function useUIState(
  interactions: InteractionEvent[],
  initialScreenId: string,
  segmentFrame: number
): UIState {
  return useMemo(() => {
    const stateChanges = findScreenStateChanges(interactions);

    let currentScreenId = initialScreenId;
    let previousScreenId: string | null = null;
    let transitionProgress = 1;
    let isTransitioning = false;

    // Find current screen state
    for (let i = 0; i < stateChanges.length; i++) {
      const change = stateChanges[i];

      if (segmentFrame >= change.frame) {
        previousScreenId = currentScreenId;
        currentScreenId = change.screenId;

        // Check if we're in a transition
        const framesSinceChange = segmentFrame - change.frame;
        if (framesSinceChange < TRANSITION_FRAMES) {
          isTransitioning = true;
          transitionProgress = framesSinceChange / TRANSITION_FRAMES;
        } else {
          isTransitioning = false;
          transitionProgress = 1;
        }
      }
    }

    return {
      currentScreenId,
      previousScreenId,
      transitionProgress,
      isTransitioning,
    };
  }, [interactions, initialScreenId, segmentFrame]);
}
