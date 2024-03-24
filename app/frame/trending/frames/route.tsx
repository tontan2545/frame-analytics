/* eslint-disable react/jsx-key */
import { ClientProtocolId } from "frames.js";
import { createFrames, Button } from "frames.js/next";
import { getXmtpFrameMessage, isXmtpFrameActionPayload } from "frames.js/xmtp";
import { currentURL } from "../../utils";
import { openframes } from "frames.js/middleware";
const totalPages = 5;

const frames = createFrames({
  basePath: "/frame/trending/frames",
  middleware: [
    openframes({
      clientProtocol: {
        id: "xmtp",
        version: "2024-02-09",
      },
      handler: {
        isValidPayload: (body: JSON) => isXmtpFrameActionPayload(body),
        getFrameMessage: async (body: JSON) => {
          if (!isXmtpFrameActionPayload(body)) {
            return undefined;
          }
          const result = await getXmtpFrameMessage(body);
          console.log("result: ", result);

          return { ...result };
        },
      },
    }),
  ],
});
const acceptedProtocols: ClientProtocolId[] = [
  {
    id: "xmtp",
    version: "vNext",
  },
  {
    id: "farcaster",
    version: "vNext",
  },
];

const handleRequest = frames((async (ctx: any) => {
  const pageIndex = Number(ctx.searchParams.pageIndex || 0);
  const hour = Number(ctx.searchParams.hour || 24);
  let queriedData: string | FrameRowWithStats[] =
    ctx.searchParams.queriedData || null;

  if (ctx.message) {
    console.log("XMTP Client");
    console.log(ctx.message);
    const { frameUrl, buttonIndex } = ctx.message;
  }
  if (pageIndex === 0) {
    return {
      image: (
        <span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center", // Centers content vertically in the container
              alignItems: "center", // Centers content horizontally in the container
              height: "100vh", // Takes up the full viewport height
              width: "100%",
              background: "linear-gradient(135deg, #f3fd28, #f97c00)", // Cool gradient background
              color: "white", // Text color
              fontSize: "48px", // Text size
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Text shadow for better readability
            }}
          >
            🔥 Discover Trending Frames ⚡️
          </div>
        </span>
      ),
      buttons: [
        <Button action="post" target={{ query: { pageIndex: 1, hour: 1 } }}>
          1 h
        </Button>,
        <Button action="post" target={{ query: { pageIndex: 1, hour: 6 } }}>
          6 h
        </Button>,
        <Button action="post" target={{ query: { pageIndex: 1, hour: 24 } }}>
          24 h
        </Button>,
        <Button action="link" target={currentURL("/").toString()}>
          View site
        </Button>,
      ],
      accepts: acceptedProtocols,
    };
  }

  // get data

  console.log("Querying...");
  const response = await fetch(
    currentURL(`/api/query/trending?hour=${hour ?? 24}`)
  );
  queriedData = (await response.json()) as FrameRowWithStatsResponse[];

  const imageUrl = queriedData[pageIndex - 1].frames[0].image;

  const buttons = [];
  buttons.push(
    <Button
      action="post"
      target={{
        query: {
          pageIndex: 0,
        },
      }}
    >
      {"🏠"}
    </Button>
  );
  buttons.push(
    <Button
      action="post"
      target={{
        query: {
          pageIndex: pageIndex === 1 ? 5 : pageIndex - 1,
          queriedData: queriedData.toString(),
          hour: hour,
        },
      }}
    >
      {"←  #" + (pageIndex === 1 ? "5" : (pageIndex - 1).toString())}
    </Button>
  );

  buttons.push(
    <Button
      action="post"
      target={{
        query: {
          pageIndex: pageIndex === totalPages ? 1 : pageIndex + 1,
          hour: hour,
        },
      }}
    >
      {"→  #" + (pageIndex === totalPages ? "1" : (pageIndex + 1).toString())}
    </Button>
  );

  buttons.push(
    <Button
      action="link"
      target={`https://warpcast.com/${
        queriedData[pageIndex - 1].author.username
      }/${queriedData[pageIndex - 1].hash.substring(0, 10)}`}
    >
      Explore 🖼️
    </Button>
  );

  return {
    image: (
      <div tw="flex flex-col justify-center items-center">
        <img src={imageUrl ?? ""} alt="Image" width="200" height="200" />
        <div tw="flex flex-col p-8 pt-4 justify-center items-center">
          <p>
            {queriedData[pageIndex - 1].text.substring(0, 20)}...
            {"  By @" + queriedData[pageIndex - 1].author.username}
          </p>
          {queriedData[pageIndex - 1].likes} likes{" "}
          {queriedData[pageIndex - 1].replies} replies{" "}
          {queriedData[pageIndex - 1].recasts} recasts
        </div>
      </div>
    ),
    buttons: buttons,
    headers: {
      // Max cache age in seconds
      "Cache-Control": "max-age=60",
    },
    accepts: acceptedProtocols,
  };
}) as any);

export const POST = handleRequest;
export const GET = handleRequest;
