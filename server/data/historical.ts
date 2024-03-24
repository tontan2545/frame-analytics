import sql from "../lib/postgres";

export const getHistoricalStats = async (hash: string) => {
  const stats: StatRow[] = await sql`
    SELECT timestamp, likes, recasts, replies FROM stats WHERE hash = ${hash}
  `;

  return stats;
};
