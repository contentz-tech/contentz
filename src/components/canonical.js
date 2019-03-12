const { jsx } = require("@emotion/core");
const { parse } = require("url");

const { Anchor } = require("./html/text");
const Card = require("./card");
const { useIntl } = require("./intl");

function CanonicalURL({ value }) {
  const { messages } = useIntl();

  return jsx(
    Card,
    null,
    messages.canonicalUrl.copy,
    jsx(
      Anchor,
      { href: value, target: "_blank", rel: "canonical" },
      jsx("strong", null, parse(value).hostname)
    )
  );
}

module.exports = CanonicalURL;
