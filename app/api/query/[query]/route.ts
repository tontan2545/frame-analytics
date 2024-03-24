import { searchFrames } from "@/server/data/search";
import { NextRequest } from "next/server";

export const GET = async (
  request: NextRequest,
  { params: { query } }: { params: { query: string } }
) => {
  const result = await searchFrames(decodeURI(query));
  return Response.json(result);
};
