const { jsx } = require("@emotion/core");

const { Anchor } = require("./html/text");

function Patreon(props) {
  return jsx(
    "p",
    { css: { margin: 0 } },
    "Do you like my content?",
    jsx("br"),
    jsx(
      Anchor,
      { href: `https://patreon.com/${props.name}` },
      "Become a Patreon and help me continue writing!"
    )
  );
}

module.exports = Patreon;
