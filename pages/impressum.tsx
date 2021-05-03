import PageMeta from "components/PageMeta";
import TextContainer from "elements/TextContainer";
import { gql } from "graphql-request";
import { GetStaticProps } from "next";
import requestGraphCMS from "services/graphcms";
import sanitizeHTML from "services/sanitizeHTML";
import styled from "styled-components";

type ImprintPageProps = {
  imprintPage: {
    htmlContent: string;
    metaData: {
      title: string;
      description: string;
      keywords: string;
      image: { url: string };
    };
  };
};

export default function ImprintPage({ imprintPage }: ImprintPageProps) {
  const { htmlContent, metaData } = imprintPage;

  return (
    <>
      <PageMeta metaData={metaData} />
      <PageWrapper>
        <TextContainer
          dangerouslySetInnerHTML={{
            __html: sanitizeHTML(htmlContent),
          }}
        />
      </PageWrapper>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { imprintPage } = await requestGraphCMS(gql`
    {
      imprintPage(where: { id: "ckmg7xwc81fft0e521pfox0jb" }) {
        htmlContent
        metaData {
          title
          description
          keywords
          image {
            url
          }
        }
      }
    }
  `);

  return {
    revalidate: 1,
    props: {
      imprintPage: imprintPage,
    },
  };
};

const PageWrapper = styled.div`
  padding: 24vh 1rem;
  hyphens: auto;
  line-break: normal;

  @media screen and (max-width: 600px) {
    ${TextContainer} {
      > h1 {
        font-size: 2rem;
      }
      > h2 {
        font-size: 1.5rem;
      }
      > h3 {
        font-size: 1.25rem;
      }
    }
  }

  @media screen and (min-width: 600px) {
    padding-top: 30vh;
  }
`;
