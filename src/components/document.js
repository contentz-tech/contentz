const { jsx } = require("@emotion/core");
const { join } = require("path");

const formatURL = (domain, path) => {
  if (!path) return domain;
  return `${domain}${path.slice(1, path.indexOf(".mdx"))}/`;
};

const formatOGURL = path => {
  return join("/static/_social", path).replace(".mdx", "")
};

function Document({
  data = {},
  config = {},
  links = [],
  content,
  children,
  path
} = {}) {
  return jsx(
    "html",
    { lang: data.lang || config.language || "en" },
    jsx(
      "head",
      null,
      jsx("meta", {
        httpEquiv: "Content-Type",
        content: "text/html; charset=utf-8"
      }),
      jsx(
        "title",
        null,
        data.title ? `${data.title} - ${config.title}` : config.title
      ),
      jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0"
      }),
      jsx("meta", {
        name: "description",
        content: data.description || config.description
      }),
      jsx("meta", {
        name: "language",
        content: data.lang || config.language || "en"
      }),
      jsx("meta", { name: "author", content: config.title }),
      jsx("meta", { name: "subject", content: config.description }),
      jsx("meta", { name: "pagename", content: config.title }),
      jsx("meta", { name: "HandheldFriendly", content: "True" }),
      jsx("meta", { name: "MobileOptimized", content: "320" }),
      jsx("meta", { name: "robots", content: "index, follow" }),
      jsx("meta", { name: "theme-color", content: "black" }),
      jsx("meta", {
        name: "apple-mobile-web-app-title",
        content: config.title
      }),
      jsx("meta", {
        httpEquiv: "X-UA-Compatible",
        content: "IE=edge,chrome=1"
      }),
      jsx("meta", {
        href: "/atom.xml",
        type: "application/atom+xml",
        rel: "alternate",
        title: config.title
      }),
      data.canonical_url &&
        jsx("meta", { rel: "canonical", href: data.canonical_url }),
      jsx("meta", {
        property: "og:type",
        content: "website"
      }),
      jsx("meta", {
        property: "og:title",
        content: data.title || config.title
      }),
      jsx("meta", {
        property: "og:description",
        content: data.description || config.description
      }),
      jsx("meta", {
        property: "og:image",
        content: data.social || formatOGURL(path)
      }),
      jsx("meta", {
        property: "og:image:alt",
        content: data.description || config.description
      }),
      jsx("meta", {
        property: "og:url",
        content: formatURL(config.domain, path)
      }),
      jsx("meta", {
        property: "og:site_name",
        content: config.title
      }),
      jsx("meta", {
        property: "og:locale",
        content: data.lang || config.language || "en"
      }),
      jsx("link", { rel: "prefetch", href: "/" }),
      jsx("link", { rel: "prefetch", href: "/articles/" }),
      config.hasLinks && jsx("link", { rel: "prefetch", href: "/links/" }),
      links
        .concat(
          (config.navigation || [])
            .map(({ path }) => (path.endsWith("/") ? path : `${path}/`))
            .filter(path => path.startsWith("/"))
        )
        .map(link => jsx("link", { rel: "prefetch", href: link, key: link }))
    ),
    jsx(
      "body",
      {
        css: {
          background: "white",
          color: "black",
          margin: 0,
          fontSize: "18px",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
          "@media (prefers-color-scheme: dark)": {
            background: "#151515",
            color: "white"
          }
        }
      },
      children
        ? jsx("main", null, children)
        : jsx("main", { dangerouslySetInnerHTML: { __html: content } }),
      config.sw !== false
        ? jsx("script", { src: "/load-sw.js" })
        : jsx("script", { src: "/unload-sw.js" })
    )
  );
}

module.exports = Document;
