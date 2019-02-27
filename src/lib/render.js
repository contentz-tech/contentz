const { renderToStaticNodeStream } = require("react-dom/server");
const { renderStylesToNodeStream } = require("emotion-server");
const { jsx } = require("@emotion/core");
const getHrefs = require("get-hrefs");
const parseURL = require("parse-url");
const { join } = require("path");
const del = require("del");

const Layout = require("../components/layout");
const Document = require("../components/document");

const { writeFile, makeDir } = require("./fs");

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

  const content = await renderContent(
    jsx(Layout, { ...article, config, Component })
  );

  await del("./.tmp/**");

  const links = getHrefs(content).filter(isLocalURL);

  const html = await renderContent(
    jsx(Document, { ...article, config, links, content })
  );

  return { content: html, path: article.path };
}

module.exports = render;
