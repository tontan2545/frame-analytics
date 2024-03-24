import sql from "../lib/postgres";

export const getRecentFrames = async () => {
  const recentFrames: FrameRowWithStats[] = await sql`
  SELECT frames.*, stats.likes, stats.recasts, stats.replies FROM frames LEFT JOIN stats ON stats.hash = frames.hash WHERE frames IS NOT NULL ORDER BY frames.timestamp DESC LIMIT 20
  `;
  return recentFrames;
};
