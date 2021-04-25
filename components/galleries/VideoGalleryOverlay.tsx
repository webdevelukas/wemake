import { CSSTransition } from "react-transition-group";
import styled from "styled-components";

type VideoOverlayProps = {
  showVideo: { active: boolean; vimeoVideoID: string };
  setShowVideo: (showVideo: { active: boolean; vimeoVideoID: string }) => void;
};

function VideoGalleryOverlay({ showVideo, setShowVideo }: VideoOverlayProps) {
  return (
    <>
      <CSSTransition
        in={showVideo.active}
        timeout={200}
        classNames="vimeo-video-overlay"
      >
        <VimeoVideoOverlay>
          <CloseButton
            onClick={() => setShowVideo({ active: false, vimeoVideoID: "" })}
          >
            X Close
          </CloseButton>
          <CSSTransition
            in={showVideo.active}
            timeout={0}
            classNames="vimeo-video"
          >
            <Wrapper>
              <VimeoPlayer
                src={`https://player.vimeo.com/video/${showVideo.vimeoVideoID}?autoplay=1&dnt=1&byline=0&title=0&portrait=0`}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              ></VimeoPlayer>
            </Wrapper>
          </CSSTransition>
        </VimeoVideoOverlay>
      </CSSTransition>
    </>
  );
}

export default VideoGalleryOverlay;

const VimeoVideoOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 25;
  background: var(--color-primary-transparent);
  backdrop-filter: blur(2px);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  align-content: center;

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

const VimeoPlayer = styled.iframe`
  width: 100%;
  height: 100%;
`;

const CloseButton = styled.a`
  position: absolute;
  top: 6.5vw;
  right: 8vw;
  font-size: 1.6rem;

  @media screen and (min-width: 600px) {
    top: 2.6rem;
    right: 3rem;
  }
`;
const Wrapper = styled.div`
  width: 90%;
  height: 80%;
  margin: 0 auto;

  @media screen and (min-width: 768px) {
    width: 80%;
  }
`;
