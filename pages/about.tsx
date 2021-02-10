import { GetStaticProps } from "next";
import NextImage from "next/image";
import shuffleArray from "services/shuffleArray";
import styled from "styled-components";

type AboutProps = {
  teamMembers: [
    {
      name: string;
      video: { mp4: { url: string }; webm: { url: string } };
      image: { url: string; alt: string };
    }
  ];
};

export default function About({ teamMembers }: AboutProps) {
  return (
    <PageWrapper>
      <Container>
        {teamMembers.map(({ name, video, image }, index) => (
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
        <p>Wir sind Brüder seit 1989, und Filmemacher seit 2012.</p>
        <p>
          Unsere Arbeit verändert den Blick auf die Dinge. Und ab und an sogar
          das Leben*. Als Filmemacher interessiert uns vor allem, wie eine
          Geschichte erzählt wird und warum - und was man dabei denkt und fühlt.
          Wir produzieren ehrlichen Content mit der Ambition, Ästhetik und
          Aussage bestmöglich zu verschmelzen. Durch echte Inhalte, starke
          Bilder, wirkungsvolle Musik und spürbare Sounds transportieren wir
          Informationen und Emotionen kreativ an ihr Ziel. Egal wie die
          Herangehensweise aussieht, am Ende steht ein stimmiges,
          stimmungsvolles und authentisches Ergebnis. Und eine Geschichte, die
          gehört werden will.
        </p>
        <p>
          <small>
            *2018 Crowdfunding-Video für Gebrüder Udsilauri
            <br />
            {"->"}{" "}
            <a href="https://www.facebook.com/daniel.udsilauri?__cft__[0]=AZXMWd68_VdZc240URUEqmPS8cOi6XxOO2ZHvJRPO2ozUXz4sdUgKHAuQLASTNPowdK1q_Qrf3jWf75p9gqpcd4cMOpR6uRh2HNmEBA6v41_NOuc12NNtAUNCJyN5PV1ot2m9NY5dNLd3NgcCa8ccnpX6pxi25dZpS5UqnVgOTXBjg&__tn__=-]K-R">
              Daniel Udsilauri
            </a>{" "}
            wird Deutscher Meister 2019 im U18-Judo
          </small>
        </p>
        <p>
          <small>
            {" "}
            *2019 Kampagnen-Video Europawahlkampf für{" "}
            <a href="https://www.facebook.com/freundaniel?__cft__[0]=AZXMWd68_VdZc240URUEqmPS8cOi6XxOO2ZHvJRPO2ozUXz4sdUgKHAuQLASTNPowdK1q_Qrf3jWf75p9gqpcd4cMOpR6uRh2HNmEBA6v41_NOuc12NNtAUNCJyN5PV1ot2m9NY5dNLd3NgcCa8ccnpX6pxi25dZpS5UqnVgOTXBjg&__tn__=-]K-R">
              Daniel Freund
            </a>
            <br />
            {"->"} Daniel Freund zieht zusammen mit 20 anderen von{" "}
            <a href="https://www.facebook.com/B90DieGruenen/?rf=1837152016509293">
              Bündnis90/DieGrünen
            </a>{" "}
            ins Europaparlament ein
          </small>
        </p>
      </TextContainer>
      <TextContainer>
        <h2>Follow us on Instagram</h2>
      </TextContainer>
    </PageWrapper>
  );
}

export const getStaticProps: GetStaticProps = async () => {
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

  const shuffledTeamMembers = shuffleArray(teamMembers);

  return { props: { teamMembers: shuffledTeamMembers } };
};

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
  @media screen and (min-width: 600px) {
    width: 80vw;
    margin: 0 auto;
  }

  @media screen and (min-width: 820px) {
    max-width: 1200px;
  }

  p {
    margin-bottom: 1rem;
  }
`;
