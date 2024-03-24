import axios from "axios";

export const getUsers = async (type: "top" | "latest", limit: number = 10) => {
  const AIRSTACK_API_URL = "https://api.airstack.xyz/graphql";
  const AIRSTACK_API_KEY = process.env.AIRSTACK_API_KEY;

  if (!AIRSTACK_API_KEY) {
    throw new Error("AIRSTACK_API_KEY is not set");
  }

  const query = `
  query MyQuery {
    Socials(
      input: {filter: {dappName: {_eq: farcaster}}, blockchain: ethereum, order: {${
        type === "top" ? "followerCount: DESC" : "updatedAt: DESC"
      }}, limit: ${Math.min(limit, 50)}}
    ) {
      Social {
        profileBio
        profileHandle
        profileDisplayName
        profileImage
        followingCount
        followerCount
      }
    }
  }
  `;

  const response = await axios.post(
    AIRSTACK_API_URL,
    {
      query,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: AIRSTACK_API_KEY,
      },
    }
  );

  return response.data.data;
};
