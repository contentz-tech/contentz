const { jsx } = require("@emotion/core");

const GitHubIcon = require("./icons/github");
const Patreon = require("./patreon");
const { useIntl } = require("./intl");

const formatURL = (base, file) => {
  const _base = base.endsWith("/") ? base.slice(0, base.length - 1) : base;
  const _file = file.startsWith("/") ? file.slice(1) : file;
  return [_base, "blob/master", _file].join("/");
};

function Footer(props) {
  // don't render footer if it's going to empty
  if (!props.patreon && !props.repository) return null;
  const { messages } = useIntl();

  return jsx(
    "footer",
    {
      css: {
        background: "white",
        borderTop: "1px solid #eaeaea",
        padding: "2em 0",
        marginTop: "3em",
        "@media (prefers-color-scheme: dark)": {
          background: "#151515",
          borderTopColor: "#333"
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
          "@media (max-width: 60rem) and (orientation: portrait)": {
            flexDirection: "column",
            padding: "0 2em"
          },
          "@media (max-width: 60rem) and (orientation: landscape)": {
            padding: "0 2em"
          }
        }
      },
      props.patreon
        ? jsx(
            "div",
            { css: { fontSize: "0.9em" } },
            jsx(Patreon, { name: props.patreon })
          )
        : jsx("div"),
      props.repository &&
        jsx(
          "a",
          {
            href: formatURL(props.repository, props.file),
            rel: "alternate",
            title: messages.footer.editOnGitHub,
            css: {
              color: "black",
              textDecoration: "none",
              fontSize: "0.8em",
              display: "inline-flex",
              alignItems: "center",
              "@media (max-width: 60rem)": {
                marginTop: "1em"
              },
              "@media (prefers-color-scheme: dark)": {
                color: "white"
              }
            }
          },
          messages.footer.editOnGitHub,
          jsx(
            "i",
            { css: { height: "18px", width: "18px", marginLeft: "10px" } },
            jsx(GitHubIcon)
          )
        )
    )
  );
}

module.exports = Footer;
