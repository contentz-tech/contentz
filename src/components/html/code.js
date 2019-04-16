const { jsx } = require("@emotion/core");
const Card = require("../card");

exports.Code = props =>
  jsx(
    "code",
    Object.assign({}, props, {
      css: {
        color: "#f81ce5",
        fontFamily:
          "Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif",
        fontSize: "0.8em",
        whiteSpace: "pre-wrap",
        ":before": {
          content: "'`'"
        },
        ":after": {
          content: "'`'"
        }
      }
    })
  );

exports.Pre = ({ heightLimit = false, ...props }) =>
  jsx(
    Card,
    { selectable: true },
    jsx("pre", {
      ...props,
      css: {
        overflowX: "scroll",
        maxHeight: heightLimit ? "30vh" : "none",
        code: {
          color: "black",
          "@media (prefers-color-scheme: dark)": {
            color: "white"
          },
          ":before": {
            content: "''"
          },
          ":after": {
            content: "''"
          }
        }
      }
    })
  );
