const { Fragment } = require("react");
const { jsx } = require("@emotion/core");
const format = require("date-fns/format");

const { Title, Description } = require("./lead");
const Header = require("./header");

function LinksPage({ config = {}, links = [] } = {}) {
  return jsx(
    Fragment,
    null,
    jsx(Header, { ...config, target: "/" }),
    jsx(
      "section",
      {
        css: {
          margin: "0 auto",
          maxWidth: "50em",
          "@media (max-width: 50em)": {
            boxSizing: "border-box",
            padding: "0 1.5em"
          }
        }
      },
      jsx(Title, null, "Shared Links"),
      jsx(
        "ul",
        {
          css: {
            listStyleType: "none",
            paddingLeft: 0
          }
        },
        links.map(link =>
          jsx(
            "li",
            {
              key: JSON.stringify(link),
              css: {
                margin: "1em 0",
                fontSize: "1.25em",
                display: "grid",
                gridTemplateColumns: "1fr 3fr",
                gridTemplateRows: "2",
                gridTemplateAreas: '"date title" ". description"',
                "@media (max-width: 50em) and (orientation: landscape)": {
                  gridTemplateColumns: "1fr auto",
                  gridTemplateRows: "auto auto",
                  gridTemplateAreas: '"title date" "description description"'
                },
                "@media (max-width: 50em) and (orientation: portrait)": {
                  gridTemplateColumns: "auto",
                  gridTemplateRows: "auto auto auto",
                  gridTemplateAreas: '"title" "date" "description"'
                }
              }
            },
            link.date &&
              jsx(
                "time",
                {
                  dateTime: link.date.toJSON(),
                  css: {
                    fontWeight: "200",
                    marginRight: "1em",
                    gridArea: "date",
                    textAlign: "right",
                    "@media (max-width: 50em) and (orientation: landscape)": {
                      fontSize: "0.9em",
                      marginRight: "0",
                      marginLeft: "1em"
                    },
                    "@media (max-width: 50em) and (orientation: portrait)": {
                      display: "none",
                      marginRight: "0",
                      marginTop: "0.5em"
                    }
                  }
                },
                format(link.date, "MMMM DD, YYYY")
              ),
            jsx(
              "h2",
              { css: { gridArea: "title", margin: 0, fontSize: "1em" } },
              jsx(
                "a",
                {
                  href: link.url,
                  css: {
                    color: "black",
                    "@media (prefers-color-scheme: dark)": { color: "white" }
                  }
                },
                link.title
              )
            ),
            link.comment &&
              jsx("p", { css: { gridArea: "description" } }, link.comment)
          )
        )
      )
    )
  );
}

module.exports = LinksPage;
