const { jsx } = require("@emotion/core");

function OpenGraph({ title, description }) {
  return jsx(
    "html",
    null,
    jsx(
      "head",
      null,
      jsx("meta", {
        httpEquiv: "Content-Type",
        content: "text/html; charset=utf-8"
      })
    ),
    jsx(
      "body",
      null,
      jsx(
        "div",
        {
          css: {
            height: "100vh",
            fontSize: "100px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            padding: "1em",
            boxSizing: "border-box",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
          }
        },
        jsx(
          "div",
          {
            id: "title",
            css: {
              fontWeight: "bold",
              letterSpacing: "-0.028em",
              margin: "1em 0"
            }
          },
          title
        ),
        jsx(
          "div",
          {
            id: "description",
            css: {
              fontWeight: 200,
              borderLeft: "3px solid black",
              boxSizing: "border-box",
              paddingLeft: "calc(0.5em - 3px)",
              margin: "-1em 0 1em -0.5em"
            }
          },
          description
        )
      )
    )
  );
}

module.exports = OpenGraph;
