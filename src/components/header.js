const { jsx } = require("@emotion/core");

const { Anchor } = require("./html/text");

function Header(props) {
  return jsx(
    "header",
    {
      css: {
        position: "sticky",
        top: 0,
        zIndex: 10,
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
          href: props.target || "/",
          title: "Go back to articles list",
          css: {
            color: "black",
            textDecoration: "none",
            "@media (prefers-color-scheme: dark)": {
              color: "white"
            }
          }
        },
        props.title
      ),
      jsx(
        "nav",
        { css: { a: { padding: "0 1em" } } },
        jsx(Anchor, { href: "/articles/" }, "Articles"),
        props.navigation &&
          props.navigation.map(({ name, path }) =>
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
