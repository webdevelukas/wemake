import dynamic from "next/dynamic";
import useMediaQuery from "hooks/useMediaQuery";
import Header from "./Header";
import InstagramLink from "./InstagramLink";
import { useState } from "react";

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
      <Header isNotMobile={isNotMobile} setShowContact={setShowContact} />
      <ContactOverlay
        showContact={showContact}
        setShowContact={setShowContact}
      />
      <InstagramLink isNotMobile={isNotMobile} />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default MainLayout;
