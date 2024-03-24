import { Button } from "frames.js/next";
import { frames, randomFactToday } from "../frames";
import { currentURL } from "../../utils";
// const randomColor = require('node-random-color');

const handleRequest = frames((async (ctx: any) => {
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
      <Button action="post" key="1" target="/next-frame?hour=1&pageIndex=1">
        1 h
      </Button>,
      <Button action="post" key="2" target="/next-frame?hour=6&pageIndex=1">
        6 h
      </Button>,
      <Button action="post" key="3" target="/next-frame?hour=24&pageIndex=1">
        24 h
      </Button>,
      <Button action="link" key="4 " target={currentURL("/").toString()}>
        View site
      </Button>,
    ],
  };
}) as any);

export const GET = handleRequest;
export const POST = handleRequest;
