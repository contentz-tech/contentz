const { jsx } = require("@emotion/core");

function Card(props) {
  return jsx("div", Object.assign({}, props, {
    css: {
      boxShadow: "rgba(0, 0, 0, 0.12) 0px 2px 5px 0px",
      backgroundColor: "white",
      backgroundImage: "radial-gradient( circle, #d7d7d7, #d7d7d7 1px, #fff 1px, #fff )",
      backgroundSize: "28px 28px",
      borderRadius: "5px",
      transition: "all 0.2s ease 0s",
      userSelect: "none",
      margin: "0 -2em 3em",
      padding: "1em 2em",
      "@media (prefers-color-scheme: dark)": {
        backgroundColor: "#151515",
        backgroundImage: "radial-gradient(circle, #3a3a3a, #3a3a3a 1px, #151515 1px, #151515 )",
        boxShadow: "rgba(255, 255, 255, 0.12) 0px 2px 5px 0px",
        color: "white"
      },
      "@media (max-width: 720px)": {
        boxShadow: "none",
        borderRadius: 0,
        margin: 0,
        padding: "1em 0.5em"
      }
    }
  }))
}

module.exports = Card;
