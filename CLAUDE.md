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

This is a **Remotion** project for creating promotional videos using React. The active composition is **GatorPromoV2** at 1920x1080, 30fps (~97 seconds).

### Video Structure

- **Root.tsx** - Defines compositions with timing/dimensions from config
- **VideoV2.tsx** - Orchestrates all V2 scenes using `TransitionSeries` from `@remotion/transitions`

There are two versions:
- **V2 (active)**: `scenesV2/`, `componentsV2/`, `config/themeV2.ts` - Current pitch deck messaging
- **V1 (archived)**: `scenes/`, `components/`, `config/theme.ts` - Original version, commented out in Root.tsx

### V2 Scenes (src/scenesV2/)

6 sequential scenes with fade transitions:
1. `Scene1_ReadinessGap` - Three gaps problem framing
2. `Scene2_Thesis` - "I Think" to "I Know" transition + logo
3. `Scene3_Pillars/` - Three pillars with sub-components (Pillar1_Environment, Pillar2_Evaluator, Pillar3_Insights)
4. `Scene4_Testimonial` - Dual testimonials
5. `Scene5_Security` - Trust signals and compliance badges
6. `Scene6_CTA` - Call to action with pilot mention

### Configuration (src/config/)

- **themeV2.ts** - `TIMING_V2` (scene durations in frames), `MESSAGING_V2` (all text content)
- **theme.ts** - `COLORS`, `TYPOGRAPHY`, `DIMENSIONS` (shared between V1/V2)
- **fonts.ts** - Google Fonts loading (Inter, JetBrains Mono) via `@remotion/google-fonts`

### V2 Components (src/componentsV2/)

`PillarCard`, `SplitCompare`, `MetricDisplay`, `ReadinessGauge`, `NetworkGraph`, `SecurityBadge`, `TerminalMockup`

### Assets (public/)

Screenshots and video files used in scenes. Reference with `staticFile()` from remotion.

## Key Patterns

- Scene timing is defined in frames (30fps = 30 frames per second)
- All V2 text content lives in `MESSAGING_V2` in `config/themeV2.ts`
- Use `useCurrentFrame()` and `interpolate()` for animations
- Use `TransitionSeries` for sequencing scenes with transitions
- Tailwind CSS v4 is available via `@remotion/tailwind-v4`
- The `.claude/skills/remotion-best-practices/` directory contains detailed Remotion documentation - reference the rule files for specific features (animations, audio, fonts, transitions, etc.)
