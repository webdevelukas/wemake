import styled from "styled-components";

export default function Datenschutz() {
  return (
    <>
      <Wrapper />
      <Span>Hey, Datenschutz of we make.</Span>
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