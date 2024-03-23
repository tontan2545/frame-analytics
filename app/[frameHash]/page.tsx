"use client";

import React from "react";

import { Card } from "@tremor/react";
import { ArrowUp, Heart, MessageSquare, Repeat2 } from "lucide-react";

import { AreaChart } from "@tremor/react";

const chartdata = [
  {
    date: "Jan 22",
    SemiAnalysis: 2890,
  },
  {
    date: "Feb 22",
    SemiAnalysis: 2756,
  },
  {
    date: "Mar 22",
    SemiAnalysis: 3322,
  },
  {
    date: "Apr 22",
    SemiAnalysis: 3470,
  },
  {
    date: "May 22",
    SemiAnalysis: 3475,
  },
  {
    date: "Jun 22",
    SemiAnalysis: 3129,
  },
  {
    date: "Jul 22",
    SemiAnalysis: 3490,
  },
  {
    date: "Aug 22",
    SemiAnalysis: 2903,
  },
  {
    date: "Sep 22",
    SemiAnalysis: 2643,
  },
  {
    date: "Oct 22",
    SemiAnalysis: 2837,
  },
  {
    date: "Nov 22",
    SemiAnalysis: 2954,
  },
  {
    date: "Dec 22",
    SemiAnalysis: 3239,
  },
];

type Props = {
  params: {
    frameHash: string;
  };
};

const Page = ({ params: { frameHash } }: Props) => {
  return (
    <div className="px-40 py-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-5xl font-bold">Frame xyz</h1>
          <p className="text-secondary-foreground/60">{frameHash}</p>
        </div>
        <div className="flex gap-10">
          <Card>
            <div className="flex gap-2 items-center">
              <MessageSquare className="w-4 h-4" />
              <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                Total Replies
              </h4>
            </div>
            <div className="flex gap-2 items-center justify-center">
              <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong text-center">
                71,465
              </p>
              <div>
                <ArrowUp className="w-4 h-4 text-green-400" />
                <p className="text-xs text-green-400">+2</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex gap-2 items-center">
              <Heart className="w-4 h-4 text-red-300" />
              <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                Total Likes
              </h4>
            </div>
            <div className="flex gap-2 items-center justify-center">
              <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong text-center">
                71,465
              </p>
              <div>
                <ArrowUp className="w-4 h-4 text-green-400" />
                <p className="text-xs text-green-400">+10</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex gap-2 items-center">
              <Repeat2 className="w-4 h-4" />
              <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                Total Recast
              </h4>
            </div>
            <div className="flex gap-2 items-center justify-center">
              <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong text-center">
                71,465
              </p>
              <div className="flex flex-col items-center">
                <ArrowUp className="w-4 h-4 text-green-400" />
                <p className="text-xs text-green-400">+500</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className="space-y-10 px-10 py-14">
        <div className="space-y-2">
          <p className="text-tremor-metric">Likes</p>
          <AreaChart
            className="h-80"
            data={chartdata}
            index="date"
            categories={["SemiAnalysis"]}
            colors={["indigo"]}
            showLegend={false}
            showAnimation
            yAxisWidth={60}
            onValueChange={(v) => console.log(v)}
          />
        </div>
        <div className="space-y-2">
          <p className="text-tremor-metric">Replies</p>
          <AreaChart
            className="h-80"
            data={chartdata}
            index="date"
            categories={["SemiAnalysis"]}
            colors={["indigo"]}
            showLegend={false}
            showAnimation
            yAxisWidth={60}
            onValueChange={(v) => console.log(v)}
          />
        </div>
        <div className="space-y-2">
          <p className="text-tremor-metric">Recasts</p>
          <AreaChart
            className="h-80"
            data={chartdata}
            index="date"
            categories={["SemiAnalysis"]}
            colors={["indigo"]}
            showLegend={false}
            showAnimation
            yAxisWidth={60}
            onValueChange={(v) => console.log(v)}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
