const { jsx } = require("@emotion/core");

const { Anchor } = require("./html/text");
const Card = require("./card");
const { useIntl } = require("./intl");

function ReadNext({ title, path, description }) {
  const { messages } = useIntl();

  return jsx(
    Card,
    null,
    jsx(
      "h6",
      {
        css: {
          fontSize: "1em",
          margin: 0,
          marginTop: "0.75rem"
        }
      },
      messages.readNext.copy,
      jsx(Anchor, { href: path }, title)
    ),
    jsx(
      "p",
      {
        css: {
          marginBottom: "0.75rem",
          fontSize: "0.8em"
        }
      },
      description
    )
  );
}

module.exports = ReadNext;
