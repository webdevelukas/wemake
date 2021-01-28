import styled from "styled-components";

export default function About() {
  return (
    <>
      <Wrapper />
      <Span>Hey, about we make.</Span>
    </>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
`;

const Span = styled.div`
  height: 600px;
`;
