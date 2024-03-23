interface Author {
  fid: number;
  username: string;
  display_name: string;
  pfp_url: string;
  profile: {
    bio: {
      text: string;
      mentioned_profiles: any[]; // Use a more specific type if possible
    };
  };
}

interface Embed {
  url: string;
}

interface Frame {
  version: string;
  title: string;
  image: string;
  image_aspect_ratio: string;
  buttons: any[];
  input: any; // Use a more specific type if possible
  state: any; // Use a more specific type if possible
  post_url: string;
  frames_url: string;
}

interface Button {
  index: number;
  title: string;
  action_type: string;
}

interface FrameRow {
  hash: string;
  author: string; // JSON string, needs to be parsed to `Author`
  embeds: string; // JSON string, needs to be parsed to `Embed[]`
  frames: string; // JSON string, needs to be parsed to `Frame[]`
  parent_hash: string | null; // Assuming it can be null
  timestamp: Date;
  text: string;
}
interface FrameRowWithStats extends FrameRow {
  likes: number;
  recasts: number;
  replies: number;
}