const { renderStylesToString } = require("emotion-server");
const { jsx } = require("@emotion/core");
const ReactDOMServer = require("react-dom/server");
const { join } = require("path");

const { makeDir, writeFile } = require("./fs");
const { checkCache } = require("./cache");
const i18n = require("./i18n");

const HomePage = require("../components/home");
const Document = require("../components/document");
const { IntlProvider } = require("../components/intl");

async function writeContent(html) {
  const finalPath = join(process.cwd(), "./public", "/");
  await makeDir(finalPath);
  await writeFile(join(finalPath, "index.html"), html, "utf8");
}

async function render(config) {
  if (await checkCache("config.yml", JSON.stringify(config))) return true;
  const messages = await i18n();
  try {
    const html = renderStylesToString(
      ReactDOMServer.renderToStaticMarkup(
        jsx(
          IntlProvider,
          { locale: config.language || config.lang || "en", messages },
          jsx(
            Document,
            { data: { published: true }, config, messages, path: "home.mdx" },
            jsx(HomePage, { config, messages })
          )
        )
      )
    );
    await writeContent(`<!DOCTYPE html>${html}`);
  } finally {
    console.log("Render completed: Home");
  }
}

module.exports = render;
