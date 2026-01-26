import "./index.css";
import { Composition } from "remotion";
import { Video } from "./Video";
import { TIMING, DIMENSIONS } from "./config/theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="GatorPromo"
        component={Video}
        durationInFrames={TIMING.totalDuration}
        fps={TIMING.fps}
        width={DIMENSIONS.width}
        height={DIMENSIONS.height}
      />
    </>
  );
};
