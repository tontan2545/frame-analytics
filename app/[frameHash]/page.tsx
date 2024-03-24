// revalidate every hour
export const revalidate = 3600;

import React from "react";
import { Heart, MessageSquare, Repeat2 } from "lucide-react";

import { getHistoricalStats } from "@/server/data/historical";
import LineChart from "@/components/line-chart";
import { getFrameDataByHash } from "@/server/data/frame-data";
import AggregateCard from "@/components/aggregate-card";
import { cn, timeAgo } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  params: {
    frameHash: string;
  };
};

const Page = async ({ params: { frameHash } }: Props) => {
  const frameData = await getFrameDataByHash(frameHash);
  const historicalData = (await getHistoricalStats(frameHash)).map((data) => ({
    ...data,
    // prettify the data
    timestamp: new Date(data.timestamp).toLocaleTimeString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));

  const aggregatedData = historicalData.reduce(
    (acc, curr) => {
      acc.likes += curr.likes;
      acc.replies += curr.replies;
      acc.recasts += curr.recasts;
      return acc;
    },
    {
      likes: 0,
      replies: 0,
      recasts: 0,
    }
  );

  // const aggregatedDailyHistoricalDataMap = historicalData.reduce(
  //   (acc, curr) => {
  //     const date = new Date(curr.timestamp);
  //     const dateString = `${
  //       date.getMonth() + 1
  //     }/${date.getDate()}/${date.getFullYear()}`;
  //     if (acc[dateString]) {
  //       acc[dateString].likes += curr.likes;
  //       acc[dateString].replies += curr.replies;
  //       acc[dateString].recasts += curr.recasts;
  //     } else {
  //       acc[dateString] = {
  //         likes: curr.likes,
  //         replies: curr.replies,
  //         recasts: curr.recasts,
  //       };
  //     }
  //     return acc;
  //   },
  //   {} as Record<string, { likes: number; replies: number; recasts: number }>
  // );

  // const aggregatedDailyHistoricalData = Object.entries(
  //   aggregatedDailyHistoricalDataMap
  // ).map(([timestamp, data]) => ({
  //   timestamp,
  //   ...data,
  // }));

  // console.log(aggregatedDailyHistoricalData);

  const lastStatDiff = (() => {
    if (historicalData.length < 2)
      return {
        likes: 0,
        replies: 0,
        recasts: 0,
      };
    return {
      likes:
        historicalData[historicalData.length - 1].likes -
        historicalData[historicalData.length - 2].likes,
      replies:
        historicalData[historicalData.length - 1].replies -
        historicalData[historicalData.length - 2].replies,
      recasts:
        historicalData[historicalData.length - 1].recasts -
        historicalData[historicalData.length - 2].recasts,
    };
  })();

  return (
    <div className="px-40 py-20">
      <div className="absolute -z-50 top-0 left-0 w-1/2 h-1/2 bg-primary/20 blur-[256px] rounded-full -z-1" />
      <div className="absolute -z-50 top-0 left-1/2 w-1/2 h-1/2 bg-purple-500/20 blur-[256px] rounded-full -z-1" />
      <div className="flex gap-10">
        <div>
          <img
            src={frameData.frames[0].image}
            alt={frameHash}
            className={cn(
              "rounded-md",
              frameData.frames[0].image_aspect_ratio === "1:1"
                ? "w-[400px]"
                : "h-80"
            )}
            style={{
              aspectRatio: frameData.frames[0].image_aspect_ratio.replace(
                ":",
                "/"
              ),
            }}
          />
        </div>
        <div className="flex flex-1">
          <div className="space-y-4 w-full">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h1 className="text-5xl font-bold">
                  {frameData.frames[0].title}
                </h1>
                <Link
                  href={`https://warpcast.com/${
                    frameData.author.username
                  }/${frameData.hash.substring(0, 10)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="text-lg">
                    Visit frame
                  </Button>
                </Link>
              </div>
              <div className="flex gap-2 items-center">
                <img
                  src={frameData.author.pfp_url}
                  className="size-10 rounded-full"
                />
                <p className="text-xl font-medium">
                  {frameData.author.display_name}
                </p>
                <p className="text-muted-foreground text-xl">
                  @{frameData.author.username}
                </p>
                <p className="text-xl">({timeAgo(frameData.timestamp)})</p>
              </div>
            </div>
            <pre
              className="w-[800px] text-sm overflow-scroll bg-secondary/60 p-6 rounded-md backdrop-blur-md border-2 border-border"
              style={{
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                height: "auto",
                maxHeight:
                  frameData.frames[0].image_aspect_ratio === "1:1"
                    ? "calc(100%)"
                    : "calc(100% - 160px)",
              }}
            >
              {frameData.text}
            </pre>
          </div>
        </div>
      </div>
      <div className="flex gap-10 mt-14">
        <AggregateCard
          label="Total Likes"
          icon={<Heart className="w-4 h-4 text-red-300" />}
          value={aggregatedData.likes}
          diff={lastStatDiff.likes}
        />
        <AggregateCard
          label="Total Replies"
          icon={<MessageSquare className="w-4 h-4" />}
          value={aggregatedData.replies}
          diff={lastStatDiff.replies}
        />
        <AggregateCard
          label="Total Recast"
          icon={<Repeat2 className="w-4 h-4" />}
          value={aggregatedData.recasts}
          diff={lastStatDiff.recasts}
        />
      </div>
      <div className="space-y-10 px-10 py-14">
        <LineChart
          data={historicalData}
          index="timestamp"
          valueKey="likes"
          title="Likes"
        />
        <LineChart
          data={historicalData}
          index="timestamp"
          valueKey="replies"
          title="Replies"
        />
        <LineChart
          data={historicalData}
          index="timestamp"
          valueKey="recasts"
          title="Recasts"
        />
      </div>
    </div>
  );
};

export default Page;
