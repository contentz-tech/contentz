const { jsx } = require("@emotion/core");

exports.Table = props =>
  jsx(
    "table",
    Object.assign({}, props, {
      css: {
        fontSize: "1em",
        width: "100%"
      }
    })
  );

exports.TH = props =>
  jsx(
    "th",
    Object.assign({}, props, {
      css: {
        padding: "5px",
        color: "#9b9b9b",
        fontStyle: "oblique",
        fontWeight: "normal",
        textAlign: "left"
      }
    })
  );

exports.TR = props =>
  jsx("tr", Object.assign({}, props, { css: { padding: "5px" } }));

exports.TD = props =>
  jsx("td", Object.assign({}, props, { css: { padding: "5px" } }));
