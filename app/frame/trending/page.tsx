import Link from "next/link";
import { currentURL, vercelURL } from "../utils";
import { createDebugUrl } from "../debug";
import type { Metadata } from "next";
import { fetchMetadata } from "frames.js/next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Trending Frames",
    description: "Discover these trending frames created by our community.",
    other: {
      ...(await fetchMetadata(
        new URL(
          "/frame/trending/frames",
          vercelURL() || "http://localhost:3000"
        )
      )),
    },
  };
}

export default async function Home() {
  const url = currentURL("/frame/trending/frames");

  return (
    <div className="p-2 flex flex-col gap-2">
      Trending frames
      <Link href={url.toString()} className="underline">
        {url.toString()}
      </Link>
    </div>
  );
}
