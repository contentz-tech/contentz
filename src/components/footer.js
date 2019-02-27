const { jsx } = require("@emotion/core");

const GitHubIcon = require("./icons/github");

const formatURL = (base, file) => {
  const _base = base.endsWith("/") ? base.slice(0, base.length - 1) : base;
  const _file = file.startsWith("/") ? file.slice(1) : file;
  return [_base, "blob/master", _file].join("/");
};

function Footer(props) {
  return jsx(
    "footer",
    {
      css: {
        background: "white",
        borderTop: "1px solid #eaeaea",
        padding: "2em 0",
        textAlign: "right",
        "@media (prefers-color-scheme: dark)": {
          background: "#151515",
          borderTopColor: "#333"
        }
      }
    },
    jsx(
      "div",
      { css: { maxWidth: "60rem", margin: "0 auto" } },
      jsx(
        "a",
        {
          href: formatURL(props.repository, props.file),
          rel: "alternate",
          title: "Edit it on GitHub",
          css: {
            color: "black",
            textDecoration: "none",
            fontSize: "0.8em",
            display: "inline-flex",
            alignItems: "center",
            "@media (prefers-color-scheme: dark)": {
              color: "white"
            }
          }
        },
        "Edit it on GitHub",
        jsx("i", { css: { height: "18px", width: "18px", marginLeft: "10px" } }, jsx(GitHubIcon))
      )
    )
  );
}

module.exports = Footer;
