const isBrowser = typeof window !== "undefined";

const fonts = [
  { href: "/fonts/Roboto/Roboto-Light.woff2", type: "font/woff2" },
  { href: "/fonts/Roboto/Roboto-LightItalic.woff2", type: "font/woff2" },
  { href: "/fonts/Roboto/Roboto-Regular.woff2", type: "font/woff2" },
  { href: "/fonts/Roboto/Roboto-Italic.woff2", type: "font/woff2" },
  { href: "/fonts/Roboto/Roboto-Bold.woff2", type: "font/woff2" },
  { href: "/fonts/Roboto/Roboto-BoldItalic.woff2", type: "font/woff2" },
  { href: "/fonts/Spectral/Spectral-Light.woff2", type: "font/woff2" },
  { href: "/fonts/Spectral/Spectral-LightItalic.woff2", type: "font/woff2" },
];

function PreloadedFonts() {
  return (
    <>
      {isBrowser &&
        fonts.map(({ href, type }, index) => (
          <link
            key={index}
            rel="preload"
            href={href}
            as="font"
            type={type}
            crossOrigin=""
          />
        ))}
    </>
  );
}

export default PreloadedFonts;
