const { Fragment } = require("react");
const { jsx } = require("@emotion/core");

const { Title, Description } = require("./lead");
const { Anchor } = require("./html/text");
const Header = require("./header");
const { useIntl } = require("./intl");

function ErrorPage({ config = {} } = {}) {
  const { messages } = useIntl();

  return jsx(
    Fragment,
    null,
    jsx(Header, { ...config }),
    jsx(
      "section",
      {
        css: {
          boxSizing: "border-box",
          fontSize: "1.25em",
          minHeight: "calc(90vh - 58px)",
          margin: "10vh auto 0",
          maxWidth: "1000px",
          padding: "0 10vw 0",
          "@media (max-width: 1000px)": {
            fontSize: "1em"
          },
          "@media (max-width: 1000px) and (orientation: landscape)": {
            marginBottom: "10vh"
          }
        }
      },
      jsx(Title, null, messages.error.title),
      jsx(Description, null, messages.error.description),
      jsx(
        "div",
        {
          css: {
            a: {
              display: "block"
            }
          }
        },
        jsx(Anchor, { href: "/" }, messages.error.goHome),
        config.hasArticles &&
          jsx(Anchor, { href: "/articles/" }, messages.error.goArticles),
        config.hasLinks &&
          jsx(Anchor, { href: "/links/" }, messages.error.goLinks),
        config.hasSlides &&
          jsx(Anchor, { href: "/slides/" }, messages.error.goSlides)
      )
    )
  );
}

module.exports = ErrorPage;
