import styled from "styled-components";

type InstagramProps = {
  isNotMobile: boolean;
};

function InstagramLink({ isNotMobile }: InstagramProps) {
  return (
    <aside>
      <a href="https://www.instagram.com/heywemake/" target="_blank">
        <Container>
          <InstagramLogo src="/instagram.svg" />
          {isNotMobile && (
            <Wrapper>
              <span>#wemakewednesday</span>
              <b>@heywemake</b>
            </Wrapper>
          )}
        </Container>
      </a>
    </aside>
  );
}

export default InstagramLink;

const Container = styled.div`
  position: fixed;
  display: grid;
  grid-auto-columns: auto;
  grid-auto-flow: column;
  grid-column-gap: 1rem;
  bottom: 5vh;
  right: 8vw;
  align-items: center;

  @media screen and (min-width: 600px) {
    right: 3rem;
  }

  @media screen and (min-width: 820px) {
    right: -1.5rem;
    bottom: 12%;
    transform: rotate(-90deg);
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-auto-flow: row;
  grid-row-gap: 0.25rem;

  span {
    font-size: 0.75rem;
  }
  b {
    font-size: 1.25rem;
  }
`;

const InstagramLogo = styled.img`
  height: auto;
  width: 30px;

  @media screen and (min-width: 820px) {
    transform: rotate(90deg);
  }
`;
