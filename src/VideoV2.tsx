import React from "react";
import { Sequence, Audio, interpolate, staticFile } from "remotion";
import {
  TransitionSeries,
  linearTiming,
  springTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

import { Scene1_Hook } from "./scenesV2/Scene1_Hook";
import { Scene2_ReadinessGap } from "./scenesV2/Scene2_ReadinessGap";
import { Scene3_Thesis } from "./scenesV2/Scene3_Thesis";
import { Scene4_Pillars } from "./scenesV2/Scene4_Pillars";
import { Scene5_Testimonial } from "./scenesV2/Scene5_Testimonial";
import { Scene6_Security } from "./scenesV2/Scene6_Security";
import { Scene7_CTA } from "./scenesV2/Scene7_CTA";
import { TIMING_V2, COLORS } from "./config/themeV2";

// Import fonts to ensure they're loaded
import "./config/fonts";

export const VideoV2: React.FC = () => {
  const transitionDuration = TIMING_V2.fadeTransition;
  const glitchDuration = TIMING_V2.glitchTransition;
  const musicDuration = TIMING_V2.totalDuration - TIMING_V2.scene1_hook;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.black,
      }}
    >
      {/* Background soundtrack - starts after Scene 1 */}
      <Sequence from={TIMING_V2.scene1_hook} durationInFrames={musicDuration}>
        <Audio
          src={staticFile("GATOR_Soundtrack.wav")}
          volume={(f) => {
            const fadeIn = 30; // 1 second
            const fadeOut = 60; // 2 seconds

            if (f < fadeIn) {
              return interpolate(f, [0, fadeIn], [0, 0.15], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
            }
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
        {/* Scene 1: Hook - Matrix intro with NDAA reference */}
        <TransitionSeries.Sequence durationInFrames={TIMING_V2.scene1_hook}>
          <Scene1_Hook />
        </TransitionSeries.Sequence>

        {/* Glitch-style transition */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: glitchDuration })}
        />

        {/* Scene 2: Readiness Gap - Three gaps problem framing */}
        <TransitionSeries.Sequence durationInFrames={TIMING_V2.scene2_readinessGap}>
          <Scene2_ReadinessGap />
        </TransitionSeries.Sequence>

        {/* Smooth fade to thesis */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 3: Thesis - "I Think" to "I Know" + Logo */}
        <TransitionSeries.Sequence durationInFrames={TIMING_V2.scene3_thesis}>
          <Scene3_Thesis />
        </TransitionSeries.Sequence>

        {/* Smooth fade to pillars */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({
            config: { damping: 200 },
            durationInFrames: transitionDuration,
          })}
        />

        {/* Scene 4: Three Pillars - Core value props */}
        <TransitionSeries.Sequence durationInFrames={TIMING_V2.scene4_pillars}>
          <Scene4_Pillars />
        </TransitionSeries.Sequence>

        {/* Fade to testimonial */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 5: Testimonial - Dual testimonials */}
        <TransitionSeries.Sequence durationInFrames={TIMING_V2.scene5_testimonial}>
          <Scene5_Testimonial />
        </TransitionSeries.Sequence>

        {/* Smooth fade to security */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 6: Security - Trust signals */}
        <TransitionSeries.Sequence durationInFrames={TIMING_V2.scene6_security}>
          <Scene6_Security />
        </TransitionSeries.Sequence>

        {/* Final fade to CTA */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 7: Call to Action */}
        <TransitionSeries.Sequence durationInFrames={TIMING_V2.scene7_cta}>
          <Scene7_CTA />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </div>
  );
};
