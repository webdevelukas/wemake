import styled from "styled-components";
import NextImage from "next/image";
import { GetStaticProps } from "next";
import requestGraphCMS from "services/graphcms";
import { gql } from "graphql-request";
import { Video, Videos } from "types";
import VideoGallery from "components/galleries/VideoGallery";

type HomePageProps = {
  homePage: {
    fullscreenVideos: [
      {
        url: string;
        mimeType: string;
      }
    ];
    fallbackImage: { url: string; alt: string };
    vimeoVideos: Videos;
  };
};

export default function HomePage({ homePage }: HomePageProps) {
  const { fullscreenVideos, fallbackImage, vimeoVideos } = homePage;

  return (
    <>
      <HeaderVideo autoPlay loop muted playsInline>
        {fullscreenVideos.map((video, index) => (
          <source key={index} src={video.url} type={video.mimeType} />
        ))}
        <NextImage
          src={fallbackImage.url}
          alt={fallbackImage.alt}
          layout="fill"
          objectFit="cover"
        />
      </HeaderVideo>
      <VideoGallery videos={vimeoVideos} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { homePage } = await requestGraphCMS(gql`
    {
      homePage(where: { id: "ckmgldv6g28f90b00iybywgv1" }) {
        fullscreenVideos {
          url
          mimeType
        }
        fallbackImage {
          url
          alt
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
      video.thumbnailUrl = thumbnailUrl;
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

const HeaderVideo = styled.video`
  width: 100%;
  height: 100vh;
  object-fit: cover;
  object-position: center center;
  z-index: 0;
`;
