/* eslint-disable react/jsx-key */
import { farcasterHubContext, openframes } from "frames.js/middleware";
import { createFrames } from "frames.js/next";
import { getXmtpFrameMessage, isXmtpFrameActionPayload } from "frames.js/xmtp";
import { DEFAULT_DEBUGGER_HUB_URL } from "../debug";

export const FRAME_PATH = "/frame/trending2";

export const frames = createFrames({
  basePath: FRAME_PATH,
  initialState: {
    pageIndex: 0,
  },
  middleware: [
    farcasterHubContext({
      hubHttpUrl: DEFAULT_DEBUGGER_HUB_URL,
    }),
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

          return { ...result };
        },
      },
    }),
  ],
});

export interface Fact {
  text: string;
  id: string;
  source_url: string;
  source: string;
  permalink: string;
}

export const randomFact = async () => {
  const response = await fetch(
    "https://uselessfacts.jsph.pl/api/v2/facts/random"
  );
  const data = await response.json();
  return data as Fact;
};

export const randomFactToday = async () => {
  const response = await fetch(
    "https://uselessfacts.jsph.pl/api/v2/facts/today"
  );
  const data = await response.json();
  return data as Fact;
};
