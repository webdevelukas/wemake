import { GetStaticProps } from "next";
import shuffleArray from "services/shuffleArray";
import styled from "styled-components";
import requestGraphCMS from "services/graphcms";
import TeamMembers from "components/TeamMembers";
import sanitizeHTML from "services/sanitizeHTML";

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

  return (
    <PageWrapper>
      <TeamMembers teamMembers={teamMembers} />
      <TextContainer>
        <h1>{header}</h1>
        <TextContainer
          dangerouslySetInnerHTML={{ __html: sanitizeHTML(description.html) }}
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
