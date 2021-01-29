import styled from "styled-components";
import NextImage from "next/image";
import { useEffect, useState } from "react";
import elementIsInView from "services/elementIsInView";

const video = {
  mp4: { url: "/placeholder.mp4" },
  webm: { url: "/placeholder.webm" },
};

const fallbackImage = {
  url: "/placeholder_fallback-image.jpg",
  alt: "",
};

const placeholderImages = [
  { url: "/placeholder/01.jpg" },
  { url: "/placeholder/02.jpg" },
  { url: "/placeholder/03.jpg" },
  { url: "/placeholder/04.jpg" },
  { url: "/placeholder/05.jpg" },
  { url: "/placeholder/06.jpg" },
  { url: "/placeholder/07.jpg" },
  { url: "/placeholder/08.jpg" },
  { url: "/placeholder/09.jpg" },
  { url: "/placeholder/10.jpg" },
];

type PreviewProps = {
  show: boolean;
  index: number;
};

export default function Home() {
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
    <>
      <Video autoPlay loop muted playsInline>
        <source src={video.webm?.url} type="video/webm" />
        <source src={video.mp4?.url} type="video/mp4" />
        <NextImage
          src={fallbackImage.url}
          alt={fallbackImage.alt}
          layout="fill"
          quality={100}
        />
      </Video>
      <VideoGallery id="work">
        {placeholderImages.map((image, index) => (
          <Preview
            className="gallery-item"
            key={index}
            onMouseEnter={() => setPreview({ show: true, index: index })}
            onMouseLeave={() => setPreview({ show: false, index: index })}
          >
            <Wrapper>
              <p>
                <Title>Virtual Exhibition </Title> | Company
              </p>
            </Wrapper>
            {preview.show && preview.index === index && (
              <PreviewVideo autoPlay loop muted playsInline>
                <source src={video.webm?.url} type="video/webm" />
                <source src={video.mp4?.url} type="video/mp4" />
              </PreviewVideo>
            )}
            <NextImage src={image.url} layout="fill" objectFit="cover" />
          </Preview>
        ))}
      </VideoGallery>
    </>
  );
}

const Video = styled.video`
  width: 100%;
  height: 100vh;
  object-fit: cover;
  object-position: center center;
  z-index: 0;
`;

const PreviewVideo = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  z-index: 5;
`;

const VideoGallery = styled.article`
  width: 54vmax;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: auto;
  grid-auto-flow: row;
  grid-gap: 8vmax;
  margin: 2rem auto 0;
  padding: 8rem 0;
`;

const Wrapper = styled.div`
  position: absolute;
  max-width: 20vmax;
  transform: rotate(-90deg) translate(-50%, -50%);
  transform-origin: bottom left;
  text-align: center;
  bottom: 50%;
  font-size: 0.9rem;
  z-index: 10;
`;

const Title = styled.span`
  font-family: var(--font-family-secondary);
  font-style: italic;
`;

const Preview = styled.div`
  position: relative;
  min-height: 20vmax;

  &.is-or-was-visible {
    transform: translateY(200px);
    animation: slide-in 1.2s ease forwards;
  }
  &.is-or-was-visible:nth-child(odd) {
    animation-duration: 1s;
  }

  @keyframes slide-in {
    to {
      transform: translateY(0);
    }
  }

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
`;
