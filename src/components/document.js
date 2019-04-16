const { jsx } = require("@emotion/core");
const { join } = require("path");

const formatURL = (domain, path) => {
  if (!path) return domain;
  return `${domain}${path.slice(1, path.indexOf(".mdx"))}/`;
};

const formatOGURL = (path, domain) => {
  if (domain) return domain + formatOGURL(path);
  return join("/static/_social", path).replace(".mdx", ".png");
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
      jsx("link", {
        rel: "icon",
        href: config.icon || "/static/favicon.png"
      }),
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
      data.published === true &&
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
      jsx("meta", {
        name: "twitter:card",
        value: "summary_large_image",
        content: "summary_large_image"
      }),
      config.social &&
        config.social.twitter &&
        jsx("meta", {
          name: "twitter:site",
          value: `@${config.social.twitter}`,
          content: `@${config.social.twitter}`
        }),
      config.social &&
        config.social.twitter &&
        jsx("meta", {
          name: "twitter:creator",
          value: `@${config.social.twitter}`,
          content: `@${config.social.twitter}`
        }),
      jsx("meta", {
        name: "twitter:url",
        value: formatURL(config.domain, path),
        content: formatURL(config.domain, path)
      }),
      jsx("meta", {
        name: "twitter:title",
        value: data.title || config.title,
        content: data.title || config.title
      }),
      jsx("meta", {
        name: "twitter:description",
        value: data.description || config.description,
        content: data.description || config.description
      }),
      jsx("meta", {
        name: "twitter:image",
        value: data.social || formatOGURL(path, config.domain),
        content: data.social || formatOGURL(path, config.domain)
      }),
      jsx("meta", { name: "twitter:summary", content: config.description }),
      jsx("link", { rel: "prefetch", href: "/" }),
      config.hasArticles &&
        jsx("link", { rel: "prefetch", href: "/articles/" }),
      config.hasLinks && jsx("link", { rel: "prefetch", href: "/links/" }),
      config.hasSlides && jsx("link", { rel: "prefetch", href: "/slides/" }),
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
      config.analytics &&
        jsx("script", {
          async: true,
          src: `https://www.googletagmanager.com/gtag/js?id=${config.analytics}`
        }),
      config.analytics && jsx("script", { src: "/load-analytics.js" }),
      config.sw !== false
        ? jsx("script", { src: "/load-sw.js" })
        : jsx("script", { src: "/unload-sw.js" })
    )
  );
}

module.exports = Document;
