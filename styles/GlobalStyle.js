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
    --color-primary-transparent: rgb(6,15,20,0.9);
    --font-family-primary: Arial, Helvetica, sans-serif;
    --font-family-secondary: 'Times New Roman', Times, serif;

    font-family: var(--font-family-primary);
    font-size: 16px;
    color: var(--color-text);
  }
  
  body {
    width: 100%;
    padding: 0;
    margin: 0;
    background-color: var(--color-primary);
  }

  a {
    font-family: var(--font-family-secondary);
    color: var(--color-text);
    text-decoration: none;
    cursor: pointer;

    &.active {
      font-style: italic;
    }
  }

  p {
    margin: 0;
    font-size: 1.2rem;
  }

  h1, h2 {
    font-family: var(--font-family-secondary);
  }

  h1 {
    font-size: 3.8rem;
    line-height: 1.1;
    margin-bottom: 2rem;

    @media screen and (min-width: 820px) {
      font-size: 4rem;
    }
  }

  h2 {
    font-size: 2.8rem;

    @media screen and (min-width: 820px) {
      font-size: 2rem;
    }
  }
`;

export default GlobalStyle;
