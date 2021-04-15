import styled from "styled-components";
import { GetStaticProps } from "next";
import requestGraphCMS from "services/graphcms";
import { gql } from "graphql-request";
import { Video, Videos } from "types";
import VideoGallery from "components/galleries/VideoGallery";
import PageMeta from "components/PageMeta";

type HomePageProps = {
  homePage: {
    title: string;
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
  const { title, fullscreenVideos, fallbackImage, vimeoVideos } = homePage;

  const MetaData = {
    title: title,
    description: "",
    keywords: "",
    image: fallbackImage.url,
    url: "",
  };

  return (
    <>
      <PageMeta MetaData={MetaData} />
      {title && <Title>{title}</Title>}
      <HeaderVideo
        autoPlay
        loop
        muted
        playsInline
        poster={fallbackImage.url}
        disablePictureInPicture
        preload="auto"
      >
        {fullscreenVideos.map((video, index) => (
          <source key={index} src={video.url} type={video.mimeType} />
        ))}
      </HeaderVideo>
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
      video.thumbnailUrl = thumbnailUrl;
    })
  );

  homePage.vimeoVideos.map((video: Video) => {
    const groupOfNumbers = /([0-9]+)/;
    const groupsOfNumbers = video.vimeoUrl.match(groupOfNumbers);

    if (groupsOfNumbers) video.vimeoVideoID = groupsOfNumbers[0];
  });

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

const HeaderVideo = styled.video`
  width: 100%;
  height: 100vh;
  object-fit: cover;
  object-position: center center;
  z-index: 0;
`;
