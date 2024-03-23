import sql from "@/server/lib/postgres";
import { type NextRequest } from "next/server";
import _ from "lodash";
import { getTrendingFrames } from "@/server/data/trending";

export async function GET(request: NextRequest) {
  const response = await getTrendingFrames();

  return Response.json(response);
}
