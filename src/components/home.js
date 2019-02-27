const { Fragment } = require("react");
const { jsx } = require("@emotion/core");

const { Title, Description } = require("./lead");
const Header = require("./header");
const Patreon = require("./patreon");

function formatURL({ name, value }) {
  switch (name.toLowerCase()) {
    case "twitter":
      return `https://twitter.com/${value}`;
    case "meetup":
      return `https://www.meetup.com/members/${value}/`;
    case "npm":
      return `https://www.npmjs.com/~${value}`;
    case "github":
      return `https://github.com/${value}`;
    case "github":
      return `https://github.com/${value}`;
    case "dev":
      return `https://dev.to/${value}`;
    case "linkedin":
      return `https://www.linkedin.com/in/${value}/`;
    default:
      return null;
  }
}

function HomePage({ config = {} } = {}) {
  return jsx(
    Fragment,
    null,
    jsx(Header, { ...config, target: "/" }),
    jsx(
      "section",
      {
        css: {
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          fontSize: "1.25em",
          minHeight: "calc(100vh - 58px)",
          margin: "0 auto 0",
          maxWidth: "1000px",
          padding: "0 10vw 0"
        }
      },
      jsx(Title, null, config.title),
      jsx(Description, null, config.description),
      jsx(
        "div",
        null,
        config.social &&
          Object.entries(config.social).map(([name, value]) =>
            jsx(
              "a",
              {
                key: name,
                href: formatURL({ name, value }),
                css: {
                  display: "inline-flex",
                  color: "black",
                  textDecoration: "none",
                  margin: "0 .5em",
                  ":first-of-type": {
                    marginLeft: 0
                  },
                  ":last-of-type": {
                    marginRight: 0
                  },
                  "@media (prefers-color-scheme: dark)": { color: "white" }
                }
              },
              jsx(
                "i",
                {
                  css: {
                    svg: {
                      width: "32px",
                      height: "32px",
                      fill: "black",
                      "@media (prefers-color-scheme: dark)": { fill: "white" }
                    }
                  }
                },
                jsx(require(`./icons/${name.toLowerCase()}`))
              )
            )
          ),
        config.email &&
          jsx(
            "a",
            {
              href: `mailto:${config.email}`,
              css: {
                display: "inline-flex",
                color: "black",
                textDecoration: "none",
                margin: "0 .5em",
                ":first-of-type": {
                  marginLeft: 0
                },
                ":last-of-type": {
                  marginRight: 0
                },
                "@media (prefers-color-scheme: dark)": { color: "white" }
              }
            },
            jsx(
              "i",
              {
                css: {
                  svg: {
                    width: "32px",
                    height: "32px",
                    fill: "black",
                    "@media (prefers-color-scheme: dark)": { fill: "white" }
                  }
                }
              },
              jsx(require("./icons/email"))
            )
          )
      ),
      config.patreon && jsx(Patreon, { name: config.patreon })
    )
  );
}

module.exports = HomePage;
