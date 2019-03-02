const { renderStylesToString } = require("emotion-server");
const { jsx } = require("@emotion/core");
const ReactDOMServer = require("react-dom/server");
const { join } = require("path");

const { makeDir, writeFile } = require("./fs");
const { checkCache } = require("./cache");

const LinksPage = require("../components/links");
const Document = require("../components/document");

async function writeContent(html) {
  const finalPath = join(process.cwd(), "./public", "/links", "/");
  await makeDir(finalPath);
  await writeFile(join(finalPath, "index.html"), html, "utf8");
}

async function render(links, config) {
  if (!config.hasLinks) return;
  if (await checkCache("links.yml", JSON.stringify(links))) return true;

  try {
    const html = renderStylesToString(
      ReactDOMServer.renderToStaticMarkup(
        jsx(Document, { config }, jsx(LinksPage, { config, links }))
      )
    );
    await writeContent(html);
  } finally {
    console.log("Render completed: Links");
  }
}

module.exports = render;
