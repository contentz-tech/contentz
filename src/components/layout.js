const { jsx } = require("@emotion/core");
const { MDXProvider } = require("@mdx-js/tag");

const ui = require("./ui");
const { Title, Description, Date } = require("./lead");

const Header = require("./header");
const Footer = require("./footer");

function Layout(props) {
  if (!props.data.title) throw new Error("Article title is required!");
  return jsx(
    "div",
    { css: { position: "relative" } },
    jsx(Header, { title: props.config.title }),
    jsx(
      "section",
      {
        css: {
          margin: "0 auto",
          maxWidth: "40em",
          width: "100%"
        }
      },
      jsx(Title, null, props.data.title),
      props.data.date && jsx(Date, { date: props.data.date }),
      props.data.description && jsx(Description, null, props.data.description),
      jsx(MDXProvider, { components: ui, ...props })
    ),
    jsx(Footer, {
      repository: props.config.repository,
      file: props.path || null
    })
  );
}

module.exports = Layout;
