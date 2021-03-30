import styled from "styled-components";

export default function ContactPage() {
  return (
    <GridContainer>
      <ContactWrapper>
        <h1>Hey, contact us.</h1>
        <Wrapper>
          <p>Cornelius in Stuttgart</p>
          <PhoneNumber>+49 176 / 600 26 485</PhoneNumber>
        </Wrapper>
        <Wrapper>
          <p>Matthias in Köln</p>
          <PhoneNumber>+49 179 / 920 44 45</PhoneNumber>
        </Wrapper>
        <Mail>
          <a href="mailto:hey@wemake.de">hey@wemake.de </a>
        </Mail>
      </ContactWrapper>
    </GridContainer>
  );
}

const GridContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  width: 100%;
  height: 75vh;
  align-items: center;
  padding: 0 2rem;

  @media screen and (min-width: 820px) {
    justify-items: center;
    text-align: center;
    height: 80vh;
  }
`;

const ContactWrapper = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-auto-flow: row;
  grid-row-gap: 1rem;

  @media screen and (min-width: 600px) {
    justify-items: center;
  }
`;

const PhoneNumber = styled.p`
  font-family: var(--font-family-secondary);
  font-style: bold;
  font-size: 1.8rem;
  margin-left: 1rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const Mail = styled.b`
  font-size: 1.875rem;
  transform: rotate(-1deg);
  font-style: italic;
  padding-top: 1rem;

  a {
    font-family: var(--font-family-primary);
  }
`;
