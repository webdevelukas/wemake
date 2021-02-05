import NextImage from "next/image";
import shuffleArray from "services/shuffleArray";
import styled from "styled-components";

const teamMembers = [
  {
    name: "Cornelius Bierer",
    video: {
      mp4: { url: "/placeholder/Cornelius-Bierer_loop.mp4" },
      webm: { url: "/placeholder/Cornelius-Bierer_loop.webm" },
    },
    image: { url: "/placeholder/Cornelius-Bierer_loop.png", alt: "" },
  },
  {
    name: "Matthias Bierer",
    video: {
      mp4: { url: "/placeholder/Matthias-Bierer_loop.mp4" },
      webm: { url: "/placeholder/Matthias-Bierer_loop.webm" },
    },
    image: { url: "/placeholder/Matthias-Bierer_loop.png", alt: "" },
  },
];

export default function About() {
  const shuffledTeamMembers = shuffleArray(teamMembers);

  return (
    <PageWrapper>
      <Container>
        {shuffledTeamMembers.map(({ name, video, image }, index) => (
          <Wrapper key={index}>
            <Name>{name}</Name>
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
          </Wrapper>
        ))}
      </Container>
      <TextContainer>
        <h1>About</h1>
        <p>
          Wir sind Brüder, und Brüder streiten. Vor Jahren mussten wir uns ein
          Zimmer teilen, heute teilen wir unsere Leidenschaft für Film und Musik
          durch wemake. Bei unserer gegenseitigen Kritik nehmen wir kein Blatt
          vor den Mund, außerdem ist am Ende mindestens einer von uns ein
          unnachgiebiger Perfektionist. All das kommt letztendlich unseren
          Kunden zugute.
        </p>
      </TextContainer>
      <TextContainer>
        <h2>Follow us on Instagram</h2>
      </TextContainer>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-auto-flow: row;
  grid-row-gap: 20vmax;
  padding: 24vh 1rem;

  @media screen and (min-width: 600px) {
    padding-top: 30vh;
  }
`;

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

const TextContainer = styled.div`
  h1 {
    font-family: var(--font-family-secondary);
  }

  @media screen and (min-width: 600px) {
    width: 80vw;
    margin: 0 auto;
  }

  @media screen and (min-width: 820px) {
    max-width: 1200px;

    h1 {
      font-size: 3rem;
    }
    h2 {
      font-size: 2rem;
    }
    p {
      font-size: 1.2rem;
    }
  }
`;
