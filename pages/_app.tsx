import MainLayout from "components/MainLayout";
import type { AppProps } from "next/app";
import GlobalStyle from "styles/GlobalStyle";
import "../styles/fonts.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </>
  );
}

export default MyApp;
