import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  hash: string;
  imgUrl: string;
};

const FramePreview = ({ title, hash, imgUrl }: Props) => {
  return (
    <Button
      variant="ghost"
      className="relative block max-w-full h-full p-0 rounded-lg overflow-clip aspect-video"
    >
      <Link href={`/${hash}`} className="w-max h-max">
        <img src={imgUrl} alt={hash} className="w-full h-full object-contain" />
        <p className="absolute bottom-0 text-start pl-5 py-3 text-xl font-semibold bg-gradient-to-t from-black/80 via-black/50 to-transparent w-full">
          {title}
        </p>
      </Link>
    </Button>
  );
};

export default FramePreview;
