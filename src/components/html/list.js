const { jsx } = require("@emotion/core");

exports.UL = props =>
  jsx(
    "ul",
    Object.assign({}, props, {
      role: "list",
      css: {
        fontSize: "1em",
        fontWeight: "normal",
        marginLeft: "-2rem",
        paddingLeft: "2rem",
        listStyleType: "square",
        "@media (max-width: 767px)": {
          marginLeft: 0,
          paddingLeft: "2rem"
        }
      }
    })
  );

exports.OL = props =>
  jsx(
    "ol",
    Object.assign({}, props, {
      role: "list",
      css: {
        fontSize: "1em",
        fontWeight: "normal",
        marginLeft: "-2rem",
        paddingLeft: "2rem",
        "@media (max-width: 767px)": {
          marginLeft: 0,
          paddingLeft: "2rem"
        }
      }
    })
  );

exports.LI = props =>
  jsx(
    "li",
    Object.assign({}, props, {
      role: "listitem",
      css: {
        lineHeight: "1.3"
      }
    })
  );

