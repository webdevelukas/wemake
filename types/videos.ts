export type Video = {
  title: string;
  vimeoUrl: string;
  descriptionTitle?: string;
  description?: string;
  randomMargin?: number;
  customer?: {
    name: string;
  };
};

export type Videos = [Video];
