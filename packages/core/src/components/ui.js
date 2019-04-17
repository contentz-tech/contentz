const { jsx } = require("@emotion/core");

const { H1, H2, H3, H4, H5, H6 } = require("./html/heading");
const { P, Blockquote, Anchor } = require("./html/text");
const { Image, Figure } = require("./html/media");
const { UL, OL, LI } = require("./html/list");
const { Table, TR, TH, TD, THead } = require("./html/table");
const { Code, Pre } = require("./html/code");
const FileTree = require("./file-tree");

module.exports = {
  wrapper: props => jsx("article", props),
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  img: Image,
  figure: Figure,
  ul: UL,
  ol: OL,
  li: LI,
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
    return jsx(Pre, props);
  },
  inlineCode: Code,
  a: Anchor,
  p: P,
  blockquote: Blockquote,
  table: Table,
  th: TH,
  tr: TR,
  td: TD,
  thead: THead
};
