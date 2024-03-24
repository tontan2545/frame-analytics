import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="px-40 py-20">
      <div className="flex gap-10">
        <Skeleton className="size-[400px] rounded-md" />
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex gap-60">
              <Skeleton className="w-96 h-12 rounded-md" />
              <Skeleton className="w-52 h-12 rounded-md" />
            </div>
            <Skeleton className="w-60 h-10 rounded-md" />
          </div>
          <Skeleton className="w-[500px] h-[250px]" />
        </div>
      </div>
      <div className="flex gap-6 mt-14">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton
            key={`loading-skeleton-${i}`}
            className="w-full h-28 rounded-md"
          />
        ))}
      </div>
      <div className="space-y-14 mt-20">
        <Skeleton className="w-full h-96 rounded-md" />
        <Skeleton className="w-full h-96 rounded-md" />
        <Skeleton className="w-full h-96 rounded-md" />
      </div>
    </div>
  );
};

export default Loading;
