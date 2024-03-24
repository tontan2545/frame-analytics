export interface Frame {
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
