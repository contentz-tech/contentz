const { jsx } = require("@emotion/core");

exports.H1 = props =>
  jsx(
    "h1",
    Object.assign({}, props, {
      css: {
        fontSize: "2.25em",
        fontWeight: "normal",
        letterSpacing: "-0.028em",
        margin: "1em 0"
      }
    })
  );

exports.H2 = props =>
  jsx(
    "h2",
    Object.assign({}, props, {
      css: {
        fontSize: "2em",
        fontWeight: "normal",
        margin: "1em 0 0.25em"
      }
    })
  );

exports.H3 = props =>
  jsx(
    "h3",
    Object.assign({}, props, {
      css: {
        fontSize: "1.75em",
        fontWeight: "normal",
        margin: "1em 0 0.25em"
      }
    })
  );

exports.H4 = props =>
  jsx(
    "h4",
    Object.assign({}, props, {
      css: {
        fontSize: "1.5em",
        fontWeight: "normal",
        margin: "1em 0 0.25em"
      }
    })
  );

exports.H5 = props =>
  jsx(
    "h5",
    Object.assign({}, props, {
      css: {
        fontSize: "1.25em",
        fontWeight: "normal",
        margin: "1em 0 0.25em"
      }
    })
  );

exports.H6 = props =>
  jsx(
    "h6",
    Object.assign({}, props, {
      css: {
        fontSize: "1.125em",
        fontWeight: "normal",
        margin: "1em 0 0.25em"
      }
    })
  );
