import "./index.css";
import { Composition } from "remotion";
// import { Video } from "./Video"; // Archived with GatorPromo V1
import { VideoV2 } from "./VideoV2";
// import { TIMING } from "./config/theme"; // Archived with GatorPromo V1
import { DIMENSIONS } from "./config/theme";
import { TIMING_V2, TSM_MAX_FRAMES } from "./config/themeV2";

// TSM Announcement Section VII.d.i caps submissions at 5:00. Fail the build
// rather than the submission.
if (TIMING_V2.totalDuration > TSM_MAX_FRAMES) {
  throw new Error(
    `GatorPromoV2 is ${TIMING_V2.totalDuration} frames, over the TSM 5:00 limit of ${TSM_MAX_FRAMES}.`
  );
}

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Archived GatorPromo V1 composition
      <Composition
        id="GatorPromo"
        component={Video}
        durationInFrames={TIMING.totalDuration}
        fps={TIMING.fps}
        width={DIMENSIONS.width}
        height={DIMENSIONS.height}
      />
      */}

      {/* GatorPromoV2 - Updated with pitch deck messaging */}
      <Composition
        id="GatorPromoV2"
        component={VideoV2}
        durationInFrames={TIMING_V2.totalDuration}
        fps={TIMING_V2.fps}
        width={DIMENSIONS.width}
        height={DIMENSIONS.height}
      />
    </>
  );
};
