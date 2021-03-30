export type Video = {
  title: string;
  vimeoUrl: string;
  descriptionTitle?: string;
  description?: string;
  randomMargin?: number;
  customer?: {
    name: string;
  };
  thumbnailUrl: string;
  project?: {
    slug: string;
    callToAction: string;
  };
  callToAction?: string;
  hasPriority: boolean;
};

export type Videos = [Video];
