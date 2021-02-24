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
    --font-family-secondary: 'Spectral SC', serif;

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
    font-size:1rem;

    @media screen and (min-width: 820px) {
    font-size: 1.2rem;}
  }

  h1, h2, h3 {
    font-family: var(--font-family-secondary);
  }

  h1 {
    font-size: 14vmin;
    line-height: 1.1;
    margin: 8vmin 0 4vmin;

    @media screen and (min-width: 420px) {
      font-size: 10vmin;
    }

    @media screen and (min-width: 820px) {
      font-size: 4rem;
    }
  }

  h2 {
    font-size: 10vmin;
    margin: 6vmin 0 3vmin;

    @media screen and (min-width: 420px) {
      font-size: 8vmin;
    }

    @media screen and (min-width: 820px) {
      font-size: 2.2rem;
    }
  }

  h3 {
    font-size: 8vmin;
    margin: 4vmin 0 2vmin;

    @media screen and (min-width: 420px) {
      font-size: 6vmin;
    }

    @media screen and (min-width: 820px) {
      font-size: 1.8rem;
    }
  }

  small {
    font-size: 0.8rem;
  }
`;

export default GlobalStyle;
