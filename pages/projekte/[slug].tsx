import styled from "styled-components";
import NextImage from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Player from "@vimeo/player";
import requestGraphCMS from "services/graphcms";
import { Project, Video } from "types";

const ContactOverlay = dynamic(() => import("../../components/ContactOverlay"));

type ProjectPageProps = {
  project: Project;
};

export default function ProjectPage({ project }: ProjectPageProps) {
  const [showContact, setShowContact] = useState<boolean>(false);
  const {
    headerImage,
    customer,
    title,
    teaserImages,
    teaserTitle,
    teaser,
    vimeoVideos,
  } = project;

  useEffect(() => {
    vimeoVideos.map(({ vimeoUrl }, index) => {
      new Player(`video-${index}`, {
        url: vimeoUrl,
        dnt: true,
        responsive: true,
      });
    });
  });

  return (
    <>
      <ContactOverlay
        showContact={showContact}
        setShowContact={setShowContact}
      />
      <HeaderPicture>
        <NextImage
          src={headerImage.url}
          alt={headerImage.alt}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </HeaderPicture>
      <Article>
        <Header>
          <Subtitle>{customer.name}</Subtitle>
          <h1>{title}</h1>
        </Header>
        <ImagesTextSection>
          <ImageGallery>
            {teaserImages.map((image, index) => (
              <ImageWrapper key={index}>
                <NextImage
                  src={image.url}
                  alt={image.alt}
                  layout="fill"
                  objectFit="cover"
                />
              </ImageWrapper>
            ))}
          </ImageGallery>
          <TextWrapper>
            <h2>{teaserTitle}</h2>
            <p>{teaser}</p>
          </TextWrapper>
        </ImagesTextSection>
        <Section>
          {vimeoVideos.map(
            ({ title, description, descriptionTitle, randomMargin }, index) => (
              <ImageTextSection
                key={index}
                withText={Boolean(description)}
                style={{
                  "--negativeMargin": `${-randomMargin}vw`,
                  "--positiveMargin": `${randomMargin}vw`,
                }}
              >
                <ImageContainer>
                  <VideoDescription>
                    {index + 1} - {title}
                  </VideoDescription>
                  <div id={`video-${index}`} />
                </ImageContainer>
                {description && (
                  <TextWrapper>
                    <h3>{descriptionTitle}</h3>
                    <p>{description}</p>
                  </TextWrapper>
                )}
              </ImageTextSection>
            )
          )}
        </Section>
        <CallToAction>
          You like it? <a onClick={() => setShowContact(true)}>Contact</a> us.
        </CallToAction>
      </Article>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { project } = await requestGraphCMS(
    `query ProjectPageQuery($slug: String!) {
        project(where: {slug: $slug}) {
          headerImage {
            url
            alt
          }
          title
          teaserTitle
          teaser
          teaserImages {
            url
            alt
          }
          customer {
            name
          }
          vimeoVideos {
            title
            descriptionTitle
            description
            vimeoUrl
          }
        }
  }`,
    { slug: params?.slug }
  );

  project.vimeoVideos.map((vimeoVideo: Video) => {
    const randomMargin = Math.random() * 5;
    vimeoVideo.randomMargin = randomMargin;
  });

  return {
    props: {
      project: project,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { projects } = await requestGraphCMS(`{projects {slug}}`);

  const paths = projects.map((project: Project) => ({
    params: { slug: project.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

const HeaderPicture = styled.picture`
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

const CallToAction = styled.p`
  font-weight: bold;
  font-size: 14vmin;
  line-height: 1.1;
  margin: 20vmin auto 30vmin;

  @media screen and (min-width: 420px) {
    font-size: 10vmin;
  }

  @media screen and (min-width: 820px) {
    font-size: 4rem;
  }

  a {
    font-style: italic;
    font-weight: lighter;
  }
`;
