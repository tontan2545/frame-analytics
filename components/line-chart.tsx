"use client";

import { pick } from "lodash";
import { AreaChart } from "@tremor/react";
import React, { useMemo, useState } from "react";
import { Button } from "./ui/button";

type Props = {
  data: any[];
  index: string;
  valueKey: string;
  title: string;
};

const LineChart = ({ data, index, title, valueKey }: Props) => {
  const [toggle, setToggle] = useState<"CUMULATIVE" | "HOURLY">("HOURLY");
  const finalData = useMemo(() => {
    const dataCopy = [];
    if (toggle === "HOURLY") {
      for (let i = 1; i < data.length; i++) {
        dataCopy.push({
          ...pick(data[i], [valueKey, index]),
          [valueKey]: data[i][valueKey] - data[i - 1][valueKey],
        });
      }
      dataCopy.shift();
    }
    if (toggle === "CUMULATIVE") {
      for (let i = 0; i < data.length; i++) {
        dataCopy.push(pick(data[i], [valueKey, index]));
      }
    }
    return dataCopy;
  }, [toggle, data, valueKey]);
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <p className="text-tremor-metric">{title}</p>
        <div className="p-1 rounded-full border-2 border-border">
          <Button
            className="rounded-full"
            size="sm"
            variant={toggle === "HOURLY" ? "default" : "ghost"}
            onClick={() => setToggle("HOURLY")}
          >
            Hourly
          </Button>
          <Button
            className="rounded-full"
            size="sm"
            variant={toggle === "CUMULATIVE" ? "default" : "ghost"}
            onClick={() => setToggle("CUMULATIVE")}
          >
            Cumulative
          </Button>
        </div>
      </div>
      <AreaChart
        className="h-80"
        data={finalData}
        index={index}
        categories={[valueKey]}
        colors={["pink"]}
        showLegend={false}
        showAnimation
        yAxisWidth={60}
      />
    </div>
  );
};

export default LineChart;
