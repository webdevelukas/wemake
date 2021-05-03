import { Project } from "./projects";

export type Video = {
  title: string;
  vimeoUrl: string;
  descriptionTitle?: string;
  description?: string;
  descriptionNew?: { html: string };
  randomMargin?: number;
  customer?: {
    name: string;
  };
  thumbnail: { url: string; alt: string };
  project?: Project;
  callToAction?: string;
  hasPriority: boolean;
  previewVideos: [{ url: string; mimeType: string }];
  vimeoVideoID: string;
  isVertical: boolean;
  aspectRatio: string;
};

export type Videos = [Video];
