const { jsx } = require("@emotion/core");

function Document({
  data = {},
  config = {},
  links = [],
  content,
  children
} = {}) {
  return jsx(
    "html",
    { lang: data.lang || config.language },
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
      jsx("meta", { name: "language", content: data.lang }),
      jsx("meta", { name: "author", content: "" }),
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
      data.canonical_url &&
        jsx("meta", { rel: "canonical", href: data.canonical_url }),
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
      jsx("script", { src: "/load-sw.js" })
    )
  );
}

module.exports = Document;
