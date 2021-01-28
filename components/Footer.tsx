import NextLink from "next/link";
import styled from "styled-components";

function Footer() {
  return (
    <FooterContainer>
      <Mail>
        <a href="mailto:hey@wemake.de">hey@wemake.de </a>
      </Mail>
      <span>
        <NextLink href="/impressum">Impressum</NextLink> |{" "}
        <NextLink href="/datenschutz">Datenschutz</NextLink>
      </span>
      <span>© wemake 2021</span>
    </FooterContainer>
  );
}

export default Footer;

const FooterContainer = styled.footer`
  display: grid;
  grid-auto-rows: auto;
  grid-auto-flow: row;
  grid-row-gap: 0.25rem;
  justify-content: center;
  justify-items: center;
  margin-bottom: 2rem;
  font-size: 0.75rem;

  @media screen and (max-width: 280px) {
    justify-content: left;
    justify-items: left;
    margin-left: 1.5rem;
  }

  a {
    font-family: var(--font-family-primary);
  }
`;

const Mail = styled.b`
  font-size: 1.3rem;
  transform: rotate(-1deg);
  margin-bottom: 1rem;

  font-style: italic;
`;
