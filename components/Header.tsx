import styled from "styled-components";
import NextLink from "next/link";
import { useRouter } from "next/dist/client/router";

type HeaderProps = {
  isNotMobile: boolean;
};

function Header({ isNotMobile }: HeaderProps) {
  const { pathname } = useRouter();

  return (
    <Container>
      <NextLink href="/" passHref>
        <a>
          <Logo src="/wemake-logo.svg" />
        </a>
      </NextLink>
      <Navigation role="navigation">
        {isNotMobile && (
          <NextLink href="/">
            <a className={pathname === "/" ? "active" : ""}>Work</a>
          </NextLink>
        )}
        <NextLink href="/about">
          <a className={pathname === "/about" ? "active" : ""}>About</a>
        </NextLink>
        <a>Contact</a>
      </Navigation>
    </Container>
  );
}

export default Header;

const Container = styled.header`
  z-index: 10;
  position: fixed;
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  justify-items: end;
  align-items: center;
  padding: 8vw;

  @media screen and (min-width: 600px) {
    padding: 3rem;
  }
`;

const Logo = styled.img`
  height: auto;
  width: 30vw;

  @media screen and (min-width: 600px) {
    width: 10vw;
    min-width: 150px;
    max-width: 250px;
  }
`;

const Navigation = styled.nav`
  display: grid;
  grid-auto-columns: auto;
  grid-auto-flow: column;
  grid-column-gap: 5vw;

  @media screen and (min-width: 600px) {
    grid-column-gap: 2rem;
  }
`;
