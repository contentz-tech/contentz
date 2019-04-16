const { jsx } = require("@emotion/core");

const { Anchor } = require("./html/text");
const { useIntl } = require("./intl");

function Header({ title, hasArticles, hasLinks, hasSlides, navigation }) {
  const { messages } = useIntl();

  return jsx(
    "header",
    {
      css: {
        background: "white",
        borderBottom: "1px solid #eaeaea",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.12)",
        padding: "1em 0",
        "@media (prefers-color-scheme: dark)": {
          background: "#151515",
          boxShadow: "0px 0px 10px 0px rgb(51,51,51)",
          borderBottom: "1px solid #333333"
        }
      }
    },
    jsx(
      "div",
      {
        css: {
          maxWidth: "60rem",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          "@media (max-width: 60rem)": {
            padding: "0 1em"
          }
        }
      },
      jsx(
        "a",
        {
          href: "/",
          title: messages.header.mainLinkDescription,
          css: {
            flex: 1,
            whiteSpace: "nowrap",
            color: "black",
            textDecoration: "none",
            "@media (prefers-color-scheme: dark)": {
              color: "white"
            }
          }
        },
        title
      ),
      jsx(
        "nav",
        {
          css: {
            overflowX: "auto",
            margin: "-1em 0",
            padding: "1em 0",
            a: { padding: "0 1em" }
          }
        },
        hasArticles &&
          jsx(Anchor, { href: "/articles/" }, messages.header.articles),
        hasLinks && jsx(Anchor, { href: "/links/" }, messages.header.links),
        hasSlides && jsx(Anchor, { href: "/slides/" }, messages.header.slides),
        navigation &&
          navigation.map(({ name, path }) =>
            jsx(
              Anchor,
              { key: path, href: path.endsWith("/") ? path : `${path}/` },
              name
            )
          )
      )
    )
  );
}

module.exports = Header;
