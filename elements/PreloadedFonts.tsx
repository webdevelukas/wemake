const isBrowser = typeof window !== "undefined";

const fonts = [
  { href: "/fonts/Roboto/Roboto-Light.woff2", type: "font/woff2" },
  { href: "/fonts/Roboto/Roboto-Light.woff", type: "font/woff" },
  { href: "/fonts/Roboto/Roboto-Light.ttf", type: "font/ttf" },
  { href: "/fonts/Roboto/Roboto-Light.svg", type: "font/svg" },
  { href: "/fonts/Roboto/Roboto-Light.eot", type: "font/eot" },
  { href: "/fonts/Roboto/Roboto-LightItalic.woff2", type: "font/woff2" },
  { href: "/fonts/Roboto/Roboto-LightItalic.woff", type: "font/woff" },
  { href: "/fonts/Roboto/Roboto-LightItalic.ttf", type: "font/ttf" },
  { href: "/fonts/Roboto/Roboto-LightItalic.svg", type: "font/svg" },
  { href: "/fonts/Roboto/Roboto-LightItalic.eot", type: "font/eot" },
  { href: "/fonts/Roboto/Roboto-Regular.woff2", type: "font/woff2" },
  { href: "/fonts/Roboto/Roboto-Regular.woff", type: "font/woff" },
  { href: "/fonts/Roboto/Roboto-Regular.ttf", type: "font/ttf" },
  { href: "/fonts/Roboto/Roboto-Regular.svg", type: "font/svg" },
  { href: "/fonts/Roboto/Roboto-Regular.eot", type: "font/eot" },
  { href: "/fonts/Roboto/Roboto-Italic.woff2", type: "font/woff2" },
  { href: "/fonts/Roboto/Roboto-Italic.woff", type: "font/woff" },
  { href: "/fonts/Roboto/Roboto-Italic.ttf", type: "font/ttf" },
  { href: "/fonts/Roboto/Roboto-Italic.svg", type: "font/svg" },
  { href: "/fonts/Roboto/Roboto-Italic.eot", type: "font/eot" },
  { href: "/fonts/Roboto/Roboto-Bold.woff2", type: "font/woff2" },
  { href: "/fonts/Roboto/Roboto-Bold.woff", type: "font/woff" },
  { href: "/fonts/Roboto/Roboto-Bold.ttf", type: "font/ttf" },
  { href: "/fonts/Roboto/Roboto-Bold.svg", type: "font/svg" },
  { href: "/fonts/Roboto/Roboto-Bold.eot", type: "font/eot" },
  { href: "/fonts/Roboto/Roboto-BoldItalic.woff2", type: "font/woff2" },
  { href: "/fonts/Roboto/Roboto-BoldItalic.woff", type: "font/woff" },
  { href: "/fonts/Roboto/Roboto-BoldItalic.ttf", type: "font/ttf" },
  { href: "/fonts/Roboto/Roboto-BoldItalic.svg", type: "font/svg" },
  { href: "/fonts/Roboto/Roboto-BoldItalic.eot", type: "font/eot" },
  { href: "/fonts/Spectral/Spectral-Light.woff2", type: "font/woff2" },
  { href: "/fonts/Spectral/Spectral-Light.woff", type: "font/woff" },
  { href: "/fonts/Spectral/Spectral-Light.ttf", type: "font/ttf" },
  { href: "/fonts/Spectral/Spectral-Light.svg", type: "font/svg" },
  { href: "/fonts/Spectral/Spectral-Light.eot", type: "font/eot" },
  { href: "/fonts/Spectral/Spectral-LightItalic.woff2", type: "font/woff2" },
  { href: "/fonts/Spectral/Spectral-LightItalic.woff", type: "font/woff" },
  { href: "/fonts/Spectral/Spectral-LightItalic.ttf", type: "font/ttf" },
  { href: "/fonts/Spectral/Spectral-LightItalic.svg", type: "font/svg" },
  { href: "/fonts/Spectral/Spectral-LightItalic.eot", type: "font/eot" },
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
