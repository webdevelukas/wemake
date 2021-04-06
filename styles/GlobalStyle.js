import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    --color-text: white;
    --color-primary: 6,15,20;
    --color-primary-transparent: rgb(6,15,20,0.9);
    --font-family-primary: 'Roboto', sans-serif;
    --font-family-secondary: 'Spectral SC', serif;
    --max-content-width: 1200px;

    font-family: var(--font-family-primary);
    font-size: 16px;
    color: var(--color-text);
  }
  
  body {
    width: 100%;
    padding: 0;
    margin: 0;
    background-color: rgb(var(--color-primary));
  }

  a {
    font-family: var(--font-family-secondary);
    color: var(--color-text);
    text-decoration: none;
    cursor: pointer;
    font-style: italic;
    text-transform: lowercase;
  }

  p {
    margin: 0;
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 300;
    letter-spacing: 0.3px;
  }

  h1, h2, h3 {
    font-family: var(--font-family-secondary);
    font-weight: unset;
    font-style: italic;
    line-height: 1.0;
  }

  h1 {
    font-size: 14vmin;
    margin-bottom: 1rem;
    text-transform: uppercase;

    @media screen and (min-width: 420px) {
      font-size: 10vmin;
    }

    @media screen and (min-width: 820px) {
      font-size: 4rem;
    }
  }

  h2 {
    font-size: 10vmin;
    margin: 6vmin 0 1rem;
    text-transform: uppercase;
    padding-left: 2rem;

    @media screen and (min-width: 420px) {
      font-size: 8vmin;
    }

    @media screen and (min-width: 820px) {
      font-size: 2rem;
    }
  }

  h3 {
    font-size: 8vmin;
    margin: 4vmin 0 1rem;
    text-transform: uppercase;
    padding-left: 2rem;

    @media screen and (min-width: 420px) {
      font-size: 6vmin;
    }

    @media screen and (min-width: 820px) {
      font-size: 1.8rem;
    }
  }

  

`;

export default GlobalStyle;
