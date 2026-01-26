// Hook to track active typing state across interactions
import { useMemo } from 'react';
import { InteractionEvent, InputFieldConfig } from '../types';

interface ActiveTypingState {
  isTyping: boolean;
  activeFieldId: string | null;
  displayText: string;
  cursorVisible: boolean;
  typingComplete: boolean;
}

export function useActiveTyping(
  interactions: InteractionEvent[],
  inputFields: InputFieldConfig[],
  segmentFrame: number
): ActiveTypingState {
  return useMemo(() => {
    // Find the current typing interaction
    let activeTypingInteraction: InteractionEvent | null = null;
    let typingInteractionIndex = -1;

    for (let i = 0; i < interactions.length; i++) {
      const interaction = interactions[i];
      if (interaction.action.type === 'type' && interaction.frame <= segmentFrame) {
        activeTypingInteraction = interaction;
        typingInteractionIndex = i;
      }
    }

    if (!activeTypingInteraction || activeTypingInteraction.action.type !== 'type') {
      return {
        isTyping: false,
        activeFieldId: null,
        displayText: '',
        cursorVisible: false,
        typingComplete: false,
      };
    }

    // Check if there's a screen transition after the typing that we've passed
    // If so, hide the input field
    for (let i = typingInteractionIndex + 1; i < interactions.length; i++) {
      const interaction = interactions[i];
      if (interaction.screenState && interaction.frame <= segmentFrame) {
        // We've transitioned to a new screen after typing - hide the input
        return {
          isTyping: false,
          activeFieldId: null,
          displayText: '',
          cursorVisible: false,
          typingComplete: true,
        };
      }
    }

    const typeAction = activeTypingInteraction.action;
    const framesElapsed = segmentFrame - activeTypingInteraction.frame;
    const fps = 30;
    const charsPerSecond = typeAction.charsPerSecond || 20;
    const framesPerChar = fps / charsPerSecond;

    const charCount = Math.min(
      Math.floor(framesElapsed / framesPerChar),
      typeAction.text.length
    );

    const displayText = typeAction.text.slice(0, charCount);
    const typingComplete = charCount >= typeAction.text.length;

    // Cursor blinks when typing is active
    const cursorCycle = 20; // frames per blink cycle
    const cursorVisible = !typingComplete || (segmentFrame % cursorCycle) < (cursorCycle / 2);

    // Only actively typing if not complete
    const isTyping = !typingComplete;

    return {
      isTyping,
      activeFieldId: typeAction.targetId,
      displayText,
      cursorVisible,
      typingComplete,
    };
  }, [interactions, segmentFrame]);
}
