const { jsx } = require("@emotion/core");
const slugify = require("react-slugify").default;

exports.H1 = props =>
  jsx("h1", {
    css: {
      fontSize: "2.25em",
      fontWeight: "normal",
      letterSpacing: "-0.028em",
      margin: "1em 0"
    },
    id: slugify(jsx("h1", props)),
    ...props
  });

exports.H2 = props =>
  jsx("h2", {
    css: {
      fontSize: "2em",
      fontWeight: "normal",
      margin: "1em 0 0.25em"
    },
    id: slugify(jsx("h2", props)),
    ...props
  });

exports.H3 = props =>
  jsx("h3", {
    css: {
      fontSize: "1.75em",
      fontWeight: "normal",
      margin: "1em 0 0.25em"
    },
    id: slugify(jsx("h3", props)),
    ...props
  });

exports.H4 = props =>
  jsx("h4", {
    css: {
      fontSize: "1.5em",
      fontWeight: "normal",
      margin: "1em 0 0.25em"
    },
    id: slugify(jsx("h4", props)),
    ...props
  });

exports.H5 = props =>
  jsx("h5", {
    css: {
      fontSize: "1.25em",
      fontWeight: "normal",
      margin: "1em 0 0.25em"
    },
    id: slugify(jsx("h5", props)),
    ...props
  });

exports.H6 = props =>
  jsx("h6", {
    css: {
      fontSize: "1.125em",
      fontWeight: "normal",
      margin: "1em 0 0.25em"
    },
    id: slugify(jsx("h6", props)),
    ...props
  });
