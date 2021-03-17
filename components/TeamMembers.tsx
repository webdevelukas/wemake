import styled from "styled-components";
import NextImage from "next/image";

type TeamMembersProps = {
  teamMembers: [
    {
      name: string;
      videos: [{ url: string; mimeType: string }];
      placeholderImage: { url: string; alt: string };
    }
  ];
};

function TeamMembers({ teamMembers }: TeamMembersProps) {
  return (
    <Container>
      {teamMembers.map(({ name, videos, placeholderImage }, index) => (
        <Wrapper key={index}>
          <Name>{name}</Name>
          <Video autoPlay loop muted playsInline>
            {videos.map(({ url, mimeType }, index) => (
              <source key={index} src={url} type={mimeType} />
            ))}
            <NextImage
              src={placeholderImage.url}
              alt={placeholderImage.alt}
              layout="fill"
              quality={100}
            />
          </Video>
        </Wrapper>
      ))}
    </Container>
  );
}

export default TeamMembers;

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-gap: 6rem;
  width: 80vw;
  margin: 0 auto;

  @media screen and (min-width: 820px) {
    grid-template-columns: 1fr 1fr;
    height: 70vh;
    max-width: 1200px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 50vh;

  @media screen and (min-width: 820px) {
    height: 80vh;

    :last-of-type {
      margin: 6rem 0 -6rem;
    }
  }
`;

const Name = styled.p`
  position: absolute;
  text-align: center;
  z-index: 10;
  transform: rotate(-90deg) translate(-50%, -50%);
  transform-origin: bottom left;
  bottom: 50%;
  max-width: 70vh;
`;

const Video = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  z-index: 5;
`;
