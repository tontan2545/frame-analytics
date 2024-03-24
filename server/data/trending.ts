import sql from "../lib/postgres";

type Props = {
  intervalHour?: number;
  trendingLimit?: number;
};

export const getTrendingFrames = async ({
  intervalHour = 24,
  trendingLimit = 5,
}: Props) => {
  const trendingFrames: FrameRowWithStats[] = await sql`
  SELECT DISTINCT ON (sub.hash) sub.hash, sub.author, sub.embeds, sub.frames, sub.timestamp, sub.text, sub.likes, sub.replies, sub.recasts
  FROM (
      SELECT frames.hash, frames.author, frames.embeds, frames.frames, frames.timestamp, frames.text, stats.likes, stats.replies, stats.recasts
      FROM frames
      JOIN stats ON frames.hash = stats.hash
      WHERE frames.timestamp > NOW() - INTERVAL '1 hour' * ${intervalHour}
      AND frames.frames IS NOT NULL
      ORDER BY stats.likes + stats.replies + stats.recasts DESC
      LIMIT ${trendingLimit * 20}
  ) AS sub
  ORDER BY sub.hash, sub.likes + sub.replies + sub.recasts DESC
  LIMIT ${trendingLimit}
  `;

  const response = [];
  for (const frame of trendingFrames) {
    const author: Author = frame.author;
    const embeds: Embed[] = frame.embeds;
    const frames: Frame[] = frame.frames;
    response.push({
      hash: frame.hash,
      author: author,
      embeds: embeds,
      frames: frames,
      parent_hash: frame.parent_hash,
      timestamp: frame.timestamp,
      text: frame.text,
      likes: frame.likes,
      replies: frame.replies,
      recasts: frame.recasts,
    });
  }

  return response;
};
