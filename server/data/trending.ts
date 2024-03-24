import sql from "../lib/postgres";

type Props = {
  intervalHour?: number;
  trendingLimit?: number;
};

export const getTrendingFrames = async ({
  intervalHour = 24,
  trendingLimit = 5,
}: Props) => {
  const trendingFrames = await sql`
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
    	frames IS NOT NULL AND frames.timestamp > NOW() - INTERVAL '1 hour' * ${intervalHour}
    ORDER BY
    	COALESCE(s.likes + s.recasts + s.replies, 0)
    	DESC
    LIMIT ${trendingLimit}
  `;

  return trendingFrames;
};
