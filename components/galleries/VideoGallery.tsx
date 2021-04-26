import React, { useState } from "react";
import { Videos } from "types";
import useMediaQuery from "hooks/useMediaQuery";
import VideoGalleryItems from "./VideoGalleryItems";
import VideoGalleryOverlay from "./VideoGalleryOverlay";

type PreviewProps = {
  show: boolean;
  index: number;
};

type ShowVideoProps = {
  active: boolean;
  vimeoVideoID: string;
  vimeoUrl?: string;
  aspectRatio: string;
  project: { slug: string | undefined; callToAction: string | undefined };
};

type VideoGalleryProps = {
  videos: Videos;
};

function VideoGallery({ videos }: VideoGalleryProps) {
  const [isDesktop] = useMediaQuery("(min-width: 820px)");
  const [preview, setPreview] = useState<PreviewProps>({
    show: false,
    index: -1,
  });
  const [showVideo, setShowVideo] = useState<ShowVideoProps>({
    active: false,
    vimeoVideoID: "",
    vimeoUrl: "",
    aspectRatio: "",
    project: { slug: "", callToAction: "" },
  });

  return (
    <>
      {showVideo.active && (
        <VideoGalleryOverlay
          showVideo={showVideo}
          setShowVideo={setShowVideo}
        />
      )}
      <VideoGalleryItems
        videos={videos}
        isDesktop={isDesktop}
        preview={preview}
        setPreview={setPreview}
        showVideo={showVideo}
        setShowVideo={setShowVideo}
      />
    </>
  );
}

export default VideoGallery;
