// Scene 4 - Product Demo Configuration
// Segment timing, screen states, and interaction data

import { SegmentConfig, ScreenState, InteractionEvent, InputFieldConfig } from './types';

// Timing constants
export const SEGMENT_DURATION = 300; // 10 seconds each at 30fps (legacy)
export const SEGMENT_1_DURATION = 600; // 20 seconds for segment 1 (doubled)
export const SEGMENT_2_DURATION = 690; // 23 seconds for segment 2 (extended for overview)
export const SEGMENT_3_DURATION = 450; // 15 seconds for segment 3 (admin grading)
export const TOTAL_DURATION = 1740; // 58 seconds total (600 + 690 + 450)
export const TRANSITION_FRAMES = 20; // Crossfade duration

// Screen dimensions for cursor positioning (based on 1920x1080 with margins)
export const SCREEN_AREA = {
  left: 80,
  top: 80,
  right: 1840,
  bottom: 900,
  width: 1760,
  height: 820,
};

// ============================================
// SEGMENT 1: Template Creation & Evaluation Assignment
// ============================================

const segment1ScreenStates: ScreenState[] = [
  {
    id: 'dashboard',
    label: 'Admin Dashboard',
    description: 'Admin dashboard with navigation sidebar',
    captureNotes: [],
    imagePath: 'Scene4_Segment1_1_Dashboard.png',
  },
  {
    id: 'templates',
    label: 'Templates List',
    description: 'Templates list page with create button',
    captureNotes: [],
    imagePath: 'Scene4_Segment1_2_Templates.png',
  },
  {
    id: 'ai-operation',
    label: 'Create Template - AI Operation',
    description: 'Create evaluation template form with AI operation',
    captureNotes: [],
    imagePath: 'Scene4_Segment1_3_AIOperation.png',
  },
  {
    id: 'ai-network',
    label: 'AI Generated Network',
    description: 'AI-generated network topology diagram',
    captureNotes: [],
    imagePath: 'Scene4_Segment1_4_AINetwork.png',
  },
  {
    id: 'question-creation',
    label: 'Create Question',
    description: 'Create new question modal',
    captureNotes: [],
    imagePath: 'Scene4_Segment1_5_QuestionCreation.png',
  },
  {
    id: 'evaluation-assignment',
    label: 'Assign Evaluation',
    description: 'Evaluation management page',
    captureNotes: [],
    imagePath: 'Scene4_Segment1_6_EvaluationAssignment.png',
  },
];

const segment1InputFields: InputFieldConfig[] = [
  {
    id: 'question-input',
    position: { x: 706, y: 454 },  // Position over the Question field in modal (accounts for 80px content area offset)
    width: 380,
    height: 40,
    placeholder: '',
  },
];

const segment1Interactions: InteractionEvent[] = [
  // Dashboard - start
  { frame: 0, cursor: { x: 960, y: 400 }, action: { type: 'idle' } },

  // Move to Templates sidebar
  { frame: 10, cursor: { x: 960, y: 400 }, action: { type: 'move', to: { x: 410, y: 237 }, duration: 50 } },

  // Click Templates
  { frame: 60, cursor: { x: 410, y: 237 }, action: { type: 'click' }, screenState: 'templates' },

  // Move to Create Template button
  { frame: 100, cursor: { x: 410, y: 237 }, action: { type: 'move', to: { x: 1299, y: 154 }, duration: 40 } },

  // Click Create Template
  { frame: 140, cursor: { x: 1299, y: 154 }, action: { type: 'click' }, screenState: 'ai-operation' },

  // Move to AI OPERATION button
  { frame: 180, cursor: { x: 1299, y: 154 }, action: { type: 'move', to: { x: 1506, y: 210 }, duration: 40 } },

  // Click AI OPERATION (show it's already generated)
  { frame: 220, cursor: { x: 1506, y: 210 }, action: { type: 'click' } },

  // Move to AI NETWORK button
  { frame: 240, cursor: { x: 1506, y: 210 }, action: { type: 'move', to: { x: 1506, y: 171 }, duration: 30 } },

  // Click AI NETWORK
  { frame: 270, cursor: { x: 1506, y: 171 }, action: { type: 'click' }, screenState: 'ai-network' },

  // Pause on network diagram
  { frame: 300, cursor: { x: 1506, y: 171 }, action: { type: 'idle' } },

  // Move to Create Question (in questions table area)
  { frame: 320, cursor: { x: 1506, y: 171 }, action: { type: 'move', to: { x: 1506, y: 171 }, duration: 30 } },

  // Click Create Question
  { frame: 350, cursor: { x: 1506, y: 171 }, action: { type: 'click' }, screenState: 'question-creation' },

  // Move to Question input field
  { frame: 370, cursor: { x: 1506, y: 171 }, action: { type: 'move', to: { x: 922, y: 535 }, duration: 20 } },

  // Click Question input
  { frame: 390, cursor: { x: 922, y: 535 }, action: { type: 'click' } },

  // Type the question (keep charsPerSecond same - more time available)
  { frame: 400, cursor: { x: 922, y: 535 }, action: { type: 'type', text: 'Which IP is the Web Server?', targetId: 'question-input', charsPerSecond: 25 } },

  // Move to Create Question button
  { frame: 470, cursor: { x: 922, y: 535 }, action: { type: 'move', to: { x: 1097, y: 823 }, duration: 20 } },

  // Click Create Question
  { frame: 490, cursor: { x: 1097, y: 823 }, action: { type: 'click' }, screenState: 'evaluation-assignment' },

  // Move to Create Evaluation button
  { frame: 520, cursor: { x: 1097, y: 823 }, action: { type: 'move', to: { x: 563, y: 341 }, duration: 30 } },

  // Click Create Evaluation
  { frame: 550, cursor: { x: 563, y: 341 }, action: { type: 'click' } },

  // Hold final state
  { frame: 570, cursor: { x: 563, y: 341 }, action: { type: 'idle' } },
];

