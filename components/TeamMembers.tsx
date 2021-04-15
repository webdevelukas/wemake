import styled from "styled-components";

type TeamMembersProps = {
  teamMembers: [
    {
      firstName: string;
      lastName: string;
      videos: [{ url: string; mimeType: string }];
      placeholderImage: { url: string; alt: string };
    }
  ];
};

function TeamMembers({ teamMembers }: TeamMembersProps) {
  return (
    <Container>
      {teamMembers.map(
        ({ firstName, lastName, videos, placeholderImage }, index) => (
          <Wrapper key={index}>
            <Name>
              {firstName}
              <br />
              {lastName}
            </Name>
            <Video
              autoPlay
              loop
              muted
              playsInline
              poster={placeholderImage.url}
            >
              {videos.map(({ url, mimeType }, index) => (
                <source key={index} src={url} type={mimeType} />
              ))}
            </Video>
          </Wrapper>
        )
      )}
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
    max-width: 70vmax;
  }
`;

const Name = styled.p`
  position: absolute;
  z-index: 15;
  font-family: var(--font-family-secondary);
  text-transform: uppercase;
  font-size: 2.5rem;
  line-height: 2.875rem;
  font-style: italic;
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  padding-bottom: 140%;

  @media screen and (min-width: 820px) {
    :last-of-type {
      margin: 6rem 0 -6rem;
    }
  }

  :first-of-type {
    ${Name} {
      bottom: 5rem;
      left: -7.5%;
    }
  }

  :last-of-type {
    ${Name} {
      bottom: -3rem;
      left: -7.5%;
    }
  }
`;

const Video = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  z-index: 5;
`;
