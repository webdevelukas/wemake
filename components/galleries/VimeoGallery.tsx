import Player from "@vimeo/player";
import { useEffect, useState } from "react";
import sanitizeHTML from "services/sanitizeHTML";
import styled, { CSSProperties } from "styled-components";
import { Videos } from "types";
import NextImage from "next/image";
import PlayButton from "elements/PlayButton";
import useMediaQuery from "hooks/useMediaQuery";

interface VideoTextSectionProps extends CSSProperties {
  "--negativeMargin": string | 0 | undefined;
  "--positiveMargin": string | 0 | undefined;
  "--size": string | 0 | undefined;
}

type VimeoGalleryProps = {
  videos: Videos;
};

function VimeoGallery({ videos }: VimeoGalleryProps) {
  const [isDesktop] = useMediaQuery("(min-width: 992px)");
  const [activeButton, setActiveButton] = useState({
    index: -1,
  });

  useEffect(() => {
    const players = initializeVimeoPlayers(videos);
    return () => unmountVimeoPlayers(players);
  }, []);

  return (
    <Section>
      {videos.map((video, index) => {
        const {
          title,
          description,
          descriptionNew,
          descriptionTitle,
          hasPriority,
          randomMargin,
          isVertical,
          thumbnailUrl,
        } = video;
        const style: VideoTextSectionProps = {
          "--negativeMargin": randomMargin && -randomMargin + "vw",
          "--positiveMargin": randomMargin && randomMargin + "vw",
          "--size": isVertical ? "30%" : hasPriority ? "70%" : "60%",
        };
        const buttonIsActive = activeButton.index === index;

        return (
          <VideoTextSection
            key={index}
            withText={Boolean(description) || Boolean(descriptionNew?.html)}
            style={style}
          >
            <VideoContainer>
              {isDesktop && (
                <PlayVideoOverlay
                  id={`videoOverlay-${index}`}
                  onClick={(event) => handleVideoClick(event, index)}
                  onMouseEnter={() => setActiveButton({ index: index })}
                  onMouseLeave={() => setActiveButton({ index: -1 })}
                >
                  <PlayButton isActive={buttonIsActive} />
                  <NextImage
                    src={thumbnailUrl}
                    layout="fill"
                    objectFit="cover"
                  />
                </PlayVideoOverlay>
              )}
              <VideoDescription>{title}</VideoDescription>
              <div id={`video-${index}`} data-vimeo-defer />
            </VideoContainer>
            {description ||
              (descriptionNew?.html && (
                <div>
                  <h3>{descriptionTitle}</h3>
                  {(descriptionNew?.html && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: sanitizeHTML(descriptionNew.html),
                      }}
                    />
                  )) || <p>{description}</p>}
                </div>
              ))}
          </VideoTextSection>
        );
      })}
    </Section>
  );
}

export default VimeoGallery;

function initializeVimeoPlayers(videos: Videos) {
  const players = videos.map(({ vimeoUrl }, index) => {
    const player = new Player(`video-${index}`, {
      url: vimeoUrl,
      dnt: true,
      responsive: true,
      playsinline: false,
      byline: false,
      title: false,
      portrait: false,
    });

    player.on("play", () => pauseAllOtherVideos(videos, index));

    return player;
  });

  return players;
}

function unmountVimeoPlayers(players: Player[]) {
  players.map((player) => {
    player.off("play");
    player.destroy();
  });
}

function handleVideoClick(event: React.MouseEvent, index: number) {
  event.stopPropagation();

  const player = new Player(`video-${index}`);

  player.ready().then(() => {
    player.play().then(() => {
      const playerElement = document.getElementById(`videoOverlay-${index}`);
      playerElement?.classList.add("played");
    });
  });
}

function pauseAllOtherVideos(videos: Videos, currentVideoIndex: number) {
  videos.map((_, index) => {
    if (index !== currentVideoIndex) {
      const player = new Player(`video-${index}`);

      player.pause();
    }
  });
}

const PlayVideoOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 15;

  &.played {
    visibility: hidden;
  }
`;

const Section = styled.section`
  display: grid;
  grid-auto-rows: auto;
  grid-auto-flow: row;
  grid-row-gap: 4rem;
  z-index: 15;
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

  @media screen and (min-width: 768px) {
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

const VideoDescription = styled.p`
  position: absolute;
  text-align: center;
  z-index: 10;
  top: -2rem;
  width: 100%;
  font-family: var(--font-family-secondary);
  font-style: italic;
  font-size: 1.2rem;
  text-transform: lowercase;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  line-clamp: 1;

  @media screen and (min-width: 768px) {
    transform: rotate(-90deg) translate(-50%, -50%);
    transform-origin: bottom left;
    bottom: 50%;
    max-width: 20vmax;
    top: unset;
    width: unset;
  }
`;