export const SEGMENT_1_CONFIG: SegmentConfig = {
  id: 'segment-1-template-creation',
  title: 'Template Creation & Evaluation Assignment',
  subtitle: 'Create AI-powered evaluation templates',
  durationFrames: SEGMENT_1_DURATION,
  screenStates: segment1ScreenStates,
  inputFields: segment1InputFields,
  interactions: segment1Interactions,
};

// ============================================
// SEGMENT 2: Student Evaluation Flow
// ============================================

const segment2ScreenStates: ScreenState[] = [
  {
    id: 'student-login',
    label: 'Student Login',
    description: 'Student clicks login button',
    captureNotes: [],
    imagePath: 'Scene4_Segment2_1_StudentLogin.png',
  },
  {
    id: 'student-dashboard',
    label: 'Student Dashboard',
    description: 'Current and past evaluations',
    captureNotes: [],
    imagePath: 'Scene4_Segment2_2_StudentDashboard.png',
  },
  {
    id: 'gator-ai',
    label: 'GATOR AI Chat',
    description: 'AI chat expanded showing next evaluation',
    captureNotes: [],
    imagePath: 'Scene4_Segment2_3_GATORAI.png',
  },
  {
    id: 'start-evaluation',
    label: 'Start Evaluation',
    description: 'Student clicks evaluation',
    captureNotes: [],
    imagePath: 'Scene4_Segment2_4_StartEvaluation.png',
  },
  {
    id: 'evaluation-started',
    label: 'Evaluation Started',
    description: 'Evaluation screen after clicking Start',
    captureNotes: [],
    imagePath: 'Scene4_Segment2_5_EvaluationStarted.png',
  },
  {
    id: 'terminal-split',
    label: 'Terminal & Question',
    description: 'Split view: Question left, Terminal right',
    captureNotes: [],
    layout: 'split-horizontal',
    leftImagePath: 'Scene4_Segment2_7b_QuestionSubmission.png',
    rightImagePath: 'Scene4_Segment2_6_GATORTerminal.png',
  },
  {
    id: 'terminal-populated-split',
    label: 'Terminal Populated & Question',
    description: 'After NMAP typed, ready for IP input',
    captureNotes: [],
    layout: 'split-horizontal',
    leftImagePath: 'Scene4_Segment2_7b_QuestionSubmission.png',
    rightImagePath: 'Scene4_Segment2_7_GATORTerminalPopulated.png',
  },
  {
    id: 'evaluation-overview',
    label: 'Evaluation Overview',
    description: 'Grading results shown',
    captureNotes: [],
    imagePath: 'Scene4_Segment2_8_EvaluationOverview.png',
  },
];

const segment2InputFields: InputFieldConfig[] = [
  {
    id: 'nmap-input',
    position: { x: 967, y: 209 },  // Right side terminal prompt (screen 1047,289 minus 80,80 content offset)
    width: 0,  // No styling - just text
    height: 40,
    placeholder: '',
  },
  {
    id: 'ip-input',
    position: { x: 332, y: 366 },  // Left side answer field (screen 412,446 minus 80,80 content offset)
    width: 0,  // No styling - just text
    height: 40,
    placeholder: '',
  },
];

