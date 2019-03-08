const { renderToStaticNodeStream } = require("react-dom/server");
const { renderStylesToNodeStream } = require("emotion-server");
const { jsx } = require("@emotion/core");
const getHrefs = require("get-hrefs");
const parseURL = require("parse-url");
const { join } = require("path");

const Layout = require("../components/layout");
const Document = require("../components/document");
const { IntlProvider } = require("../components/i18n");

const { writeFile, makeDir } = require("./fs");
const i18n = require("./i18n");

const isLocalURL = url => !parseURL(url).resource;

function renderContent(ui) {
  return new Promise(resolve => {
    let html = "";
    const stream = renderToStaticNodeStream(ui).pipe(
      renderStylesToNodeStream()
    );
    stream.on("data", chunk => {
      html += chunk;
    });
    stream.on("end", () => {
      resolve(html);
    });
  });
}

async function render(article, config) {
  const tmpPath = join("./.tmp", article.path).replace("mdx", "js");

  await makeDir(tmpPath.slice(0, tmpPath.lastIndexOf("/") + 1));

  await writeFile(tmpPath, article.content.code, "utf8");

  const Component = require(join(process.cwd(), tmpPath));

  const messages = await i18n();

  const content = await renderContent(
    jsx(
      IntlProvider,
      { locale: config.language || config.lang || "en", messages },
      jsx(Layout, { ...article, config, Component })
    )
  );

  const links = getHrefs(content).filter(isLocalURL);

  const html = await renderContent(
    jsx(
      IntlProvider,
      { locale: config.language || config.lang || "en", messages },
      jsx(Document, { ...article, config, links, content })
    )
  );

  return { content: html, path: article.path };
}

module.exports = render;
