import sql from "@/lib/postgres";
import { NeynarAPIClient } from "@neynar/nodejs-sdk";
import axios from "axios";
import { type NextRequest } from "next/server";

const WARPCAST_URL = "https://client.warpcast.com/v2/cast";
///v2/cast?hash=0x577bec62a9448a434a3d28613e31cf846234314d

export async function GET(request: NextRequest) {
  if (!process.env.NEYNAR_API_KEY) {
    throw new Error("NEYNAR_API_KEY is not set");
  }

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

  const neynarClient = new NeynarAPIClient(process.env.NEYNAR_API_KEY);

  const latestFrameTimestamp = await sql`
    SELECT timestamp FROM frames ORDER BY timestamp DESC LIMIT 1
  `.then((res) => new Date(res[0].timestamp));

  const feed = await neynarClient.fetchFramesOnlyFeed({
    limit: 100,
  });

  const casts = await Promise.all(
    feed.casts
      .filter((c) => {
        return new Date(c.timestamp) > latestFrameTimestamp;
      })
      .map(async (cast) => {
        const response = await axios
          .get(`${WARPCAST_URL}?hash=${cast.hash}`)
          .then((res) => res.data.result?.cast);

        return {
          hash: cast.hash, // string
          author: JSON.stringify(cast.author), // JSON
          embeds: JSON.stringify(cast.embeds), // JSON
          frames: JSON.stringify(cast.frames), // JSON
          parent_hash: cast.parent_hash, // string | null
          timestamp: cast.timestamp, // string
          text: cast.text, // string
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

  await sql`
  INSERT INTO frames ${sql(casts)} ON CONFLICT DO NOTHING
  `.execute();

  return Response.json({
    message: `Inserted ${casts.length} frames`,
  });
}
