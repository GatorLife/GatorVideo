import React from "react";
import {
  TransitionSeries,
  linearTiming,
  springTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

import { Scene1_Hook } from "./scenes/Scene1_Hook";
import { Scene2_Problem } from "./scenes/Scene2_Problem";
import { Scene3_LogoReveal } from "./scenes/Scene3_LogoReveal";
import { Scene4_ProductDemo } from "./scenes/Scene4_ProductDemo";
import { Scene5_Resolution } from "./scenes/Scene5_Resolution";
import { Scene6_Testimonial } from "./scenes/Scene6_Testimonial";
import { Scene7_CTA } from "./scenes/Scene7_CTA";
import { TIMING, COLORS } from "./config/theme";

// Import fonts to ensure they're loaded
import "./config/fonts";

export const Video: React.FC = () => {
  const transitionDuration = TIMING.fadeTransition;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.black,
      }}
    >
      <TransitionSeries>
        {/* Scene 1: Hook - Matrix intro with typing */}
        <TransitionSeries.Sequence durationInFrames={TIMING.scene1_hook}>
          <Scene1_Hook />
        </TransitionSeries.Sequence>

        {/* Glitch-style transition (using fast fade for effect) */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TIMING.glitchTransition })}
        />

        {/* Scene 2: Problem - Cyber attack visualization */}
        <TransitionSeries.Sequence durationInFrames={TIMING.scene2_problem}>
          <Scene2_Problem />
        </TransitionSeries.Sequence>

        {/* Black screen pause between Scene 2 and Scene 3 */}
        <TransitionSeries.Sequence durationInFrames={30}>
          <div style={{ width: "100%", height: "100%", backgroundColor: COLORS.black }} />
        </TransitionSeries.Sequence>

        {/* Scene 3: Logo Reveal */}
        <TransitionSeries.Sequence durationInFrames={TIMING.scene3_logoReveal}>
          <Scene3_LogoReveal />
        </TransitionSeries.Sequence>

        {/* Smooth fade to product demo */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({
            config: { damping: 200 },
            durationInFrames: transitionDuration,
          })}
        />

        {/* Scene 4: Product Demo - Screenshots */}
        <TransitionSeries.Sequence durationInFrames={TIMING.scene4_productDemo}>
          <Scene4_ProductDemo />
        </TransitionSeries.Sequence>

        {/* Fade to resolution */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 5: Resolution - Red to Green */}
        <TransitionSeries.Sequence durationInFrames={TIMING.scene5_resolution}>
          <Scene5_Resolution />
        </TransitionSeries.Sequence>

        {/* Smooth fade to testimonial */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 6: Testimonial */}
        <TransitionSeries.Sequence durationInFrames={TIMING.scene6_testimonial}>
          <Scene6_Testimonial />
        </TransitionSeries.Sequence>

        {/* Final fade to CTA */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 7: Call to Action */}
        <TransitionSeries.Sequence durationInFrames={TIMING.scene7_cta}>
          <Scene7_CTA />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </div>
  );
};
