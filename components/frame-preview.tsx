import React from "react";
import { Button } from "./ui/button";

type Props = {
  title: string;
  viewCount: number;
};

const FramePreview = ({ title, viewCount }: Props) => {
  return (
    <Button
      variant="ghost"
      className="relative block max-w-full h-full p-0 rounded-lg overflow-clip aspect-video"
    >
      <div className="h-full bg-secondary/60 w-full" />
      <div className="absolute right-2 top-2 rounded-sm bg-secondary text-secondary-foreground text-xs py-1 px-2 select-none">
        {viewCount}K views
      </div>
      <p className="absolute bottom-3 left-5 text-xl font-semibold">{title}</p>
    </Button>
  );
};

export default FramePreview;
