import React, { useEffect, useState } from "react";
import elementIsInView from "services/elementIsInView";
import styled from "styled-components";
import { Videos } from "types";
import NextImage from "next/image";

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
      {videos.map((video, index) => (
        <VideoContainer
          className="gallery-item"
          key={index}
          onMouseEnter={() => setPreview({ show: true, index: index })}
          onMouseLeave={() => setPreview({ show: false, index: index })}
        >
          <VideoDescription>
            <p>
              <Title>{video.title}</Title>
              {video.customer && ` | ${video.customer.name}`}
            </p>
          </VideoDescription>
          {preview.show && preview.index === index && (
            <VideoPreview autoPlay loop muted playsInline>
              {/* <source src={video.webm?.url} type="video/webm" />
                <source src={video.mp4?.url} type="video/mp4" /> */}
            </VideoPreview>
          )}
          <NextImage src={video.thumbnailUrl} layout="fill" objectFit="cover" />
        </VideoContainer>
      ))}
    </GridContainer>
  );
}

export default VideoGallery;

const GridContainer = styled.article`
  width: 100%;
  display: grid;
  grid-auto-rows: auto;
  grid-auto-flow: row;
  grid-row-gap: 6rem;
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
    font-size: 0.75rem;
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
  font-size: 0.9rem;
`;

const VideoContainer = styled.div`
  position: relative;
  min-height: 60vw;
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
