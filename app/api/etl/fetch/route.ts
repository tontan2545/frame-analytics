import sql from "@/server/lib/postgres";
import axios from "axios";
import { type NextRequest } from "next/server";
import _ from "lodash";
import neynarClient from "@/server/lib/neynar";

const WARPCAST_URL = "https://client.warpcast.com/v2/cast";

export async function GET(request: NextRequest) {
  if (
    request.headers.get("Authorization") !==
      `Bearer ${process.env.CRON_SECRET}` &&
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

  const casts = feed.casts
    .filter((c) => {
      return (
        !latestFrameTimestamp || new Date(c.timestamp) > latestFrameTimestamp
      );
    })
    .map((cast) => {
      return {
        hash: cast.hash, // string
        author: JSON.stringify(
          _.omit(cast.author, [
            "object",
            "custody_address",
            "verifications",
            "verified_addresses",
            "active_status",
            "viewer_context",
            "follower_count",
            "following_count",
          ])
        ), // JSON
        embeds: JSON.stringify(cast.embeds), // JSON
        frames: JSON.stringify(cast.frames), // JSON
        parent_hash: cast.parent_hash, // string | null
        timestamp: cast.timestamp, // string
        text: cast.text, // string
      };
    });

  const stats = await Promise.all(
    casts.map(async (cast) => {
      const response = await axios
        .get(`${WARPCAST_URL}?hash=${cast.hash}`)
        .then((res) => res.data.result?.cast);

      if (response?.error) {
        console.error("Error fetching reactions", response.error);
      }

      return {
        hash: cast.hash,
        timestamp: cast.timestamp,
        replies: response?.replies?.count || 0,
        recasts: response?.recasts?.count || 0,
        reactions: response?.reactions?.count || 0,
        watches: response?.watches?.count || 0,
        views: response?.viewCount || 0,
        quotes: response?.quoteCount || 0,
        combined_recasts: response?.combinedRecasts || 0,
      };
    })
  );

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
