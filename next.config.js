module.exports = {
  images: {
    domains: ["i.vimeocdn.com", "media.graphcms.com"],
  },
  async redirects() {
    return [
      {
        source: "/portfolio/:slug*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/items/:slug*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/category/:slug*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/about-us/:slug*",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/wemake/:slug*",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/js/script.js",
        destination: "https://plausible.io/js/plausible.js",
      },
      {
        source: "/api/event",
        destination: "https://plausible.io/api/event",
      },
    ];
  },
};
