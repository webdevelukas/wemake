import Player from "@vimeo/player";
import { useEffect } from "react";
import styled, { CSSProperties } from "styled-components";
import { Videos } from "types";

interface ImageTextSectionProps extends CSSProperties {
  "--negativeMargin": string | 0 | undefined;
  "--positiveMargin": string | 0 | undefined;
}

type VideoGalleryProps = {
  videos: Videos;
};

function VideoGallery({ videos }: VideoGalleryProps) {
  useEffect(() => {
    videos.map(({ vimeoUrl }, index) => {
      new Player(`video-${index}`, {
        url: vimeoUrl,
        dnt: true,
        responsive: true,
      });
    });
  });

  return (
    <Section>
      {videos.map(
        ({ title, description, descriptionTitle, randomMargin }, index) => {
          const style: ImageTextSectionProps = {
            "--negativeMargin": randomMargin && -randomMargin + "vw",
            "--positiveMargin": randomMargin && randomMargin + "vw",
          };

          return (
            <ImageTextSection
              key={index}
              withText={Boolean(description)}
              style={style}
            >
              <ImageContainer>
                <VideoDescription>
                  {index + 1} - {title}
                </VideoDescription>
                <div id={`video-${index}`} />
              </ImageContainer>
              {description && (
                <div>
                  <h3>{descriptionTitle}</h3>
                  <p>{description}</p>
                </div>
              )}
            </ImageTextSection>
          );
        }
      )}
    </Section>
  );
}

export default VideoGallery;

const Section = styled.section`
  display: grid;
  grid-auto-rows: auto;
  grid-auto-flow: row;
  grid-row-gap: 8rem;

  @media screen and (min-width: 820px) {
    grid-row-gap: 4rem;
  }
`;

const ImageTextSection = styled.section<{ withText: boolean }>`
  display: grid;
  grid-template-rows: ${({ withText }) => (withText ? "auto 1fr" : "auto")};

  :nth-of-type(odd) {
    margin: 0 var(--negativeMargin, 0) 0 var(--positiveMargin, 0);
  }

  :nth-of-type(even) {
    margin: 0 var(--positiveMargin, 0) 0 var(--negativeMargin, 0);
  }

  @media screen and (min-width: 820px) {
    grid-template-rows: unset;
    grid-template-columns: ${({ withText }) =>
      withText ? "2fr 1fr" : "80vmin"};
    grid-column-gap: 3rem;
    justify-content: center;
  }
`;

const ImageContainer = styled.div`
  position: relative;
`;

const VideoDescription = styled.div`
  position: absolute;
  text-align: center;
  z-index: 10;
  top: -2rem;
  width: 100%;

  p {
    font-size: 0.9rem;
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
