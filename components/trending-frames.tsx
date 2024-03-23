import { getTrendingFrames } from "@/server/data/trending";
import React from "react";
import FramePreview from "./frame-preview";
import { setTimeout } from "timers/promises";

type Props = {};

const TrendingFrames = async (props: Props) => {
  const trendingFrames = await getTrendingFrames();
  return trendingFrames.map((frame) => (
    <FramePreview
      key={frame.hash}
      title={frame.frames[0].title}
      hash={frame.hash}
      imgUrl={frame.frames[0].image}
    />
  ));
};

export default TrendingFrames;
