const { renderStylesToString } = require("emotion-server");
const { jsx } = require("@emotion/core");
const ReactDOMServer = require("react-dom/server");
const { join } = require("path");

const { makeDir, writeFile } = require("./fs");
const { checkCache } = require("./cache");
const i18n = require("./i18n");

const LinksPage = require("../components/links");
const Document = require("../components/document");
const { IntlProvider } = require("../components/intl");

async function writeContent(html) {
  const finalPath = join(process.cwd(), "./public", "/links", "/");
  await makeDir(finalPath);
  await writeFile(join(finalPath, "index.html"), html, "utf8");
}

async function render(links, config) {
  if (!config.hasLinks) return;
  if (
    (await checkCache("links.yml", JSON.stringify(links))) &&
    (await checkCache("config.yml", JSON.stringify(config)))
  ) {
    return true;
  }

  const messages = await i18n();

  try {
    const html = renderStylesToString(
      ReactDOMServer.renderToStaticMarkup(
        jsx(
          IntlProvider,
          { locale: config.language || config.lang || "en", messages },
          jsx(
            Document,
            { data: { published: true }, messages, config, path: "links.mdx" },
            jsx(LinksPage, { messages, config, links })
          )
        )
      )
    );
    await writeContent(`<!DOCTYPE html>${html}`);
  } finally {
    console.log("Render completed: Links");
  }
}

module.exports = render;
