import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { compressNumber, timeAgo } from "@/lib/utils";
import { Heart, MessageSquare, Share } from "lucide-react";

type Props = {
  title: string;
  hash: string;
  imgUrl: string;
  profileImgUrl: string;
  profileName: string;
  createdAt: Date;
  totalLikes: number;
  totalReplies: number;
  totalRecasts: number;
};

const FramePreview = ({
  title,
  hash,
  imgUrl,
  profileImgUrl,
  profileName,
  createdAt,
  totalLikes,
  totalRecasts,
  totalReplies,
}: Props) => {
  return (
    <Button
      variant="ghost"
      className="relative block max-w-full h-full p-0 rounded-lg overflow-clip aspect-video hover:bg-accent/40"
    >
      <Link href={`/${hash}`} className="w-max h-max" prefetch>
        <img
          src={imgUrl}
          alt={hash}
          className="relative -z-10 w-full h-full object-cover"
        />
        <div className="absolute top-1 right-3 flex gap-2 bg-secondary/50 backdrop-blur-lg p-1 rounded-sm">
          <div className="flex gap-1 items-center">
            <Heart className="size-3" />
            <p className="text-xs">{compressNumber(totalLikes)}</p>
          </div>
          <div className="flex gap-1 items-center">
            <MessageSquare className="size-3" />
            <p className="text-xs">{compressNumber(totalReplies)}</p>
          </div>
          <div className="flex gap-1 items-center">
            <Share className="size-3" />
            <p className="text-xs">{compressNumber(totalRecasts)}</p>
          </div>
        </div>
        <div className="absolute bottom-0 text-start px-5 py-3 bg-gradient-to-t from-black/80 via-black/50 to-transparent w-full space-y-2">
          <p className="text-xl font-semibold">{title}</p>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <img
                src={profileImgUrl}
                alt={profileName}
                className="w-5 h-5 rounded-full"
              />
              <p>{profileName}</p>
            </div>
            <p>{timeAgo(createdAt)}</p>
          </div>
        </div>
      </Link>
    </Button>
  );
};

export default FramePreview;
