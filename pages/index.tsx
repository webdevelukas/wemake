import styled from "styled-components";
import { GetStaticProps } from "next";
import requestGraphCMS from "services/graphcms";
import { gql } from "graphql-request";
import { Video, Videos } from "types";
import VideoGallery from "components/galleries/VideoGallery";
import PageMeta from "components/PageMeta";
import useMediaQuery from "hooks/useMediaQuery";
import getVimeoVideoID from "services/getVimeoVideoID";

type HomePageProps = {
  homePage: {
    title: string;
    fullscreenVideos: [
      {
        url: string;
        mimeType: string;
      }
    ];
    mobileFullscreenVideos: [
      {
        url: string;
        mimeType: string;
      }
    ];
    fallbackImage: { url: string; alt: string };
    vimeoVideos: Videos;
    metaData: {
      title: string;
      description: string;
      keywords: string;
      image: { url: string };
    };
  };
};

export default function HomePage({ homePage }: HomePageProps) {
  const [isDesktop] = useMediaQuery("(min-width: 992px)");
  const {
    title,
    fullscreenVideos,
    mobileFullscreenVideos,
    fallbackImage,
    vimeoVideos,
    metaData,
  } = homePage;

  return (
    <>
      <PageMeta metaData={metaData} />
      {title && <Title>{title}</Title>}
      <HeaderVideoContainer>
        {!isDesktop && (
          <HeaderVideo
            autoPlay
            loop
            muted
            playsInline
            poster={fallbackImage.url}
            disablePictureInPicture
            preload="auto"
          >
            {mobileFullscreenVideos.map((video, index) => (
              <source key={index} src={video.url} type={video.mimeType} />
            ))}
          </HeaderVideo>
        )}
        {isDesktop && (
          <HeaderVideo
            autoPlay
            loop
            muted
            playsInline
            poster={fallbackImage.url}
            disablePictureInPicture
            preload="auto"
          >
            {isDesktop &&
              fullscreenVideos.map((video, index) => (
                <source key={index} src={video.url} type={video.mimeType} />
              ))}
          </HeaderVideo>
        )}
      </HeaderVideoContainer>
      <VideoGallery videos={vimeoVideos} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { homePage } = await requestGraphCMS(gql`
    {
      homePage(where: { id: "ckmgldv6g28f90b00iybywgv1" }) {
        title
        fullscreenVideos {
          url
          mimeType
        }
        mobileFullscreenVideos {
          url
          mimeType
        }
        fallbackImage {
          url(transformation: { document: { output: { format: webp } } })
          alt
        }
        metaData {
          title
          description
          keywords
          image {
            url
          }
        }
        vimeoVideos {
          title
          previewVideos(orderBy: mimeType_DESC) {
            url
            mimeType
          }
          customer {
            name
          }
          vimeoUrl
          project {
            slug
            callToAction
            homePageVideoTitle
          }
          callToAction
        }
      }
    }
  `);

  await Promise.all(
    homePage.vimeoVideos.map(async (video: Video) => {
      const videoThumbnail = await fetch(
        `https://vimeo.com/api/oembed.json?url=${video.vimeoUrl}`
      ).then((response) => response.json());
      const thumbnailUrl = replaceImageType(videoThumbnail.thumbnail_url);
      const vimeoVideoID = getVimeoVideoID(video.vimeoUrl);

      video.thumbnailUrl = thumbnailUrl;
      video.vimeoVideoID = vimeoVideoID;
    })
  );

  return {
    revalidate: 1,
    props: {
      homePage: homePage,
    },
  };
};

function replaceImageType(url: string) {
  const allAfterUnderscore = /\_(.*)/;
  const modifiedUrl = url.replace(allAfterUnderscore, ".webp");

  return modifiedUrl;
}

const Title = styled.h1`
  position: absolute;
  left: 50%;
  top: 40vh;
  transform: translate(-50%, -40%);
  margin: 0;
  text-align: center;
`;

const HeaderVideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  padding-bottom: 125%;

  @media screen and (min-width: 992px) {
    padding-bottom: unset;
    height: 100vh;
  }
`;

const HeaderVideo = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
`;
