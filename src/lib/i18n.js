const getConfig = require("./get-config");

const en = require("../messages/en.json");
const es = require("../messages/es.json");

let messages = null;

async function i18n() {
  if (messages) return messages;
  const config = await getConfig();

  const language = config.language || config.lang;

  switch (language) {
    case "es": {
      messages = es;
      return es;
    }
    default: {
      messages = en;
      return en;
    }
  }
}

module.exports = i18n;
