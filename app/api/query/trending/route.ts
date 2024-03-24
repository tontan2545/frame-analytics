export const maxDuration = 300;

import { type NextRequest } from "next/server";
import _ from "lodash";
import { getTrendingFrames } from "@/server/data/trending";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const hour = Number(url.searchParams.get("hour")) || 24;
  const limit = Number(url.searchParams.get("limit")) || 5;

  const trendingFrames = await getTrendingFrames({
    intervalHour: hour,
    trendingLimit: limit,
  });

  return Response.json(trendingFrames);
}
