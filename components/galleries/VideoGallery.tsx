import React, { useEffect, useState } from "react";
import elementIsInView from "services/elementIsInView";
import styled from "styled-components";
import { Videos } from "types";
import NextImage from "next/image";
import NextLink from "next/link";

const placeholderVideo = {
  webm: { url: "/placeholder.webm" },
  mp4: { url: "/placeholder.mp4" },
};

type PreviewProps = {
  show: boolean;
  index: number;
};

type VideoGalleryProps = {
  videos: Videos;
};

function VideoGallery({ videos }: VideoGalleryProps) {
  const [preview, setPreview] = useState<PreviewProps>({
    show: false,
    index: -1,
  });

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
  });

  return (
    <GridContainer>
      {videos.map((video, index) => {
        const { title, customer, project, thumbnailUrl, callToAction } = video;

        return (
          <VideoContainer
            className="gallery-item"
            key={index}
            onMouseEnter={() => setPreview({ show: true, index: index })}
            onMouseLeave={() => setPreview({ show: false, index: index })}
          >
            {preview.show && preview.index === index && (
              <VideoOverlay withCallToAction={Boolean(callToAction)}>
                <PlayVideoArea onClick={() => console.log("Play Video")}>
                  <PlayButton src="/play-button.svg" />
                </PlayVideoArea>
                <NextLink href={`/projekte/${project?.slug}`} passHref>
                  <a>
                    <GoToProjectArea>
                      -{">"} {project?.callToAction}
                    </GoToProjectArea>
                  </a>
                </NextLink>
              </VideoOverlay>
            )}
            <VideoDescription>
              <p>
                <Title>{title}</Title>
                {customer && ` | ${customer.name}`}
              </p>
            </VideoDescription>
            {preview.show && preview.index === index && (
              <VideoPreview autoPlay loop muted playsInline>
                <source src={placeholderVideo.webm?.url} type="video/webm" />
                <source src={placeholderVideo.mp4?.url} type="video/mp4" />
              </VideoPreview>
            )}
            <NextImage src={thumbnailUrl} layout="fill" objectFit="cover" />
            {callToAction && <SpecialText>{callToAction}</SpecialText>}
          </VideoContainer>
        );
      })}
    </GridContainer>
  );
}

export default VideoGallery;

const SpecialText = styled.p`
  position: absolute;
  z-index: 10;
  font-family: var(--font-family-secondary);
  text-transform: uppercase;
  font-size: 2.5rem;
  line-height: 2.875rem;
  font-style: italic;
  bottom: -2rem;
  left: 2%;
`;

const PlayButton = styled.img`
  width: 30px;
`;

const VideoOverlay = styled.div<{ withCallToAction: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: ${({ withCallToAction }) =>
    withCallToAction ? "column-reverse" : "column"};
  z-index: 10;
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
  padding: 1rem;
  font-size: 0.8rem;
  text-transform: uppercase;
`;

const GridContainer = styled.article`
  width: 90%;
  display: grid;
  grid-auto-rows: auto;
  grid-auto-flow: row;
  grid-row-gap: 5rem;
  margin: 8rem auto;

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
  z-index: 5;
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
  transform: translateY(200px);
  cursor: pointer;

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

  @media screen and (min-width: 820px) {
    min-height: 20vmax;

    :nth-of-type(1) {
      margin: 0 2rem 0 -2rem;
    }

    :nth-of-type(2) {
      grid-row: span 2;
      margin: -4rem -1rem 4rem 1rem;
    }

    :nth-of-type(3) {
    }

    :nth-of-type(4) {
      grid-column: span 2;
      min-height: 30vmax;
    }

    :nth-of-type(5) {
      margin: -1rem 2rem 1rem -2rem;
    }

    :nth-of-type(6) {
      margin: 0 -4rem 0 4rem;
    }

    :nth-of-type(7) {
      margin: -1rem 0 1rem 0;
    }

    :nth-of-type(8) {
      grid-row: span 2;
      margin: 0 -2rem 0 2rem;
    }

    :nth-of-type(9) {
      margin: 0 4rem 0 -4rem;
    }

    :nth-of-type(10) {
      grid-column: span 2;
      min-height: 30vmax;
    }
  }
`;
