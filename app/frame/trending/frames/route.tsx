/* eslint-disable react/jsx-key */
import { ClientProtocolId } from "frames.js";
import { createFrames, Button } from "frames.js/next";
import { getXmtpFrameMessage, isXmtpFrameActionPayload } from "frames.js/xmtp";
const totalPages = 5;

const frames = createFrames({
  basePath: "/frame/trending/frames",
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

  if (pageIndex === 0) {
    return {
      image: (
        <span>
          <div style={{ display: "flex", flexDirection: "column" }}>
            Discover Trending Frames
          </div>
        </span>
      ),
      buttons: [
        <Button action="post" target={{ query: { pageIndex: 1 } }}>
          Go
        </Button>,
      ],
      accepts: acceptedProtocols,
    };
  }

  // get data

  const imageUrl = `https://picsum.photos/seed/frames.js-${pageIndex}/300/200`;

  const buttons = [];

  buttons.push(
    <Button
      action="post"
      target={{
        query: { pageIndex: pageIndex === 1 ? 5 : pageIndex - 1 },
      }}
    >
      {"←  #" + (pageIndex === 1 ? "5" : (pageIndex - 1).toString())}
    </Button>
  );

  buttons.push(
    <Button
      action="post"
      target={{
        query: { pageIndex: pageIndex === totalPages ? 1 : pageIndex + 1 },
      }}
    >
      {"→  #" + (pageIndex === totalPages ? "1" : (pageIndex + 1).toString())}
    </Button>
  );

  buttons.push(
    <Button action="link" target={`https://ethglobal.com/events/frameworks`}>
      Try it out!
    </Button>
  );

  return {
    image: (
      <div tw="flex flex-col">
        <img width={300} height={200} src={imageUrl} alt="Image" />
        <div tw="flex">
          Top {pageIndex} / {totalPages}
        </div>
      </div>
    ),
    buttons: buttons,
    accepts: acceptedProtocols,
  };
}) as any);

export const POST = handleRequest;
export const GET = handleRequest;
