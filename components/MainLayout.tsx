import useMediaQuery from "hooks/useMediaQuery";
import Header from "./Header";
import InstagramLink from "./InstagramLink";

function MainLayout() {
  const [isNotMobile] = useMediaQuery("(min-width: 820px)");
  return (
    <>
      <Header isNotMobile={isNotMobile} />
      <InstagramLink isNotMobile={isNotMobile} />
    </>
  );
}

export default MainLayout;
