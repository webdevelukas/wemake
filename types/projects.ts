import { Videos } from "./videos";

export type Project = {
  slug: string;
  headerImage: { url: string; alt: string };
  title: string;
  teaserTitle: string;
  teaser: string;
  customer: { name: string };
  teaserImages: [{ url: string; alt: string }];
  vimeoVideos: Videos;
  callToAction: string;
};

export type Projects = [Project];
