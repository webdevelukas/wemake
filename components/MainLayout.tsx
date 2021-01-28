import useMediaQuery from "hooks/useMediaQuery";
import Header from "./Header";
import Footer from "./Footer";
import InstagramLink from "./InstagramLink";

type MainLayoutProps = {
  children: React.ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  const [isNotMobile] = useMediaQuery("(min-width: 820px)");
  return (
    <>
      <Header isNotMobile={isNotMobile} />
      <InstagramLink isNotMobile={isNotMobile} />
      {children}
      <Footer />
    </>
  );
}

export default MainLayout;
