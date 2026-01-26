# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev         # Start Remotion Studio for preview
npm run build       # Render the video (remotion render)
npm run lint        # Run ESLint and TypeScript checks
npm run upgrade     # Upgrade Remotion to latest version
```

## Architecture

This is a **Remotion** project for creating promotional videos using React. The main composition is "GatorPromo" at 1920x1080, 30fps.

### Video Structure

- **Root.tsx** - Defines the Composition with timing/dimensions from config
- **Video.tsx** - Orchestrates all scenes using `TransitionSeries` from `@remotion/transitions`

### Scenes (src/scenes/)

The video has 7 sequential scenes with fade transitions between them:
1. `Scene1_Hook` - Matrix-style intro with typing effect
2. `Scene2_Problem` - Cyber attack visualization
3. `Scene3_LogoReveal` - Logo animation
4. `Scene4_ProductDemo` - Product walkthrough (most complex scene)
5. `Scene5_Resolution` - Red to green transition
6. `Scene6_Testimonial` - Quote/testimonial
7. `Scene7_CTA` - Call to action

**Scene4** has its own subdirectory structure with segments (`Segment1_EnvironmentCreation`, `Segment2_UserEvaluations`, `Segment3_Insights`), custom hooks, types, and config.

### Configuration (src/config/)

- **theme.ts** - `COLORS`, `TIMING` (scene durations in frames), `TYPOGRAPHY`, `DIMENSIONS`
- **fonts.ts** - Google Fonts loading (Inter, JetBrains Mono) via `@remotion/google-fonts`

### Reusable Components (src/components/)

Visual effects and animations: `MatrixRain`, `GlowText`, `TypingEffect`, `GlitchTransition`, `HighlightBox`, `TextOverlay`, `StatusIndicator`, `GridPattern`, `QuoteCard`

Demo simulation components in `components/demo/`: `AnimatedCursor`, `ClickFeedback`, `ScreenContainer`, `ScreenTransition`, `InputFieldSimulator`, `UIStateManager`

### Assets (public/)

Screenshots and video files used in scenes. Reference with `staticFile()` from remotion.

## Key Patterns

- Scene timing is defined in frames in `src/config/theme.ts` (30fps = 30 frames per second)
- Use `useCurrentFrame()` and `interpolate()` for animations
- Use `TransitionSeries` for sequencing scenes with transitions
- Tailwind CSS v4 is available via `@remotion/tailwind-v4`
- The `.claude/skills/remotion-best-practices/` directory contains detailed Remotion documentation - reference the rule files for specific features (animations, audio, fonts, transitions, etc.)
