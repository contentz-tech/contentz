const { jsx } = require("@emotion/core");

const ui = require("./ui");
const { Title, Description, Date } = require("./lead");

const Header = require("./header");
const Footer = require("./footer");
const CanonicalURL = require("./canonical");
const Translated = require("./translated");
const ReadNext = require("./read-next");

function Layout({ config, data, path, TOC, Component }) {
  if (!data.title) throw new Error("Article title is required!");
  return jsx(
    "div",
    { css: { position: "relative" } },
    jsx(Header, { ...config }),
    jsx(
      "section",
      {
        css: {
          margin: "0 auto",
          maxWidth: "40em",
          width: "100%",
          position: "relative",
          "@media (max-width: 40em)": {
            fontSize: "0.9em",
            boxSizing: "border-box",
            padding: "0 2em"
          }
        }
      },
      data.date && jsx(Date, { date: data.date }),
      jsx(Title, null, data.title),
      data.description && jsx(Description, null, data.description),
      TOC &&
        jsx(TOC, {
          components: {
            ...ui,
            wrapper: props =>
              jsx("aside", {
                css: {
                  a: {
                    color: "black"
                  },
                  ul: {
                    listStyleType: "none",
                    paddingLeft: 0,
                    marginLeft: 0,
                    ul: {
                      listStyleType: "square",
                      paddingLeft: "1em"
                    }
                  },
                  "@media (min-width: 1400px)": {
                    position: "absolute",
                    right: "110%",
                    width: "30vw",
                    maxWidth: "250px"
                  }
                },
                ...props
              })
          }
        }),
      data.canonical_url && jsx(CanonicalURL, { value: data.canonical_url }),
      data.translated_from && jsx(Translated.From, data.translated_from),
      data.translated_to &&
        jsx(Translated.To, { translations: data.translated_to }),
      jsx(Component, { components: ui }),
      data.next && jsx(ReadNext, data.next)
    ),
    jsx(Footer, {
      patreon: config.patreon,
      repository: config.repository,
      file: path || null
    })
  );
}

module.exports = Layout;
