import Player from "@vimeo/player";
import { useEffect } from "react";
import styled, { CSSProperties } from "styled-components";
import { Videos } from "types";

interface VideoTextSectionProps extends CSSProperties {
  "--negativeMargin": string | 0 | undefined;
  "--positiveMargin": string | 0 | undefined;
  "--size": string | 0 | undefined;
}

type VimeoGalleryProps = {
  videos: Videos;
};

function VimeoGallery({ videos }: VimeoGalleryProps) {
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
        (
          { title, description, descriptionTitle, hasPriority, randomMargin },
          index
        ) => {
          const style: VideoTextSectionProps = {
            "--negativeMargin": randomMargin && -randomMargin + "vw",
            "--positiveMargin": randomMargin && randomMargin + "vw",
            "--size": hasPriority ? "60%" : "50%",
          };

          return (
            <VideoTextSection
              key={index}
              withText={Boolean(description)}
              style={style}
            >
              <VideoContainer>
                <VideoDescription>
                  {index + 1} - {title}
                </VideoDescription>
                <div id={`video-${index}`} />
              </VideoContainer>
              {description && (
                <div>
                  <h3>{descriptionTitle}</h3>
                  <p>{description}</p>
                </div>
              )}
            </VideoTextSection>
          );
        }
      )}
    </Section>
  );
}

export default VimeoGallery;

const Section = styled.section`
  display: grid;
  grid-auto-rows: auto;
  grid-auto-flow: row;
  grid-row-gap: 4rem;
`;

const VideoTextSection = styled.section<{ withText: boolean }>`
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
      withText ? "var(--size, 50%) minmax(auto, 30%)" : "var(--size, 50%)"};
    grid-column-gap: 3rem;
    justify-content: center;
  }
`;

const VideoContainer = styled.div`
  position: relative;
`;

const VideoDescription = styled.div`
  position: absolute;
  text-align: center;
  z-index: 10;
  top: -2rem;
  width: 100%;
  font-family: var(--font-family-secondary);
  font-style: italic;
  font-size: 1.2rem;
  text-transform: lowercase;

  @media screen and (min-width: 820px) {
    transform: rotate(-90deg) translate(-50%, -50%);
    transform-origin: bottom left;
    bottom: 50%;
    max-width: 20vmax;
    top: unset;
    width: unset;
  }
`;