const segment2Interactions: InteractionEvent[] = [
  // 1. Student Login - start (frames 0-60)
  { frame: 0, cursor: { x: 960, y: 400 }, action: { type: 'idle' } },

  // Move to Sign In button (calibrated: 856, 581)
  { frame: 10, cursor: { x: 960, y: 400 }, action: { type: 'move', to: { x: 856, y: 581 }, duration: 40 } },

  // Click Sign In
  { frame: 50, cursor: { x: 856, y: 581 }, action: { type: 'click' }, screenState: 'student-dashboard' },

  // 2. Dashboard - click chat icon (frames 60-130) (calibrated: 1551, 885)
  { frame: 70, cursor: { x: 856, y: 581 }, action: { type: 'move', to: { x: 1551, y: 885 }, duration: 50 } },

  // Click AI chat icon
  { frame: 120, cursor: { x: 1551, y: 885 }, action: { type: 'click' }, screenState: 'gator-ai' },

  // 3. GATOR AI - click evaluation in chat (frames 130-200) (calibrated: 669, 518)
  { frame: 140, cursor: { x: 1551, y: 885 }, action: { type: 'move', to: { x: 669, y: 518 }, duration: 50 } },

  // Click on evaluation
  { frame: 190, cursor: { x: 669, y: 518 }, action: { type: 'click' }, screenState: 'start-evaluation' },

  // 4. Start Evaluation - click start button (frames 200-270) (calibrated: 1033, 227)
  { frame: 210, cursor: { x: 669, y: 518 }, action: { type: 'move', to: { x: 1033, y: 227 }, duration: 50 } },

  // Click Start Evaluation button
  { frame: 260, cursor: { x: 1033, y: 227 }, action: { type: 'click' }, screenState: 'evaluation-started' },

  // 5. Evaluation Started - click to go to terminal (frames 270-350) (calibrated: 547, 93)
  { frame: 280, cursor: { x: 1033, y: 227 }, action: { type: 'move', to: { x: 547, y: 93 }, duration: 50 } },

  // Click to open terminal/question
  { frame: 330, cursor: { x: 547, y: 93 }, action: { type: 'click' }, screenState: 'terminal-split' },

  // 6. Split screen - type NMAP on right terminal (frames 350-450) (calibrated: 1047, 289)
  { frame: 360, cursor: { x: 547, y: 93 }, action: { type: 'move', to: { x: 1047, y: 289 }, duration: 30 } },

  // Click terminal input area
  { frame: 390, cursor: { x: 1047, y: 289 }, action: { type: 'click' } },

  // Type NMAP command
  { frame: 400, cursor: { x: 1047, y: 289 }, action: { type: 'type', text: 'nmap 172.20.10.0/24', targetId: 'nmap-input', charsPerSecond: 20 } },

  // Transition to populated terminal after typing
  { frame: 450, cursor: { x: 1047, y: 289 }, action: { type: 'idle' }, screenState: 'terminal-populated-split' },

  // 7. Split screen - type IP on left question (frames 450-560) (calibrated: 412, 446)
  { frame: 470, cursor: { x: 1047, y: 289 }, action: { type: 'move', to: { x: 412, y: 446 }, duration: 30 } },

  // Click IP input field
  { frame: 500, cursor: { x: 412, y: 446 }, action: { type: 'click' } },

  // Type IP address
  { frame: 510, cursor: { x: 412, y: 446 }, action: { type: 'type', text: '172.20.10.100', targetId: 'ip-input', charsPerSecond: 15 } },

  // 8. Submit and show overview (frames 560-690) - extended duration
  { frame: 555, cursor: { x: 412, y: 446 }, action: { type: 'move', to: { x: 744, y: 560 }, duration: 25 } },

  // Click submit
  { frame: 580, cursor: { x: 744, y: 560 }, action: { type: 'click' }, screenState: 'evaluation-overview' },

  // Move cursor off-screen for overview
  { frame: 585, cursor: { x: 744, y: 560 }, action: { type: 'move', to: { x: -100, y: -100 }, duration: 10 } },

  // Hold final state for extended viewing (cursor off-screen)
  { frame: 600, cursor: { x: -100, y: -100 }, action: { type: 'idle' } },
];

