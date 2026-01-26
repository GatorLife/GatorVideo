// Scene 4 - Product Demo Types
// Type definitions for animated UI interactions

export interface Point {
  x: number;
  y: number;
}

// Cursor action types
export type CursorActionType = 'idle' | 'move' | 'click' | 'type';

export interface IdleAction {
  type: 'idle';
}

export interface MoveAction {
  type: 'move';
  to: Point;
  duration: number; // frames
}

export interface ClickAction {
  type: 'click';
}

export interface TypeAction {
  type: 'type';
  text: string;
  targetId: string;
  charsPerSecond?: number;
}

export type CursorAction = IdleAction | MoveAction | ClickAction | TypeAction;

// Interaction event in timeline
export interface InteractionEvent {
  frame: number;           // Frame within segment
  cursor: Point;           // Cursor position at this frame
  action: CursorAction;
  screenState?: string;    // Trigger screen change
}

// Screen state configuration
export interface ScreenState {
  id: string;
  label: string;
  description: string;
  captureNotes: string[];
  imagePath?: string;  // Path to screenshot in public/
  // Split-screen support
  layout?: 'single' | 'split-horizontal';
  leftImagePath?: string;
  rightImagePath?: string;
}

// Input field overlay configuration
export interface InputFieldConfig {
  id: string;
  position: { x: number; y: number };
  width: number;
  height: number;
  placeholder?: string;
}

// Segment configuration
export interface SegmentConfig {
  id: string;
  title: string;
  subtitle: string;
  durationFrames: number;
  screenStates: ScreenState[];
  inputFields: InputFieldConfig[];
  interactions: InteractionEvent[];
}

// Cursor state computed from interactions
export interface CursorState {
  position: Point;
  isClicking: boolean;
  isTyping: boolean;
  currentText: string;
  activeInputId: string | null;
}

// UI state computed from interactions
export interface UIState {
  currentScreenId: string;
  previousScreenId: string | null;
  transitionProgress: number; // 0-1, for crossfade
  isTransitioning: boolean;
}

// Click feedback state
export interface ClickFeedbackState {
  id: string;
  position: Point;
  startFrame: number;
}
