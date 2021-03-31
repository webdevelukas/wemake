import { GetStaticProps } from "next";
import shuffleArray from "services/shuffleArray";
import styled from "styled-components";
import requestGraphCMS from "services/graphcms";
import TeamMembers from "components/TeamMembers";
import sanitizeHTML from "services/sanitizeHTML";
import { gql } from "graphql-request";
import TextContainer from "elements/TextContainer";

type AboutProps = {
  teamMembers: [
    {
      firstName: string;
      lastName: string;
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

  return (
    <PageWrapper>
      <TeamMembers teamMembers={teamMembers} />
      <TextContainer>
        <h1>{header}</h1>
        <HTMLTextContainer
          dangerouslySetInnerHTML={{ __html: sanitizeHTML(description.html) }}
        />
      </TextContainer>
    </PageWrapper>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { aboutPage, teamMembers } = await requestGraphCMS(gql`
    {
      aboutPage(where: { id: "cklkskuyw8a210a62h8xqzw15" }) {
        header
        description {
          html
        }
      }
      teamMembers {
        firstName
        lastName
        videos {
          url
          mimeType
        }
        placeholderImage {
          url
          alt
        }
      }
    }
  `);

  const shuffledTeamMembers = shuffleArray(teamMembers);

  return {
    revalidate: 1,
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
  grid-row-gap: 16vmax;
  padding: 16vh 1rem;
`;

const HTMLTextContainer = styled(TextContainer)`
  padding-left: 1.5rem;

  .small {
    position: relative;
    font-size: 0.8rem;
    margin-bottom: 1rem;
    margin-left: -1rem;
    padding-bottom: 0.5rem;
    padding-left: 1rem;

    :first-of-type {
      padding-top: 0.5rem;
    }

    :not(:last-of-type):after {
      content: "";
      position: absolute;
      width: 40%;
      border-bottom: 0.1px solid white;
      left: -0.1%;
      bottom: -0.2rem;
      opacity: 0.8;
    }
  }

  .small > p {
    font-size: 0.8rem;
    margin-bottom: 0;
    line-height: 1rem;

    a {
      font-size: 0.925rem;
      letter-spacing: normal;
    }
  }
`;