export const SEGMENT_2_CONFIG: SegmentConfig = {
  id: 'segment-2-student-evaluation',
  title: 'Student Evaluation Flow',
  subtitle: 'Complete an AI-powered security assessment',
  durationFrames: SEGMENT_2_DURATION,
  screenStates: segment2ScreenStates,
  inputFields: segment2InputFields,
  interactions: segment2Interactions,
};

// ============================================
// SEGMENT 3: Admin Grading & AI Insights
// ============================================

const segment3ScreenStates: ScreenState[] = [
  {
    id: 'admin-dashboard',
    label: 'Admin Dashboard',
    description: 'Admin sees evaluation completed',
    captureNotes: [],
    imagePath: 'Scene4_Segment3_1_AdminDashboard.png',
  },
  {
    id: 'admin-evaluations',
    label: 'Admin Evaluations',
    description: 'Admin reviews evaluations list',
    captureNotes: [],
    imagePath: 'Scene4_Segment3_2_AdminEvaluations.png',
  },
  {
    id: 'evaluation-gradesheet',
    label: 'Evaluation GradeSheet',
    description: 'AI generated grading for evaluation',
    captureNotes: [],
    imagePath: 'Scene4_Segment3_3_EvaluationGradeSheet.png',
  },
  {
    id: 'evaluation-ai-graded',
    label: 'AI Graded Summary',
    description: 'AI SUMMARY consolidates everything',
    captureNotes: [],
    imagePath: 'Scene4_Segment3_4_EvaluationAIGraded.png',
  },
];

const segment3InputFields: InputFieldConfig[] = [
  {
    id: 'comment-input',
    position: { x: 630, y: 500 },  // Over the Comments input box (content-area relative: 710-80, 580-80)
    width: 0,  // No padding (auto-expand horizontally)
    height: 40,
    placeholder: '',
  },
];

const segment3Interactions: InteractionEvent[] = [
  // 1. Admin Dashboard - start (frames 0-80)
  { frame: 0, cursor: { x: 960, y: 400 }, action: { type: 'idle' } },

  // Move to Evaluations nav/button (calibrated: 393, 224)
  { frame: 10, cursor: { x: 960, y: 400 }, action: { type: 'move', to: { x: 393, y: 224 }, duration: 50 } },

  // Click Evaluations
  { frame: 60, cursor: { x: 393, y: 224 }, action: { type: 'click' }, screenState: 'admin-evaluations' },

  // 2. Admin Evaluations - click "Find That Flamingo!" (calibrated: 671, 525)
  { frame: 90, cursor: { x: 393, y: 224 }, action: { type: 'move', to: { x: 671, y: 525 }, duration: 50 } },

  // Click the evaluation
  { frame: 140, cursor: { x: 671, y: 525 }, action: { type: 'click' }, screenState: 'evaluation-gradesheet' },

  // 3. GradeSheet - type comments (frames 160-320)
  { frame: 170, cursor: { x: 671, y: 525 }, action: { type: 'move', to: { x: 710, y: 580 }, duration: 40 } },

  // Click comment field
  { frame: 210, cursor: { x: 710, y: 580 }, action: { type: 'click' } },

  // Type comment
  { frame: 220, cursor: { x: 710, y: 580 }, action: { type: 'type', text: 'You did it!  You found the Flamingo!', targetId: 'comment-input', charsPerSecond: 20 } },

  // 4. Click AI SUMMARY button (frames 320-450)
  { frame: 330, cursor: { x: 710, y: 580 }, action: { type: 'move', to: { x: 1316, y: 662 }, duration: 40 } },

  // Click AI SUMMARY
  { frame: 370, cursor: { x: 1316, y: 662 }, action: { type: 'click' }, screenState: 'evaluation-ai-graded' },

  // Hold final state
  { frame: 400, cursor: { x: 1316, y: 662 }, action: { type: 'idle' } },
];

export const SEGMENT_3_CONFIG: SegmentConfig = {
  id: 'segment-3-admin-grading',
  title: 'AI Supported Insights',
  subtitle: 'Review AI-graded evaluations',
  durationFrames: SEGMENT_3_DURATION,
  screenStates: segment3ScreenStates,
  inputFields: segment3InputFields,
  interactions: segment3Interactions,
};

// Export all segment configs
export const SEGMENT_CONFIGS = [
  SEGMENT_1_CONFIG,
  SEGMENT_2_CONFIG,
  SEGMENT_3_CONFIG,
];
