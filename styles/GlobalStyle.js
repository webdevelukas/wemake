import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  html {
    --color-text: white;
    --color-primary: rgb(6,15,20);
    --breakpoint: 850px;
  }
  html {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: var(--color-text);
  }
  body {
    padding: 0;
    margin: 0;
    background-color: var(--color-primary);
  }

  a {
    font-family: 'Times New Roman', Times, serif;
    color: var(--color-text);
    text-decoration: none;
    cursor: pointer;

    &.active {
      font-style: italic;
    }
  }
`;

export default GlobalStyle;
