import TextContainer from "elements/TextContainer";
import { gql } from "graphql-request";
import { GetStaticProps } from "next";
import requestGraphCMS from "services/graphcms";
import sanitizeHTML from "services/sanitizeHTML";
import styled from "styled-components";

type PrivacyPageProps = {
  privacyPage: {
    htmlContent: string;
  };
};

export default function PrivacyPage({ privacyPage }: PrivacyPageProps) {
  const { htmlContent } = privacyPage;

  return (
    <PageWrapper>
      <TextContainer
        dangerouslySetInnerHTML={{
          __html: sanitizeHTML(htmlContent),
        }}
      />
    </PageWrapper>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { privacyPage } = await requestGraphCMS(gql`
    {
      privacyPage(where: { id: "ckmg89uw81k1c0e52l8dlv4oh" }) {
        htmlContent
      }
    }
  `);

  return {
    props: {
      revalidate: 1,
      privacyPage: privacyPage,
    },
  };
};

const PageWrapper = styled.div`
  padding: 24vh 1rem;

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
