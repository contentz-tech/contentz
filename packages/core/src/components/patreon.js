const { jsx } = require("@emotion/core");

const { Anchor } = require("./html/text");
const { useIntl } = require("./intl");

function Patreon({ name }) {
  const { messages } = useIntl();
  return jsx(
    "p",
    { css: { margin: 0 } },
    messages.patreon.first,
    jsx("br"),
    jsx(Anchor, { href: `https://patreon.com/${name}` }, messages.patreon.link)
  );
}

module.exports = Patreon;
