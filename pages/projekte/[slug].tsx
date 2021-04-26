import styled from "styled-components";
import NextImage from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { useState } from "react";
import requestGraphCMS from "services/graphcms";
import { Project, Video } from "types";
import { gql } from "graphql-request";
import PageMeta from "components/PageMeta";
import sanitizeHTML from "services/sanitizeHTML";
import getVimeoVideoID from "services/getVimeoVideoID";
import replaceImageType from "services/replaceImageType";

const ContactOverlay = dynamic(() => import("../../components/ContactOverlay"));
const VimeoGallery = dynamic(
  () => import("../../components/galleries/VimeoGallery")
);

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
    teaserNew,
    vimeoVideos,
  } = project;

  const metaData = {
    title: title,
    description: teaserNew?.text || teaser,
    keywords: "",
    image: { url: headerImage.url },
  };

  return (
    <>
      <PageMeta metaData={metaData} />
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
          quality={100}
          priority
        />
      </HeaderPicture>
      <Article>
        <Header>
          <h1>{title}</h1>
          {customer && <Subtitle>{customer.name}</Subtitle>}
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
          <div>
            <h2>{teaserTitle}</h2>
            {teaserNew?.html && (
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizeHTML(teaserNew.html),
                }}
              />
            )}
          </div>
        </ImagesTextSection>
        <VimeoGallery videos={vimeoVideos} />
        <CallToAction>
          You like it? <a onClick={() => setShowContact(true)}>Contact</a> us.
        </CallToAction>
      </Article>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { project } = await requestGraphCMS(
    gql`
      query ProjectPageQuery($slug: String!) {
        project(where: { slug: $slug }) {
          headerImage {
            url
            alt
          }
          title
          teaserTitle
          teaser
          teaserNew {
            html
            text
          }
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
            descriptionNew {
              html
            }
            vimeoUrl
            hasPriority
          }
        }
      }
    `,
    { slug: params?.slug }
  );

  project.vimeoVideos.map((vimeoVideo: Video) => {
    const vimeoVideoID = getVimeoVideoID(vimeoVideo.vimeoUrl);
    const randomMargin = Math.random() * 0.75;

    vimeoVideo.randomMargin = randomMargin;
    vimeoVideo.vimeoVideoID = vimeoVideoID;
  });

  await Promise.all(
    project.vimeoVideos.map(async (video: Video) => {
      const vimeoVideo = await fetch(
        `https://vimeo.com/api/oembed.json?url=${video.vimeoUrl}`
      ).then((response) => response.json());
      const thumbnailUrl = replaceImageType(vimeoVideo.thumbnail_url);

      video.thumbnailUrl = thumbnailUrl;
      video.isVertical = vimeoVideo.height > vimeoVideo.width;
    })
  );

  return {
    revalidate: 1,
    props: {
      project: project,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { projects } = await requestGraphCMS(
    gql`
      {
        projects {
          slug
        }
      }
    `
  );

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
  font-size: 12vmin;
  line-height: 1.1;
  padding-left: 1rem;

  @media screen and (min-width: 420px) {
    font-size: 10vmin;
  }

  @media screen and (min-width: 992px) {
    font-size: 2rem;
    hyphens: unset;
  }
`;

const Article = styled.article`
  position: relative;
  display: grid;
  grid-auto-rows: auto;
  grid-auto-flow: row;
  grid-row-gap: 10rem;
  width: 90vw;
  margin: 0 auto;
  hyphens: auto;
  word-break: break-word;

  @media screen and (min-width: 768px) {
    max-width: var(--max-content-width);
  }

  @media screen and (min-width: 992px) {
    hyphens: unset;
    word-break: unset;
  }
`;

const ImagesTextSection = styled.section`
  display: grid;
  grid-template-rows: auto auto;

  @media screen and (min-width: 820px) {
    grid-template-rows: unset;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 4rem;
  }
`;

const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 0.25rem;
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
