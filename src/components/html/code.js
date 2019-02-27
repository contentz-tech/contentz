const { jsx } = require("@emotion/core");

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

exports.Pre = props =>
  jsx(
    "pre",
    Object.assign({}, props, {
      css: {
        border: "1px solid black",
        padding: "1rem calc(2rem - 1px)",
        margin: "1rem -2rem",
        overflowX: "scroll",
        code: {
          color: "black",
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
