import { GetStaticProps } from "next";
import NextImage from "next/image";
import shuffleArray from "services/shuffleArray";
import styled from "styled-components";
import requestGraphCMS from "services/graphcms";
import DOMPurify from "isomorphic-dompurify";

type AboutProps = {
  teamMembers: [
    {
      name: string;
      videos: [{ url: string; mimeType: string }];
      placeholderImage: { url: string; alt: string };
    }
  ];
  aboutPage: {
    header: string;
    description: { html: string };
  };
};

export default function About({ teamMembers, aboutPage }: AboutProps) {
  const { header, description } = aboutPage;
  const purifiedDescription = DOMPurify.sanitize(description.html);

  return (
    <PageWrapper>
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
      <TextContainer>
        <h1>{header}</h1>
        <TextContainer
          dangerouslySetInnerHTML={{ __html: purifiedDescription }}
        />
      </TextContainer>
    </PageWrapper>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { aboutPage, teamMembers } = await requestGraphCMS(`{
    aboutPage(where: {id: "cklkskuyw8a210a62h8xqzw15"}) {
      header
      description {
        html
      }
    }
    teamMembers {
      name
      videos {url mimeType}
      placeholderImage {
        url
        alt
      }
    }
  }`);

  const shuffledTeamMembers = shuffleArray(teamMembers);

  return {
    props: {
      teamMembers: shuffledTeamMembers,
      aboutPage: aboutPage,
    },
  };
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

  > p {
    margin-bottom: 1rem;
  }
`;
