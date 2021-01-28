import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  html {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: white;
  }
  body {
    padding: 0;
    margin: 0;
    background-color: rgb(6,15,20);
  }
`;

export default GlobalStyle;
