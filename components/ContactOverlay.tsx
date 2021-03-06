import styled from "styled-components";
import useScrollPosition from "hooks/useScrollPosition";
import { useEffect } from "react";
import Footer from "./Footer";
import { CSSTransition } from "react-transition-group";
import { useRouter } from "next/router";

type ContactOverlayProps = {
  showContact: boolean;
  setShowContact: (showContact: boolean) => void;
};

function ContactOverlay({ showContact, setShowContact }: ContactOverlayProps) {
  const router = useRouter();
  const [scrollPosition] = useScrollPosition();

  useEffect(() => {
    const body = document.body;

    if (typeof window !== "undefined" && showContact) {
      body.style.position = "fixed";
      body.style.overflowY = "scroll";
      body.style.top = `-${scrollPosition}px`;
    }
    if (typeof window !== "undefined" && !showContact) {
      const scrollY = body.style.top;
      body.style.position = "";
      body.style.top = "";

      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }

    router.events.on("beforeHistoryChange", () => {
      if (showContact) {
        const scrollY = body.style.top;
        body.style.position = "";
        body.style.top = "";

        window.scrollTo(0, parseInt(scrollY || "0") * -1);
        setShowContact(false);
      }
    });

    return () => {
      router.events.off("beforeHistoryChange", () => {
        if (showContact) {
          const scrollY = body.style.top;
          body.style.position = "";
          body.style.top = "";

          window.scrollTo(0, parseInt(scrollY || "0") * -1);
          setShowContact(false);
        }
      });
    };
  }, [showContact]);

  return (
    <Container showContact={showContact}>
      <CloseButton onClick={() => setShowContact(false)}>X Close</CloseButton>
      <CSSTransition in={showContact} timeout={150} classNames="contact">
        <GridContainer>
          <ContactWrapper>
            <h1>Hey, contact us.</h1>
            <Wrapper>
              <p>Cornelius in Stuttgart</p>
              <PhoneNumber
                href="tel:+4917660026485"
                target="_blank"
                rel="noopener noreferrer"
              >
                +49 176 / 600 26 485
              </PhoneNumber>
            </Wrapper>
            <Wrapper>
              <p>Matthias in Köln</p>
              <PhoneNumber
                href="tel:+491799204445"
                target="_blank"
                rel="noopener noreferrer"
              >
                +49 179 / 920 44 45
              </PhoneNumber>
            </Wrapper>
            <Mail>
              <a
                href="mailto:hey@wemake.de"
                target="_blank"
                rel="noopener noreferrer"
              >
                hey@wemake.de{" "}
              </a>
            </Mail>
          </ContactWrapper>
          <Footer />
        </GridContainer>
      </CSSTransition>
      <CloseOverlayArea onClick={() => setShowContact(false)} />
    </Container>
  );
}

export default ContactOverlay;

const CloseOverlayArea = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 21;
`;

const Container = styled.div<{ showContact: boolean }>`
  z-index: 20;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100vw;
  background-color: var(--color-primary-transparent);
  max-height: ${({ showContact }) => (showContact ? "100%" : 0)};
  transition: all 150ms ease-out;
  overflow-y: scroll;
  backdrop-filter: blur(2px);
`;

const CloseButton = styled.a`
  position: absolute;
  top: 6.5vw;
  right: 8vw;
  font-size: 1.6rem;
  z-index: 22;

  @media screen and (min-width: 600px) {
    top: 2.6rem;
    right: 3rem;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  width: 100%;
  height: 100%;
  align-items: center;
  padding: 2rem 2rem 0;

  footer {
    z-index: 22;
  }

  @media screen and (min-width: 768px) {
    justify-items: center;
    text-align: center;
    padding-top: 0;
  }

  &.contact-enter {
    opacity: 0;
  }
  &.contact-enter-active {
    opacity: 1;
    transition: opacity 150ms;
  }
  &.contact-exit {
    opacity: 1;
    transition: opacity 150ms;
  }
  &.contact-exit-active {
    opacity: 0;
  }
`;

const ContactWrapper = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-auto-flow: row;
  grid-row-gap: 1rem;
  transform: translate(0, -5%);
  z-index: 22;

  @media screen and (min-width: 768px) {
    justify-items: center;
  }
`;

const PhoneNumber = styled.a`
  font-family: var(--font-family-secondary);
  font-size: 1.8rem;

  @media screen and (min-width: 768px) {
    margin-left: 1rem;
  }
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
