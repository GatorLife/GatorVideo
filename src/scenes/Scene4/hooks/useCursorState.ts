// Hook to compute cursor position and state from interaction timeline
import { useMemo } from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { InteractionEvent, CursorState, Point } from '../types';

// Bezier easing for natural cursor movement
const bezierEase = (t: number): number => {
  // Custom ease-out cubic for natural feel
  return 1 - Math.pow(1 - t, 3);
};

// Find the current and previous interaction events
function findCurrentInteraction(
  interactions: InteractionEvent[],
  frame: number
): { current: InteractionEvent; previous: InteractionEvent | null; next: InteractionEvent | null } {
  let current = interactions[0];
  let previous: InteractionEvent | null = null;
  let next: InteractionEvent | null = null;

  for (let i = 0; i < interactions.length; i++) {
    if (interactions[i].frame <= frame) {
      previous = i > 0 ? interactions[i - 1] : null;
      current = interactions[i];
      next = interactions[i + 1] || null;
    } else {
      break;
    }
  }

  return { current, previous, next };
}

// Interpolate cursor position during movement
function interpolatePosition(
  from: Point,
  to: Point,
  progress: number
): Point {
  const easedProgress = bezierEase(progress);

  return {
    x: from.x + (to.x - from.x) * easedProgress,
    y: from.y + (to.y - from.y) * easedProgress,
  };
}

export function useCursorState(
  interactions: InteractionEvent[],
  segmentFrame: number
): CursorState {
  return useMemo(() => {
    const { current, next } = findCurrentInteraction(interactions, segmentFrame);

    let position = current.cursor;
    let isClicking = false;
    let isTyping = false;
    let currentText = '';
    let activeInputId: string | null = null;

    // Handle different action types
    switch (current.action.type) {
      case 'move': {
        const moveAction = current.action;
        const moveStart = current.frame;
        const moveEnd = moveStart + moveAction.duration;

        if (segmentFrame >= moveStart && segmentFrame <= moveEnd) {
          const progress = (segmentFrame - moveStart) / moveAction.duration;
          position = interpolatePosition(current.cursor, moveAction.to, progress);
        } else if (segmentFrame > moveEnd) {
          position = moveAction.to;
        }
        break;
      }

      case 'click': {
        // Click animation lasts ~10 frames
        const clickDuration = 10;
        const framesSinceClick = segmentFrame - current.frame;
        isClicking = framesSinceClick >= 0 && framesSinceClick < clickDuration;
        break;
      }

      case 'type': {
        const typeAction = current.action;
        activeInputId = typeAction.targetId;
        isTyping = true;

        // Calculate how much text has been typed
        const framesElapsed = segmentFrame - current.frame;
        const fps = 30;
        const charsPerSecond = typeAction.charsPerSecond || 20;
        const framesPerChar = fps / charsPerSecond;
        const charCount = Math.min(
          Math.floor(framesElapsed / framesPerChar),
          typeAction.text.length
        );
        currentText = typeAction.text.slice(0, charCount);

        // Check if typing is complete
        const totalTypingFrames = (typeAction.text.length * fps) / charsPerSecond;
        if (framesElapsed > totalTypingFrames) {
          isTyping = false;
          currentText = typeAction.text;
        }
        break;
      }

      case 'idle':
      default:
        // Keep position as-is
        break;
    }

    // If we're between interactions and the previous was a move, use the target position
    if (current.action.type !== 'move' && current.action.type !== 'type') {
      // Find if there was a previous move that ended
      for (let i = interactions.length - 1; i >= 0; i--) {
        const interaction = interactions[i];
        if (interaction.frame <= segmentFrame && interaction.action.type === 'move') {
          const moveAction = interaction.action;
          const moveEnd = interaction.frame + moveAction.duration;
          if (segmentFrame >= moveEnd) {
            position = moveAction.to;
          }
          break;
        }
      }
    }

    return {
      position,
      isClicking,
      isTyping,
      currentText,
      activeInputId,
    };
  }, [interactions, segmentFrame]);
}
