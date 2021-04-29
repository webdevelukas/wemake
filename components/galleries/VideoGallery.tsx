import React, { useEffect, useState } from "react";
import { Videos } from "types";
import VideoGalleryItems from "./VideoGalleryItems";
import VideoGalleryOverlay from "./VideoGalleryOverlay";
import useScrollPosition from "hooks/useScrollPosition";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const [scrollPosition] = useScrollPosition();
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

  useEffect(() => {
    const body = document.body;

    if (typeof window !== "undefined" && showVideo.active) {
      body.style.position = "fixed";
      body.style.overflowY = "scroll";
      body.style.top = `-${scrollPosition}px`;
    }
    if (typeof window !== "undefined" && !showVideo.active) {
      const scrollY = body.style.top;
      body.style.position = "";
      body.style.top = "";

      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }

    router.events.on("beforeHistoryChange", () => {
      if (showVideo.active) {
        const scrollY = body.style.top;
        body.style.position = "";
        body.style.top = "";

        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    });

    return () => {
      router.events.off("beforeHistoryChange", () => {
        if (showVideo.active) {
          const scrollY = body.style.top;
          body.style.position = "";
          body.style.top = "";

          window.scrollTo(0, parseInt(scrollY || "0") * -1);
        }
      });
    };
  }, [showVideo.active]);

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
        preview={preview}
        setPreview={setPreview}
        showVideo={showVideo}
        setShowVideo={setShowVideo}
      />
    </>
  );
}

export default VideoGallery;
