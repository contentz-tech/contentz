const { Fragment } = require("react");
const { jsx } = require("@emotion/core");
const { H1, H2, H3, H4, H5, H6 } = require("./html/heading");
const { P, Blockquote, Anchor } = require("./html/text");
const { Image, Figure } = require("./html/media");
const { Code, Pre } = require("./html/code");
const FileTree = require("./file-tree");

const ui = {
  wrapper: props => jsx("article", { ...props, css: { fontSize: "1.5vw" } }),
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  img: Image,
  figure: Figure,
  a: Anchor,
  p: P,
  blockquote: Blockquote,
  code: props => {
    switch (props.className) {
      case "language-file-tree": {
        return jsx(FileTree, props);
      }
      default: {
        return jsx(Code, props);
      }
    }
  },
  pre: props => {
    if (props.children.props.props.className === "language-file-tree")
      return props.children;
    return jsx(Pre, { heightLimit: true, ...props });
  }
};

function Slide({ data, Component, totalSlides }) {
  if (!data.title) throw new Error("Slide title is required!");

  return jsx(
    Fragment,
    null,
    jsx(
      "section",
      {
        id: "slide",
        "data-total": totalSlides,
        css: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%"
        }
      },
      jsx(Component, { components: ui })
    ),
    jsx("script", { src: "/slide.js" })
  );
}

module.exports = Slide;
