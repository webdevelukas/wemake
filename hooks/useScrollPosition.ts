import { useEffect, useState } from "react";

export default function useScrollPosition() {
  const isBrowser = typeof window !== "undefined";
  const [scrollPosition, setScrollPosition] = useState(
    isBrowser ? window.scrollY : 0
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  function handleScroll() {
    const currentScrollPosition = window.scrollY;

    setScrollPosition(currentScrollPosition);
  }

  return [scrollPosition];
}
