import sql from "../lib/postgres";

export const searchFrames = async (query: string) => {
  const searchedFrames: FrameRowWithStats[] = await sql`SELECT DISTINCT f.*
  FROM frames f,
       LATERAL jsonb_array_elements(f.frames) AS frame
  WHERE frame->>'title' ILIKE '%' || CAST(${query} AS text) || '%'
  order by f.timestamp desc
  limit 10`;

  const response = [];

  for (const frame of searchedFrames) {
    const author: Author = frame.author;
    const embeds: Embed[] = frame.embeds;
    const frames: Frame[] = frame.frames;
    response.push({
      hash: frame.hash,
      frames: frames,
      author: author,
      embeds: embeds,
    });
  }
  return response;
};
