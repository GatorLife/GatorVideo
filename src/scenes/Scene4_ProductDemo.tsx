// Scene 4: Product Demo - 3 Animated Segments with UI Interactions
// Total Duration: 1740 frames (58 seconds at 30fps)
import React from 'react';
import { Sequence } from 'remotion';
import { Segment1_EnvironmentCreation } from './Scene4/segments/Segment1_EnvironmentCreation';
import { Segment2_UserEvaluations } from './Scene4/segments/Segment2_UserEvaluations';
import { Segment3_Insights } from './Scene4/segments/Segment3_Insights';
import { SEGMENT_1_DURATION, SEGMENT_2_DURATION, SEGMENT_3_DURATION } from './Scene4/config';

export const Scene4_ProductDemo: React.FC = () => {
  return (
    <>
      {/* Segment 1: AI Environment Creation (0-600 frames / 0-20 seconds) */}
      <Sequence from={0} durationInFrames={SEGMENT_1_DURATION}>
        <Segment1_EnvironmentCreation />
      </Sequence>

      {/* Segment 2: Student Evaluation Flow (600-1290 frames / 20-43 seconds) */}
      <Sequence from={SEGMENT_1_DURATION} durationInFrames={SEGMENT_2_DURATION}>
        <Segment2_UserEvaluations />
      </Sequence>

      {/* Segment 3: Admin Grading & AI Insights (1290-1740 frames / 43-58 seconds) */}
      <Sequence from={SEGMENT_1_DURATION + SEGMENT_2_DURATION} durationInFrames={SEGMENT_3_DURATION}>
        <Segment3_Insights />
      </Sequence>
    </>
  );
};
