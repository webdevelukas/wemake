import styled from "styled-components";
import NextImage from "next/image";

const video = {
  mp4: { url: "/placeholder.mp4" },
  webm: { url: "/placeholder.webm" },
};

const image = {
  url: "/placeholder_fallback-image.jpg",
  alt: "",
};

export default function Home() {
  return (
    <>
      <Video autoPlay loop muted playsInline>
        <source src={video.webm?.url} type="video/webm" />
        <source src={video.mp4?.url} type="video/mp4" />
        <NextImage
          src={image.url}
          alt={image.alt}
          layout="fill"
          quality={100}
        />
      </Video>
      <Span>Hey, we make.</Span>
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

const Span = styled.div`
  height: 600px;
`;
