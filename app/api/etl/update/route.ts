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

  const now = new Date().toISOString();
  const allFrames: { hash: string }[] = await sql`
    SELECT hash FROM frames ORDER BY timestamp DESC LIMIT 50000
  `;

  interface UpdatedStats {
    hash: string;
    timestamp: string;
    replies: number;
    recasts: number;
    likes: number;
  }

  let i = 0;
  const updated = await Promise.all(
    _.chunk(allFrames, 350).map(async (frames) => {
      const casts = await neynarClient.fetchBulkCasts(
        frames.map((e) => e.hash)
      );
      const updatedStats = casts.result.casts.map(
        (cast) =>
          ({
            hash: cast.hash,
            timestamp: now,
            replies: cast.replies.count || 0,
            recasts: cast.reactions.recasts.length || 0,
            likes: cast.reactions.likes.length || 0,
          } as UpdatedStats)
      );

      await sql`
      INSERT INTO stats ${sql(updatedStats)} ON CONFLICT DO NOTHING
      `.execute();

      return updatedStats.length;
    })
  );
  updated.forEach((e) => (i += e));

  return Response.json({
    message: `Inserted ${i}/${allFrames.length} updates in ${
      new Date().getTime() - new Date(now).getTime()
    }ms`,
  });
}
