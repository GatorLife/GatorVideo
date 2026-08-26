# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev         # Start Remotion Studio for preview
npm run build       # Render the video (remotion render)
npm run build:tsm   # Render + stamp Rec709 tags -> out/GATOR_TSM.mp4 (use for submission)
npm run lint        # Run ESLint and TypeScript checks
npm run upgrade     # Upgrade Remotion to latest version
```

## Architecture

This is a **Remotion** project for creating promotional videos using React. The active composition is **GatorPromoV2** at 1920x1080, 30fps (~134 seconds).

### Video Structure

- **Root.tsx** - Defines compositions with timing/dimensions from config
- **VideoV2.tsx** - Orchestrates all V2 scenes using `TransitionSeries` from `@remotion/transitions`

There are two versions:
- **V2 (active)**: `scenesV2/`, `componentsV2/`, `config/themeV2.ts` - Current pitch deck messaging
- **V1 (archived)**: `scenes/`, `components/`, `config/theme.ts` - Original version, commented out in Root.tsx

### V2 Scenes (src/scenesV2/)

8 sequential scenes with fade transitions. Note the playback order is not the
filename order - Scenes A and B were added later and slot in after the pillars:
1. `Scene1_ReadinessGap` - Three gaps problem framing
2. `Scene2_Thesis` - "I Think" to "I Know" transition + logo
3. `Scene3_Pillars/` - Three pillars with sub-components (Pillar1_Environment, Pillar2_Evaluator, Pillar3_Insights)
4. `SceneA_StateOfArt` - TSM rubric criteria 3 (35%); before/after contrast
5. `SceneB_BusinessModel` - TSM rubric criteria 4 (10%); pilot-then-license + TRL ring
6. `Scene4_Testimonial` - Dual testimonials
7. `Scene5_Security` - Trust signals and compliance badges
8. `Scene6_CTA` - Call to action with pilot mention

### Configuration (src/config/)

- **themeV2.ts** - `TIMING_V2` (scene durations in frames), `MESSAGING_V2` (all text content)
- **theme.ts** - `COLORS`, `TYPOGRAPHY`, `DIMENSIONS` (shared between V1/V2)
- **fonts.ts** - Google Fonts loading (Inter, JetBrains Mono) via `@remotion/google-fonts`

### V2 Components (src/componentsV2/)

`PillarCard`, `SplitCompare`, `MetricDisplay`, `ReadinessGauge`, `NetworkGraph`, `SecurityBadge`, `TerminalMockup`

### Assets (public/)

Screenshots and video files used in scenes. Reference with `staticFile()` from remotion.

## TSM submission renders

Use `npm run build:tsm`, not `npm run build`. TSM Section VII.d.ii.3 requires
Rec709, and compliance check #5 verifies it. Two things are needed:

1. `Config.setColorSpace("bt709")` in `remotion.config.ts` - without it Remotion
   emits bt470bg (PAL) at full range, which fails outright.
2. An `h264_metadata` bitstream pass. Remotion passes `-color_primaries`/
   `-color_trc` to ffmpeg, but frames are pre-encoded and stream-copied, so only
   the matrix survives into the H.264 SPS VUI - `color_transfer` and
   `color_primaries` probe as `unknown`. Container-level tags do not override the
   SPS; the bitstream filter does. It is lossless, no re-encode.

Verify any submission candidate with:
`ffprobe -v error -select_streams v -show_streams FILE | grep -iE "^color|^pix_fmt"`
Expect `yuv420p`, `tv`, and `bt709` for all three of space/transfer/primaries.

## Key Patterns

- Scene timing is defined in frames (30fps = 30 frames per second)
- Voiceovers live in `public/` and all play at `playbackRate={1.1}`. The mp3
  numbering is legacy and does NOT match scene numbers (e.g. `Scene2.mp3` is
  Scene 1's narration); only `SceneA.mp3` / `SceneB.mp3` are named correctly.
  **Every track now has a `script` key in `MESSAGING_V2` naming the mp3 it
  belongs to** - the eight legacy ones were recovered by transcription. Treat
  those keys as the source of truth: if you change slide copy, check the script
  next to it, and if you regenerate a track, update the script first. Scene
  durations in `TIMING_V2` are derived from the measured audio length -
  re-measure with `ffprobe` and update both if you regenerate a track.
- New voiceovers are generated from Cole's cloned voice via the Epidemic Sound
  MCP server (`https://www.epidemicsound.com/a/mcp-service/mcp`): the
  `ListUserGeneratedVoices` -> `GenerateVoiceover` -> `PollVoiceoverGenerationStatus`
  -> `DownloadVoiceover` tool chain. The voice is registered as `en`, not `en-US`;
  passing `en-US` fails with an opaque INTERNAL_SERVER_ERROR.
- All V2 text content lives in `MESSAGING_V2` in `config/themeV2.ts`
- Scene copy is written against the TSM rubric (Appendix B of the announcement):
  Scene 1 = Criteria 1 (15%), Scenes 2/3/5 = Criteria 2 (40%), Scene A =
  Criteria 3 (35%), Scene B = Criteria 4 (10%). Before adding copy to a scene,
  check it is not already said elsewhere - Scene A was previously eight-ninths
  restatement of Scenes 1-3, which spent the heaviest-weighted slide on content
  that scored under a different criterion. Pillar 1's narration owns the
  "minutes, not days" speed claim; do not repeat it on Scene A.
- KNOWN MISMATCH: `Pillar2_Evaluator` is titled "AI Evaluator" and its slide
  text is about grading objectivity, but `Scene4_Pillar2.mp3` narrates the
  hands-on student experience (live terminals, real commands). The terminal
  mockup matches the narration; the text does not. Meanwhile Pillar 3's
  narration carries the grading-consistency claim that Pillar 2's slide makes.
  Unresolved - fixing it means re-recording at least one pillar track.
- Use `useCurrentFrame()` and `interpolate()` for animations
- Use `TransitionSeries` for sequencing scenes with transitions
- Tailwind CSS v4 is available via `@remotion/tailwind-v4`
- The `.claude/skills/remotion-best-practices/` directory contains detailed Remotion documentation - reference the rule files for specific features (animations, audio, fonts, transitions, etc.)

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
