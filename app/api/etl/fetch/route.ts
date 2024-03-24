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

  const latestFrameTimestamp: Date | null = await sql`
    SELECT timestamp FROM frames ORDER BY timestamp DESC LIMIT 1
  `.then((res) => res?.[0]?.timestamp);

  const feed = await neynarClient.fetchFramesOnlyFeed({
    limit: 100,
  });

  const filteredCasts = feed.casts.filter((c) => {
    return (
      !latestFrameTimestamp || new Date(c.timestamp) > latestFrameTimestamp
    );
  });
  const casts = filteredCasts.map((cast) => {
    return {
      hash: cast.hash, // string
      author: _.omit(cast.author, [
        "object",
        "custody_address",
        "verifications",
        "verified_addresses",
        "active_status",
        "viewer_context",
        "follower_count",
        "following_count",
      ]) as any, // JSON
      embeds: cast.embeds as any[], // JSON
      frames: cast.frames as any[], // JSON
      parent_hash: cast.parent_hash, // string | null
      timestamp: cast.timestamp, // string
      text: cast.text, // string
    };
  });

  const now = new Date().toISOString();

  const stats = filteredCasts.map((cast) => {
    return {
      hash: cast.hash,
      timestamp: now,
      replies: cast.replies.count || 0,
      recasts: cast.reactions.recasts.length || 0,
      likes: cast.reactions.likes.length || 0,
    };
  });

  await Promise.all([
    sql`
  INSERT INTO frames ${sql(casts)} ON CONFLICT DO NOTHING
  `.execute(),
    sql`
  INSERT INTO stats ${sql(stats)} ON CONFLICT DO NOTHING
  `.execute(),
  ]);

  return Response.json({
    message: `Inserted ${casts.length} frames`,
  });
}
