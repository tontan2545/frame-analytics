import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

type Props = {
  interval?: string;
};

const TrendingIntervalSelect = ({ interval }: Props) => {
  return (
    <div className="border-border p-1 rounded-full border-2 w-96 h-10 flex gap-1">
      <Link href="/" className="h-full w-full">
        <Button
          variant={!interval || interval === "72" ? "default" : "ghost"}
          className="h-full w-full px-4 rounded-full"
        >
          3 days
        </Button>
      </Link>
      <Link href="/?interval=24" className="h-full w-full">
        <Button
          variant={interval === "24" ? "default" : "ghost"}
          className="h-full w-full px-4 rounded-full"
        >
          24 hours
        </Button>
      </Link>
      <Link href="/?interval=6" className="h-full w-full">
        <Button
          variant={interval === "6" ? "default" : "ghost"}
          className="h-full w-full px-4 rounded-full"
        >
          6 hours
        </Button>
      </Link>
      <Link href="/?interval=1" className="h-full w-full">
        <Button
          variant={interval === "1" ? "default" : "ghost"}
          className="h-full w-full px-4 rounded-full"
        >
          1 hour
        </Button>
      </Link>
    </div>
  );
};

export default TrendingIntervalSelect;
