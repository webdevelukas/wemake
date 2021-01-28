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
    --font-family-primary: Arial, Helvetica, sans-serif;
  }
  html {
    font-family: var(--font-family-primary);
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
