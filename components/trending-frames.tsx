"use client";

import React from "react";
import FramePreview from "./frame-preview";
import { useTrendingIntervalStore } from "@/client/stores/trending-interval-store";
import useSWR from "swr";
import { Skeleton } from "./ui/skeleton";

const TrendingFrames = () => {
  const { interval } = useTrendingIntervalStore();

  const {
    data: trendingFrames,
    error,
    isLoading,
  } = useSWR(["trendingFrames", interval], async () => {
    return (
      (await fetch(`/api/query/trending?hour=${interval}&limit=9`).then((res) =>
        res.json()
      )) as (Omit<FrameRowWithStatsResponse, "timestamp"> & {
        timestamp: string;
      })[]
    ).map((frame) => ({
      ...frame,
      timestamp: new Date(frame.timestamp),
    }));
  });

  if (isLoading)
    return Array.from({ length: 9 }).map((_, i) => (
      <Skeleton
        key={`trending-skeleton-${i}`}
        className="w-full h-60 rounded-md"
      />
    ));
  if (error) return <div>Error fetching trending frames</div>;
  if (!trendingFrames) return <div>No trending frames found</div>;

  console.log(trendingFrames);

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
