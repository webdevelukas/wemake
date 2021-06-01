import dynamic from "next/dynamic";
import useMediaQuery from "hooks/useMediaQuery";
import Header from "./Header";
import InstagramLink from "./InstagramLink";
import { useState } from "react";
import Head from "next/head";

const Footer = dynamic(() => import("./Footer"));
const ContactOverlay = dynamic(() => import("./ContactOverlay"));

type MainLayoutProps = {
  children: React.ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  const [showContact, setShowContact] = useState<boolean>(false);
  const [isNotMobile] = useMediaQuery("(min-width: 820px)");

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script async defer data-domain="wemake.de" src="/js/script.js" />
      </Head>
      <Header isNotMobile={isNotMobile} setShowContact={setShowContact} />
      <ContactOverlay
        showContact={showContact}
        setShowContact={setShowContact}
      />
      <InstagramLink isNotMobile={isNotMobile} />
      <main>{children}</main>
      <Footer showMail />
    </>
  );
}

export default MainLayout;
