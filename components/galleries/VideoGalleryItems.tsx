import styled, { CSSProperties } from "styled-components";
import NextImage from "next/image";
import NextLink from "next/link";
import { Video, Videos } from "types";
import { useEffect } from "react";
import elementIsInView from "services/elementIsInView";
import useMediaQuery from "hooks/useMediaQuery";

interface VideoContainerProps extends CSSProperties {
  "--onTopOfGrain": string | 0 | undefined;
}

type VideoGallerItemsProps = {
  videos: Videos;
  preview: {
    show: boolean;
    index: number;
  };
  setPreview: (preview: { show: boolean; index: number }) => void;
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

function VideoGalleryItems({
  videos,
  preview,
  setPreview,
  setShowVideo,
}: VideoGallerItemsProps) {
  const [isDesktop] = useMediaQuery("(min-width: 992px)");

  useEffect(() => {
    const galleryItems = Array.from(
      document.getElementsByClassName("gallery-item")
    );

    function addClassOnElementInView() {
      galleryItems.forEach((galleryItem) => {
        if (elementIsInView(galleryItem)) {
          galleryItem.classList.add("is-or-was-visible");
        }
      });

      window.requestAnimationFrame(addClassOnElementInView);
    }

    addClassOnElementInView();
  }, []);

  function handleGalleryItemClick(video: Video) {
    setShowVideo({
      active: true,
      vimeoVideoID: video.vimeoVideoID,
      vimeoUrl: video.vimeoUrl,
      aspectRatio: video.aspectRatio,
      project: {
        slug: video.project?.slug,
        callToAction: video.project?.callToAction,
      },
    });
  }
  return (
    <GridContainer>
      {videos.map((video, index) => {
        const {
          title,
          customer,
          project,
          thumbnail,
          callToAction,
          previewVideos,
        } = video;
        const VideoContainerStyle: VideoContainerProps = {
          "--onTopOfGrain": `${
            preview.show && preview.index === index ? 15 : 0
          }`,
        };

        return (
          <VideoContainer
            className="gallery-item"
            key={index}
            style={VideoContainerStyle}
          >
            {isDesktop && preview.index === index && (
              <VideoOverlay
                onMouseLeave={() => setPreview({ show: false, index: -1 })}
              >
                <PlayVideoArea onClick={() => handleGalleryItemClick(video)} />
                {project && (
                  <NextLink href={`/projekte/${project?.slug}`} passHref>
                    <a>
                      <GoToProjectArea>
                        -{">"} {project.callToAction}
                      </GoToProjectArea>
                    </a>
                  </NextLink>
                )}
              </VideoOverlay>
            )}
            <VideoDescription>
              <p>
                <Title>{project?.homePageVideoTitle || title}</Title>
                {customer && ` | ${customer.name}`}
              </p>
            </VideoDescription>
            {isDesktop && preview.index === index && previewVideos && (
              <VideoPreview autoPlay loop muted playsInline>
                {previewVideos.map(({ url, mimeType }, index) => (
                  <source key={index} src={url} type={mimeType} />
                ))}
              </VideoPreview>
            )}
            <NextImage
              src={thumbnail.url}
              alt={thumbnail.alt}
              layout="fill"
              objectFit="cover"
              onClick={() => handleGalleryItemClick(video)}
              onMouseEnter={() => setPreview({ show: true, index: index })}
            />
            {callToAction && <SpecialText>{callToAction}</SpecialText>}
            {!isDesktop && project && (
              <NextLink href={`/projekte/${project?.slug}`} passHref>
                <GoToProjectLink hasCallToAction={Boolean(callToAction)}>
                  -{">"} {project.callToAction}
                </GoToProjectLink>
              </NextLink>
            )}
          </VideoContainer>
        );
      })}
    </GridContainer>
  );
}

export default VideoGalleryItems;

const GoToProjectLink = styled.a<{ hasCallToAction: boolean }>`
  position: absolute;
  bottom: ${({ hasCallToAction }) => (hasCallToAction ? "-3rem" : "-2.25rem")};
  right: -0.25rem;
`;

const SpecialText = styled.p`
  position: absolute;
  z-index: 25;
  font-family: var(--font-family-secondary);
  text-transform: uppercase;
  font-size: 2.25rem;
  font-style: italic;
  bottom: -1.25rem;
  left: 2%;
  hyphens: auto;
  line-break: normal;
  word-break: break-word;

  @media screen and (min-width: 992px) {
    bottom: -2rem;
    font-size: 2.5rem;
    line-height: 2.875rem;
  }
`;

const VideoOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  z-index: 20;
  cursor: pointer;
`;

const PlayVideoArea = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
`;

const GoToProjectArea = styled.div`
  background-color: var(--color-primary-transparent);
  display: flex;
  justify-content: center;
  padding: 1.5rem 1rem;
  font-size: 0.8rem;
  text-transform: uppercase;
`;

const GridContainer = styled.article`
  width: 90%;
  display: grid;
  grid-auto-rows: auto;
  grid-auto-flow: row;
  grid-row-gap: 6rem;
  margin: 6rem auto;

  @media screen and (min-width: 576px) {
    width: 90%;
  }

  @media screen and (min-width: 820px) {
    width: 60vmax;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: auto;
    grid-auto-flow: row;
    grid-gap: 5vmax;
    padding: 8rem 0;
  }
`;
const VideoPreview = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  z-index: 15;
`;
const VideoDescription = styled.div`
  position: absolute;
  text-align: center;
  z-index: 10;
  top: -2rem;
  width: 100%;

  p {
    display: -webkit-box;
    font-size: 0.75rem;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    line-clamp: 1;
  }

  @media screen and (min-width: 820px) {
    transform: rotate(-90deg) translate(-50%, -50%);
    transform-origin: bottom left;
    bottom: 50%;
    max-width: 20vmax;
    top: unset;
    width: unset;
  }
`;

const Title = styled.span`
  font-family: var(--font-family-secondary);
  font-style: italic;
  font-size: 1.2rem;
  text-transform: lowercase;
`;

const VideoContainer = styled.div`
  position: relative;
  min-height: 60vw;
  z-index: var(--onTopOfGrain, 0);

  &:not(:first-of-type) {
    transform: translateY(200px);

    &.is-or-was-visible {
      animation: slide-in 0.8s ease forwards;
    }
    &.is-or-was-visible:nth-child(odd) {
      animation-duration: 1s;
    }

    @keyframes slide-in {
      to {
        transform: translateY(0);
      }
    }
  }

  @media screen and (min-width: 820px) {
    min-height: 20vmax;

    :nth-of-type(10n + 1) {
      margin: 0 2rem 0 -2rem;
    }

    :nth-of-type(10n + 2) {
      grid-row: span 2;
      margin: -2rem -1rem 2rem 1rem;
    }

    :nth-of-type(10n + 4) {
      grid-column: span 2;
      min-height: 30vmax;
    }

    :nth-of-type(10n + 5) {
      margin: -1rem 2rem 1rem -2rem;
    }

    :nth-of-type(10n + 6) {
      margin: 0 -4rem 0 4rem;
    }

    :nth-of-type(10n + 7) {
      margin: -1rem 0 1rem 0;
    }

    :nth-of-type(10n + 8) {
      grid-row: span 2;
      margin: 0 -2rem 0 2rem;
    }

    :nth-of-type(10n + 9) {
      margin: 0 4rem 0 -4rem;
    }

    :nth-of-type(10n + 10) {
      grid-column: span 2;
      min-height: 30vmax;
    }
  }
`;
