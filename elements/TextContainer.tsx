import styled from "styled-components";

const TextContainer = styled.div`
  @media screen and (min-width: 600px) {
    width: 80vw;
    margin: 0 auto;
  }

  @media screen and (min-width: 820px) {
    max-width: var(--max-content-width);
  }

  > p {
    margin-bottom: 1rem;
  }
`;

export default TextContainer;
