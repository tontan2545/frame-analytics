import { NeynarAPIClient } from "@neynar/nodejs-sdk";

if (!process.env.NEYNAR_API_KEY) {
  throw new Error("NEYNAR_API_KEY is not set");
}

const neynarClient = new NeynarAPIClient(process.env.NEYNAR_API_KEY);

export default neynarClient;
