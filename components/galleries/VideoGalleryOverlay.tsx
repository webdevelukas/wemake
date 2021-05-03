import styled, { CSSProperties } from "styled-components";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import Player from "@vimeo/player";
import { CSSTransition } from "react-transition-group";

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
  const [isLoading, setIsLoading] = useState(false);
  const videoStyle: VideoTextSectionProps = {
    "--maxVideoWidth": getMaxVideoWidth(showVideo.aspectRatio),
  };

  useEffect(() => {
    const player = new Player(`video`, {
      url: showVideo.vimeoUrl,
      dnt: true,
      responsive: true,
      byline: false,
      title: false,
      portrait: false,
      autoplay: true,
      playsinline: false,
    });

    setIsLoading(true);
    player.ready().then(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <VimeoVideoOverlay>
      <CSSTransition
        in={showVideo.active && !isLoading}
        timeout={1000}
        classNames="video"
      >
        <Wrapper style={videoStyle}>
          {!isLoading && (
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
          )}
          <div id={`video`} />
          {!isLoading && showVideo.project.slug && (
            <NextLink href={`/projekte/${showVideo.project?.slug}`} passHref>
              <GoToProjectLink>
                -{">"} {showVideo.project.callToAction}
              </GoToProjectLink>
            </NextLink>
          )}
        </Wrapper>
      </CSSTransition>
      <CloseOverlayArea
        onClick={() =>
          setShowVideo({
            active: false,
            vimeoVideoID: "",
            vimeoUrl: "",
            aspectRatio: "",
            project: { slug: "", callToAction: "" },
          })
        }
      />
    </VimeoVideoOverlay>
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

const CloseOverlayArea = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 26;
`;

const GoToProjectLink = styled.a`
  position: absolute;
  text-align: center;
  font-size: 1rem;
  line-height: 1rem;
  left: 50%;
  transform: translate(-50%, 1rem);
  transform-origin: top;
  width: 100%;

  @media screen and (min-width: 768px) {
    font-size: 1.6rem;
    line-height: 1.6rem;
  }
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
`;

const CloseButton = styled.a`
  position: absolute;
  top: -2.5rem;
  right: -2vmin;
  font-size: 1rem;

  @media screen and (min-width: 768px) {
    top: -3rem;
    font-size: 1.6rem;
  }
`;
const Wrapper = styled.div`
  position: relative;
  width: var(--maxVideoWidth, 80vmin);
  height: auto;
  z-index: 27;

  &.video-enter {
    opacity: 0;
  }
  &.video-enter-active {
    opacity: 1;
    transition: opacity 1000ms;
  }
  &.video-exit {
    opacity: 1;
    transition: opacity 500ms;
  }
  &.video-exit-active {
    opacity: 0;
  }
`;
