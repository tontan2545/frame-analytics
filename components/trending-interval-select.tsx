"use client";

import React from "react";
import { Button } from "./ui/button";
import { useTrendingIntervalStore } from "@/client/stores/trending-interval-store";

const TrendingIntervalSelect = () => {
  const { interval, setTrendingInterval } = useTrendingIntervalStore();
  return (
    <div className="border-border p-1 rounded-full border-2 w-96 h-10 flex gap-1">
      <Button
        variant={interval === "72" ? "default" : "ghost"}
        className="h-full w-full px-4 rounded-full"
        onClick={() => setTrendingInterval("72")}
      >
        3 days
      </Button>

      <Button
        variant={interval === "24" ? "default" : "ghost"}
        className="h-full w-full px-4 rounded-full"
        onClick={() => setTrendingInterval("24")}
      >
        24 hours
      </Button>
      <Button
        variant={interval === "6" ? "default" : "ghost"}
        className="h-full w-full px-4 rounded-full"
        onClick={() => setTrendingInterval("6")}
      >
        6 hours
      </Button>
      <Button
        variant={interval === "1" ? "default" : "ghost"}
        className="h-full w-full px-4 rounded-full"
        onClick={() => setTrendingInterval("1")}
      >
        1 hour
      </Button>
    </div>
  );
};

export default TrendingIntervalSelect;
