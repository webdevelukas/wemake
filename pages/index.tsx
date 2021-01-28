import styled from "styled-components";

export default function Home() {
  return (
    <>
      <Wrapper />
      <Span>Hey, we make.</Span>
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
