const getConfig = require("./get-config");

const en = require("../messages/en.json");
const es = require("../messages/es.json");

const languages = require("../data/languages.json");

let messages = null;

async function i18n() {
  if (messages) return messages;
  const config = await getConfig();

  const language = config.language || config.lang;

  switch (language) {
    case "es": {
      messages = { ...es, languages };
      return messages;
    }
    case "en": {
      messages = { ...en, languages };
      return messages;
    }
    default: {
      console.warn(
        "Language %s not supported, falling back to English, do you like to add support for it?",
        language
      );
      console.warn(
        "Add it on https://github.com/sergiodxa/contentz/tree/master/src/messages and https://github.com/sergiodxa/contentz/blob/master/src/lib/i18n.js"
      );
      messages = { ...en, languages };
      return messages;
    }
  }
}

module.exports = i18n;
