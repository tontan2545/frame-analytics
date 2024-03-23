import sql from "@/server/lib/postgres";
import { type NextRequest } from "next/server";
import _ from "lodash";
import { getTrendingFrames } from "@/server/data/trending";

export async function GET(request: NextRequest) {
  // const response = await getTrendingFrames();
  const url = new URL(request.url);
  const hour = Number(url.searchParams.get("hour")) || 24;
  
  const trendingFrames = await getTrendingFrames(hour);

  return Response.json(trendingFrames);
}
