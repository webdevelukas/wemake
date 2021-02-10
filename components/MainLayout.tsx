import dynamic from "next/dynamic";
import useMediaQuery from "hooks/useMediaQuery";
import Header from "./Header";
import InstagramLink from "./InstagramLink";
import styled from "styled-components";
import useScrollPosition from "hooks/useScrollPosition";
import { useEffect, useState } from "react";

const Footer = dynamic(() => import("./Footer"));

type MainLayoutProps = {
  children: React.ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  const [showContact, setShowContact] = useState<boolean>(false);
  const [isNotMobile] = useMediaQuery("(min-width: 820px)");
  const [scrollPosition] = useScrollPosition();

  useEffect(() => {
    const body = document.body;

    if (typeof window !== "undefined" && showContact) {
      body.style.position = "fixed";
      body.style.top = `-${scrollPosition}px`;
    }
    if (typeof window !== "undefined" && !showContact) {
      const scrollY = body.style.top;
      body.style.position = "";
      body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }, [showContact]);

  return (
    <>
      <Header
        isNotMobile={isNotMobile}
        showContact={showContact}
        setShowContact={setShowContact}
      />
      <ContactOverlay showContact={showContact}>
        <Button onClick={() => setShowContact(false)}>X Close</Button>
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
          </ContactWrapper>
          <Footer />
        </GridContainer>
      </ContactOverlay>
      <InstagramLink isNotMobile={isNotMobile} />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default MainLayout;

const ContactOverlay = styled.div<{ showContact: boolean }>`
  z-index: 20;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100vw;
  background-color: var(--color-primary-transparent);
  max-height: ${({ showContact }) => (showContact ? "100%" : 0)};
  transition: all 0.3s ease-in-out;
  overflow-y: auto;
`;

const Button = styled.a`
  position: absolute;
  top: 9.5vw;
  right: 8vw;

  @media screen and (min-width: 600px) {
    top: 3.6rem;
    right: 3rem;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  width: 100%;
  height: 100%;
  align-items: center;
  padding: 0 2rem;

  @media screen and (min-width: 820px) {
    justify-items: center;
    text-align: center;
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

  @media screen and (min-width: 600px) {
    margin-left: 1rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;
