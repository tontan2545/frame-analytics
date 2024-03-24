import { getTrendingFrames } from "@/server/data/trending";
import React from "react";
import FramePreview from "./frame-preview";

type Props = {
  interval?: string;
};

const TrendingFrames = async ({ interval }: Props) => {
  const trendingFrames = await getTrendingFrames({
    trendingLimit: 9,
    intervalHour: interval ? parseInt(interval) : 72,
  });

  return trendingFrames.map((frame) => (
    <FramePreview
      key={frame.hash}
      hash={frame.hash}
      createdAt={frame.timestamp}
      imgUrl={frame.frames[0].image}
      profileImgUrl={frame.author.pfp_url}
      profileName={frame.author.display_name}
      title={frame.frames[0].title}
      totalLikes={frame.likes}
      totalReplies={frame.replies}
      totalRecasts={frame.recasts}
    />
  ));
};

export default TrendingFrames;
