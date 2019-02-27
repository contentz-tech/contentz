const { jsx } = require("@emotion/core");

exports.Image = props =>
  jsx(
    "img",
    Object.assign({}, props, {
      css: {
        maxWidth: "100%",
        verticalAlign: "top"
      }
    })
  );

exports.Figure = props =>
  jsx(
    "figure",
    Object.assign({}, props, {
      css: {
        fontSize: 0,
        textAlign: "center",
        margin: 0,
        width: "100%"
      }
    })
  );

exports.FigCaption = props =>
  jsx(
    "figcaption",
    Object.assign({
      css: {
        color: "#9b9b9b",
        fontSize: "0.9rem"
      }
    })
  );
