import NextLink from "next/link";
import styled from "styled-components";

type FooterProps = {
  showMail?: boolean;
};

function Footer({ showMail }: FooterProps) {
  return (
    <FooterContainer>
      {showMail && (
        <Mail>
          <a
            href="mailto:hey@wemake.de"
            target="_blank"
            rel="noopener noreferrer"
          >
            hey@wemake.de{" "}
          </a>
        </Mail>
      )}
      <span>
        <NextLink href="/impressum">
          <a>Impressum</a>
        </NextLink>{" "}
        |{" "}
        <NextLink href="/datenschutz">
          <a>Datenschutz</a>
        </NextLink>
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
  margin: 0 auto 2rem;
  font-size: 0.75rem;

  @media screen and (max-width: 280px) {
    justify-content: left;
    justify-items: left;
    margin-left: 1.5rem;
  }
`;

const Mail = styled.b`
  font-size: 1.3rem;
  transform: rotate(-1deg);
  margin-bottom: 1rem;
  font-style: italic;

  a {
    font-family: var(--font-family-primary);
  }
`;
