import PageMeta from "components/PageMeta";
import TextContainer from "elements/TextContainer";
import { gql } from "graphql-request";
import { GetStaticProps } from "next";
import requestGraphCMS from "services/graphcms";
import sanitizeHTML from "services/sanitizeHTML";
import styled from "styled-components";

type AGBPageProps = {
  agbPage: {
    htmlContent: string;
    metaData: {
      title: string;
      description: string;
      keywords: string;
      image: { url: string };
    };
  };
};

export default function AGBPage({ agbPage }: AGBPageProps) {
  const { htmlContent, metaData } = agbPage;

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
  const { agbPage } = await requestGraphCMS(gql`
    {
      agbPage(where: { id: "cko8f9gk806p50d59fbfxmi8t" }) {
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
    props: {
      revalidate: 1,
      agbPage: agbPage,
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
    }
  }

  @media screen and (min-width: 600px) {
    padding-top: 30vh;
  }
`;
