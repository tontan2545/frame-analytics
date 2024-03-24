import { getRecentFrames } from "@/server/data/recent";
import React from "react";
import FramePreview from "./frame-preview";

const RecentFrames = async () => {
  const recentFrames = await getRecentFrames({
    limit: 9,
  });
  return recentFrames.map((frame) => (
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

export default RecentFrames;
