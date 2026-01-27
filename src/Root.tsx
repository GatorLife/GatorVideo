import "./index.css";
import { Composition } from "remotion";
import { Video } from "./Video";
import { VideoV2 } from "./VideoV2";
import { TIMING, DIMENSIONS } from "./config/theme";
import { TIMING_V2 } from "./config/themeV2";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Original GatorPromo composition */}
      <Composition
        id="GatorPromo"
        component={Video}
        durationInFrames={TIMING.totalDuration}
        fps={TIMING.fps}
        width={DIMENSIONS.width}
        height={DIMENSIONS.height}
      />

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
