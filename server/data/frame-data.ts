import sql from "../lib/postgres";

export const getFrameDataByHash = async (hash: string) => {
  const frameData: FrameRow[] = await sql`
        SELECT * FROM frames WHERE hash = ${hash}
    `;

  return frameData[0];
};
