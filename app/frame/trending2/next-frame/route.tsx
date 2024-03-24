import { Button } from "frames.js/next";
import { frames, randomFact } from "../frames";
import { currentURL } from "../../utils";

const totalPages = 5;

const handleRequest = frames((async (ctx: any) => {
  const pageIndex = Number(ctx.searchParams.pageIndex || 0);
  const hour = Number(ctx.searchParams.hour || 24);

  console.log("Querying...");
  const response = await fetch(
    currentURL(`/api/query/trending?hour=${hour ?? 24}`)
  );
  const queriedData = (await response.json()) as FrameRowWithStatsResponse[];
  const imageUrl = queriedData[pageIndex - 1].frames[0].image;
  const text = queriedData[pageIndex - 1].text;
  const authorUsername = queriedData[pageIndex - 1].author.username;
  const likes = queriedData[pageIndex - 1].likes;
  const replies = queriedData[pageIndex - 1].replies;
  const recasts = queriedData[pageIndex - 1].recasts;
  return {
    image: (
      <div tw="flex flex-col justify-center items-center">
        <img src={imageUrl ?? ""} alt="Image" width="200" height="200" />
        <div tw="flex flex-col p-8 pt-4 justify-center items-center">
          <p>
            {text.substring(0, 20)}...
            {"  By @" + authorUsername}
          </p>
          {likes} likes {replies} replies {recasts} recasts
        </div>
      </div>
    ),
    buttons: [
      //   <Button
      //     key="1"
      //     action="post"
      //     target={{
      //       pathname: "/next-fact",
      //       query: { pageIndex: pageIndex - 1 },
      //     }}
      //   >
      //     Next Fact
      //   </Button>,
      //   <Button action="post" key="2" target="/">
      //     Fact of the Day
      //   </Button>,
      <Button
        action="post"
        key="1"
        target={{
          pathname: "/frames",
        }}
      >
        {"🏠"}
      </Button>,
      <Button
        action="post"
        key="2"
        target={{
          pathname: "/next-frame",
          query: {
            pageIndex: pageIndex === 1 ? 5 : pageIndex - 1,
            hour: hour,
          },
        }}
      >
        {"←  #" + (pageIndex === 1 ? "5" : (pageIndex - 1).toString())}
      </Button>,
      <Button
        action="post"
        key="3"
        target={{
          pathname: "/next-frame",
          query: {
            pageIndex: pageIndex === totalPages ? 1 : pageIndex + 1,
            hour: hour,
          },
        }}
      >
        {"→  #" + (pageIndex === totalPages ? "1" : (pageIndex + 1).toString())}
      </Button>,
      <Button
        action="link"
        key="4"
        target={`https://warpcast.com/${
          queriedData[pageIndex - 1].author.username
        }/${queriedData[pageIndex - 1].hash.substring(0, 10)}`}
      >
        Explore 🖼️
      </Button>,
    ],
  };
}) as any);

export const GET = handleRequest;
export const POST = handleRequest;
