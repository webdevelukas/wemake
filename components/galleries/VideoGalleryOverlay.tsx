import { CSSTransition } from "react-transition-group";
import styled, { CSSProperties } from "styled-components";
import NextLink from "next/link";
import { useEffect } from "react";
import Player from "@vimeo/player";

interface VideoTextSectionProps extends CSSProperties {
  "--maxVideoWidth": string | 0 | undefined;
}

type VideoOverlayProps = {
  showVideo: {
    active: boolean;
    vimeoVideoID: string;
    vimeoUrl?: string;
    aspectRatio: string;
    project: { slug: string | undefined; callToAction: string | undefined };
  };
  setShowVideo: (showVideo: {
    active: boolean;
    vimeoVideoID: string;
    vimeoUrl?: string;
    aspectRatio: string;
    project: { slug: string | undefined; callToAction: string | undefined };
  }) => void;
};

function VideoGalleryOverlay({ showVideo, setShowVideo }: VideoOverlayProps) {
  const videoStyle: VideoTextSectionProps = {
    "--maxVideoWidth": getMaxVideoWidth(showVideo.aspectRatio),
  };

  useEffect(() => {
    new Player(`video`, {
      url: showVideo.vimeoUrl,
      dnt: true,
      responsive: true,
      byline: false,
      title: false,
      portrait: false,
      autoplay: true,
    });
  });
  return (
    <>
      <CSSTransition
        in={showVideo.active}
        timeout={200}
        classNames="vimeo-video-overlay"
      >
        <VimeoVideoOverlay>
          <CSSTransition
            in={showVideo.active}
            timeout={0}
            classNames="vimeo-video"
          >
            <Wrapper style={videoStyle}>
              <CloseButton
                onClick={() =>
                  setShowVideo({
                    active: false,
                    vimeoVideoID: "",
                    vimeoUrl: "",
                    aspectRatio: "",
                    project: { slug: "", callToAction: "" },
                  })
                }
              >
                X Close
              </CloseButton>
              <div id={`video`} />
              {showVideo.project.slug && (
                <NextLink
                  href={`/projekte/${showVideo.project?.slug}`}
                  passHref
                >
                  <GoToProjectLink>
                    -{">"} {showVideo.project.callToAction}
                  </GoToProjectLink>
                </NextLink>
              )}
            </Wrapper>
          </CSSTransition>
        </VimeoVideoOverlay>
      </CSSTransition>
    </>
  );
}

export default VideoGalleryOverlay;

function getMaxVideoWidth(aspectRatio: string) {
  switch (aspectRatio) {
    case "horizontal":
      return "90vmin";
    case "vertical":
      return "30vmin";
    case "square":
      return "80vmin";
  }
}

const GoToProjectLink = styled.a`
  position: absolute;
  text-align: center;
  font-size: 1.6rem;
  line-height: 1.6rem;
  left: 50%;
  transform: translate(-50%, 1rem);
  transform-origin: top;
  width: 100%;
`;

const VimeoVideoOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  z-index: 25;
  background: var(--color-primary-transparent);
  backdrop-filter: blur(2px);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;

  .vimeo-video-container-enter & .vimeo-video-enter {
    opacity: 0;
  }
  .vimeo-video-container-enter-active & .vimeo-video-enter-active {
    opacity: 1;
    transition: opacity 400ms;
  }
  .vimeo-video-container-exit & .vimeo-video-exit {
    opacity: 1;
  }
  .vimeo-video-container-exit-active & .vimeo-video-exit-active {
    opacity: 0;
    transition: opacity 400ms;
  }
`;

const CloseButton = styled.a`
  position: absolute;
  top: -2.5rem;
  right: -2vmin;
  font-size: 1.6rem;

  @media screen and (min-width: 768px) {
    top: -3rem;
  }
`;
const Wrapper = styled.div`
  position: relative;
  width: var(--maxVideoWidth, 80vmin);
  height: auto;
`;
