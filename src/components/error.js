const { Fragment } = require("react");
const { jsx } = require("@emotion/core");

const { Title, Description } = require("./lead");
const { Anchor } = require("./html/text");
const Header = require("./header");

function ErrorPage({ config = {} } = {}) {
  return jsx(
    Fragment,
    null,
    jsx(Header, { ...config, target: "/" }),
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
      jsx(Title, null, "Error 404"),
      jsx(
        Description,
        null,
        "The page or article you have tried to access was not found"
      ),
      jsx(
        "div",
        {
          css: {
            a: {
              display: "block"
            }
          }
        },
        jsx(Anchor, { href: "/" }, "Go to the Home"),
        jsx(Anchor, { href: "/articles/" }, "Go to the list of Articles"),
        config.hasLinks &&
          jsx(Anchor, { href: "/links/" }, "Go to the list of Shared Links")
      )
    )
  );
}

module.exports = ErrorPage;
