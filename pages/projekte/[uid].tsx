import styled from "styled-components";
import NextImage from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";

type ProjectPageProps = {
  headImage: {
    url: string;
    alt: string;
  };
  placeholderImages: [{ url: string; text?: string }];
  randomMargin: number;
};

export default function ProjectPage({
  headImage,
  placeholderImages,
  randomMargin,
}: ProjectPageProps) {
  return (
    <>
      <Picture>
        <NextImage
          src={headImage.url}
          alt={headImage.alt}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </Picture>
      <Article>
        <Header>
          <Subtitle>TSV Erbach</Subtitle>
          <h1>Udsilari-Zwillinge für Eliteschule Stuttgart </h1>
        </Header>
        <ImagesTextSection>
          <ImageGallery>
            {placeholderImages.slice(0, 3).map((image, index) => (
              <ImageWrapper key={index}>
                <NextImage src={image.url} layout="fill" objectFit="cover" />
              </ImageWrapper>
            ))}
          </ImageGallery>
          <TextWrapper>
            <h2>Teaser</h2>
            <p>
              Mit dem Projekt “Udsilauri-Zwillinge für Eliteschule Stuttgart”
              unterstützt Ihr sowohl die sportliche als auch schulische Laufbahn
              der Brüder George und Daniel Udsilauri. Beide Athleten der
              Judo-Abteilung des TSV Erbach haben das Angebot bekommen, im
              kommenden Schuljahr die 10.Klasse der Linden-Realschule in
              Stuttgart-Untertürkheim zu besuchen.
            </p>
          </TextWrapper>
        </ImagesTextSection>
        <Section>
          {placeholderImages.slice(3).map((image, index) => (
            <ImageTextSection
              key={index}
              withText={Boolean(image.text)}
              randomMargin={randomMargin}
            >
              <ImageContainer>
                <VideoDescription>
                  {index + 1} - Virtual Exhibition
                </VideoDescription>
                <NextImage src={image.url} layout="fill" objectFit="cover" />
              </ImageContainer>
              {image.text && (
                <TextWrapper>
                  <h3>Teaser</h3>
                  <p>
                    Mit dem Projekt “Udsilauri-Zwillinge für Eliteschule
                    Stuttgart” unterstützt Ihr sowohl die sportliche als auch
                    schulische Laufbahn der Brüder George und Daniel Udsilauri.
                  </p>
                </TextWrapper>
              )}
            </ImageTextSection>
          ))}
        </Section>
      </Article>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const headImage = {
    url: "/placeholder/03.jpg",
    alt: "",
  };

  const placeholderImages = [
    { url: "/placeholder/01.jpg", text: "Hallo" },
    { url: "/placeholder/02.jpg", text: "Hallo" },
    { url: "/placeholder/03.jpg" },
    { url: "/placeholder/04.jpg", text: "Hallo" },
    { url: "/placeholder/05.jpg" },
    { url: "/placeholder/06.jpg", text: "Hallo" },
    { url: "/placeholder/07.jpg" },
    { url: "/placeholder/08.jpg" },
    { url: "/placeholder/09.jpg", text: "Hallo" },
    { url: "/placeholder/10.jpg", text: "Hallo" },
  ];

  const randomMargin = Math.random() * 5;

  return {
    props: {
      headImage: headImage,
      placeholderImages: placeholderImages,
      randomMargin: randomMargin,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { uid: "hallo" } }],
    fallback: false,
  };
};

const Picture = styled.picture`
  position: relative;
  display: block;
  width: 100%;
  height: 35vh;

  margin-bottom: 5rem;
`;

const Header = styled.header`
  h1 {
    margin-top: 1rem;
  }
`;

const Subtitle = styled.p`
  font-size: 14vmin;
  line-height: 1.1;

  @media screen and (min-width: 420px) {
    font-size: 10vmin;
  }

  @media screen and (min-width: 820px) {
    font-size: 4rem;
  }
`;

const Article = styled.article`
  position: relative;
  display: grid;
  grid-auto-rows: auto;
  grid-auto-flow: row;
  grid-row-gap: 10rem;
  width: 80vw;
  margin: 0 auto;

  @media screen and (min-width: 820px) {
    max-width: 1200px;
  }
`;

const Section = styled.section`
  display: grid;
  grid-auto-rows: auto;
  grid-auto-flow: row;
  grid-row-gap: 8rem;

  @media screen and (min-width: 820px) {
    grid-row-gap: 4rem;
  }
`;

const ImagesTextSection = styled.section`
  display: grid;
  grid-template-rows: auto auto;

  @media screen and (min-width: 820px) {
    grid-template-rows: unset;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 6rem;
  }
`;

const ImageTextSection = styled.section<{
  withText: boolean;
  randomMargin: number;
}>`
  display: grid;
  grid-template-rows: ${({ withText }) => (withText ? "auto 1fr" : "auto")};

  :nth-of-type(odd) {
    margin: 0 -${({ randomMargin }) => randomMargin}vw 0 ${({ randomMargin }) => randomMargin}vw;
  }

  :nth-of-type(even) {
    margin: 0 ${({ randomMargin }) => randomMargin}vw 0 -${({ randomMargin }) => randomMargin}vw;
  }

  @media screen and (min-width: 820px) {
    grid-template-rows: unset;
    grid-template-columns: ${({ withText }) =>
      withText ? "2fr 1fr" : "80vmin"};
    grid-column-gap: 3rem;
    justify-content: center;
  }
`;

const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 1rem;
  min-height: 300px;

  @media screen and (min-width: 820px) {
    min-height: 500px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;

  :nth-of-type(1) {
    margin: -1rem 2vw 1rem -2vw;
  }

  :nth-of-type(2) {
    grid-row: span 2;
    margin: -4rem -1vw 4rem 1vw;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  padding-bottom: 60%;
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

const TextWrapper = styled.div``;
