import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { TIMING_V2 } from "../../config/themeV2";
import { Pillar1_Environment } from "./Pillar1_Environment";
import { Pillar2_Evaluator } from "./Pillar2_Evaluator";
import { Pillar3_Insights } from "./Pillar3_Insights";

const TRANSITION_DURATION = 15;

export const Scene4_Pillars: React.FC = () => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        {/* Pillar 1: AI Environment Generation */}
        <TransitionSeries.Sequence durationInFrames={TIMING_V2.pillar1_environment}>
          <Pillar1_Environment />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Pillar 2: AI Evaluator */}
        <TransitionSeries.Sequence durationInFrames={TIMING_V2.pillar2_evaluator}>
          <Pillar2_Evaluator />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Pillar 3: Reporting & Insights */}
        <TransitionSeries.Sequence durationInFrames={TIMING_V2.pillar3_insights}>
          <Pillar3_Insights />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};

export { Pillar1_Environment, Pillar2_Evaluator, Pillar3_Insights };
