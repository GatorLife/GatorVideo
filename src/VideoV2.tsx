import React from "react";
import { Sequence, Audio, interpolate, staticFile } from "remotion";
import {
  TransitionSeries,
  linearTiming,
  springTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

import { Scene1_ReadinessGap } from "./scenesV2/Scene1_ReadinessGap";
import { Scene2_Thesis } from "./scenesV2/Scene2_Thesis";
import { Scene3_Pillars } from "./scenesV2/Scene3_Pillars";
import { Scene4_Testimonial } from "./scenesV2/Scene4_Testimonial";
import { Scene5_Security } from "./scenesV2/Scene5_Security";
import { SceneA_StateOfArt } from "./scenesV2/SceneA_StateOfArt";
import { SceneB_BusinessModel } from "./scenesV2/SceneB_BusinessModel";
import { Scene6_CTA } from "./scenesV2/Scene6_CTA";
import { TIMING_V2, COLORS } from "./config/themeV2";

// Import fonts to ensure they're loaded
import "./config/fonts";

// Background music starts during video fade-out for smooth crossfade
const MUSIC_START = 200;

export const VideoV2: React.FC = () => {
  const transitionDuration = TIMING_V2.fadeTransition;
  const musicDuration = TIMING_V2.totalDuration - MUSIC_START;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.black,
      }}
    >
      {/* Background soundtrack - crossfades with Scene 1 video audio */}
      <Sequence from={MUSIC_START} durationInFrames={musicDuration}>
        <Audio
          src={staticFile("GATOR_Soundtrack.wav")}
          // The soundtrack is 112.96s. The video is now 134.2s, so without
          // `loop` the last ~21s would play silent - and TSM compliance check
          // #2 is that the video is audible. `extend` keeps the volume
          // callback's frame counter running across loop boundaries so the
          // end fade-out below still fires.
          loop
          loopVolumeCurveBehavior="extend"
          volume={(f) => {
            const crossfadeDuration = 50; // Crossfade from frame 200-250
            const fadeOut = 60; // 2 seconds at end

            // Slow fade in during crossfade with video audio
            if (f < crossfadeDuration) {
              return interpolate(f, [0, crossfadeDuration], [0, 0.15], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
            }
            // Fade out at end
            if (f > musicDuration - fadeOut) {
              return interpolate(f, [musicDuration - fadeOut, musicDuration], [0.15, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
            }
            return 0.15;
          }}
        />
      </Sequence>

      <TransitionSeries>
        {/* Scene 1: Readiness Gap - Three gaps problem framing */}
        <TransitionSeries.Sequence durationInFrames={TIMING_V2.scene1_readinessGap}>
          <Scene1_ReadinessGap />
        </TransitionSeries.Sequence>

        {/* Smooth fade to thesis */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 2: Thesis - "I Think" to "I Know" + Logo */}
        <TransitionSeries.Sequence durationInFrames={TIMING_V2.scene2_thesis}>
          <Scene2_Thesis />
        </TransitionSeries.Sequence>

        {/* Smooth fade to pillars */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({
            config: { damping: 200 },
            durationInFrames: transitionDuration,
          })}
        />

        {/* Scene 3: Three Pillars - Core value props */}
        <TransitionSeries.Sequence durationInFrames={TIMING_V2.scene3_pillars}>
          <Scene3_Pillars />
        </TransitionSeries.Sequence>

        {/* Fade to State of the Art */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene A: Advancing the State of the Art - TSM element 3 (rubric 35%) */}
        <TransitionSeries.Sequence durationInFrames={TIMING_V2.sceneA_stateOfArt}>
          <SceneA_StateOfArt />
        </TransitionSeries.Sequence>

        {/* Fade to Business Model */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene B: Business Model - TSM element 4 (rubric 10%) */}
        <TransitionSeries.Sequence durationInFrames={TIMING_V2.sceneB_businessModel}>
          <SceneB_BusinessModel />
        </TransitionSeries.Sequence>

        {/* Fade to testimonial */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 4: Testimonial - Dual testimonials */}
        <TransitionSeries.Sequence durationInFrames={TIMING_V2.scene4_testimonial}>
          <Scene4_Testimonial />
        </TransitionSeries.Sequence>

        {/* Smooth fade to security */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 5: Security - Trust signals */}
        <TransitionSeries.Sequence durationInFrames={TIMING_V2.scene5_security}>
          <Scene5_Security />
        </TransitionSeries.Sequence>

        {/* Final fade to CTA */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 6: Call to Action */}
        <TransitionSeries.Sequence durationInFrames={TIMING_V2.scene6_cta}>
          <Scene6_CTA />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </div>
  );
};
