const { jsx } = require("@emotion/core");

function Card({ selectable, ...props }) {
  return jsx(
    "div",
    Object.assign({}, props, {
      css: {
        boxShadow: "rgba(0, 0, 0, 0.12) 0px 2px 5px 0px",
        backgroundColor: "white",
        borderRadius: "5px",
        transition: "all 0.2s ease 0s",
        userSelect: selectable ? "text" : "none",
        margin: "1.5em -2em 3em",
        padding: "1em 2em",
        "@media (prefers-color-scheme: dark)": {
          backgroundColor: "#151515",
          color: "white"
        },
        "@media (max-width: 720px)": {
          boxShadow: "none",
          borderRadius: 0,
          margin: 0,
          padding: "1em 0.5em"
        }
      }
    })
  );
}

module.exports = Card;
