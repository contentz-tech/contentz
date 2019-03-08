const getConfig = require("./get-config");

const en = require("../messages/en.json");

let messages = null;

async function i18n() {
  if (messages) return messages;
  const config = await getConfig();

  const language = config.language || config.lang;

  switch (language) {
    default: {
      messages = en;
      return en;
    }
  }
}

module.exports = i18n;
