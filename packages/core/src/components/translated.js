const { Fragment } = require("react");
const { jsx } = require("@emotion/core");
const { parse } = require("url");

const { Anchor } = require("./html/text");
const Card = require("./card");
const { useIntl } = require("./intl");

const isLocal = url => !parse(url).hostname;

exports.From = ({ lang, path, title }) => {
  const { messages } = useIntl();

  return jsx(
    Card,
    null,
    messages.translated.from,
    jsx(
      Anchor,
      {
        href: path,
        target: isLocal(path) ? "_self" : "_blank",
        rel: "canonical"
      },
      jsx("strong", { lang }, title)
    )
  );
};

exports.To = ({ translations }) => {
  const { messages } = useIntl();

  return jsx(
    Card,
    null,
    messages.translated.to,
    translations.map(({ path, lang }, index, { length }) => {
      const language = messages.languages[lang];
      if (!language) return null;
      const content = jsx(
        Anchor,
        {
          key: lang,
          href: path,
          target: isLocal(path) ? "_self" : "_blank",
          rel: "canonical"
        },
        language.nativeName
      );
      if (index === 0) return content;
      if (index === length - 1)
        return jsx(
          Fragment,
          { key: lang },
          messages.translated.lastSeparator,
          content
        );
      return jsx(
        Fragment,
        { key: lang },
        messages.translated.separator,
        content
      );
    })
  );
};
