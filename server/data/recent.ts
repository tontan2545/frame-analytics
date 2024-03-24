import sql from "../lib/postgres";

export const getRecentFrames = async ({ limit = 10 }: { limit?: number }) => {
  const recentFrames: FrameRowWithStats[] = await sql`
      SELECT
    	frames.*,
    	s.likes,
    	s.recasts,
    	s.replies
    FROM
    	frames
    	LEFT JOIN (
    		SELECT
    			ROW_NUMBER() OVER (PARTITION BY HASH ORDER BY timestamp DESC) AS rn,
    			*
    		FROM
    			stats) s ON s.hash = frames.hash
    		AND rn = 1
    WHERE
    	frames IS NOT NULL
    ORDER BY
        frames.timestamp DESC
    LIMIT ${limit}
  `;
  return recentFrames;
};
