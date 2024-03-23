import sql from "@/server/lib/postgres";
import { type NextRequest } from "next/server";
import _ from "lodash";
import neynarClient from "@/server/lib/neynar";

export async function GET(request: NextRequest) {
  if (
    request.headers.get("Authorization") !==
      `Bearer ${process.env.CRON_ORG_SECRET}` &&
    process.env.MODE !== "development"
  ) {
    return Response.json(
      {
        message: "Unauthorized xD",
      },
      {
        status: 401,
      }
    );
  }

  const allFrames: { hash: string }[] = await sql`
    SELECT hash FROM frames
  `;

  const now = new Date().toISOString();
  const updatedStats: {
    hash: string;
    timestamp: string;
    replies: number;
    recasts: number;
    likes: number;
  }[] = [];

  for (const frames of _.chunk(allFrames, 500)) {
    const casts = await neynarClient.fetchBulkCasts(frames.map((e) => e.hash));

    casts.result.casts.forEach((cast) => {
      updatedStats.push({
        hash: cast.hash,
        timestamp: now,
        replies: cast.replies.count || 0,
        recasts: cast.reactions.recasts.length || 0,
        likes: cast.reactions.likes.length || 0,
      });
    });
  }

  await sql`
    INSERT INTO stats ${sql(updatedStats)} ON CONFLICT DO NOTHING
  `.execute();

  return Response.json({
    message: `Inserted ${updatedStats.length} updates`,
  });
}
