const { renderStylesToString } = require("emotion-server");
const { jsx } = require("@emotion/core");
const ReactDOMServer = require("react-dom/server");
const { join } = require("path");

const { makeDir, writeFile } = require("./fs");
const { checkCache } = require("./cache");
const getMeta = require("./get-meta");

const ArchivePage = require("../components/archive");
const Document = require("../components/document");

function formatURL(path) {
  return path.slice(1, path.length - 4) + "/";
}

async function writeContent(html) {
  const finalPath = join(process.cwd(), "./public", "/articles", "/");
  await makeDir(finalPath);
  await writeFile(join(finalPath, "index.html"), html, "utf8");
}

async function render(config, articles) {
  if (!config.hasArticles) return;

  // check for cache of all pages to render archive
  const caches = await Promise.all(
    articles.map(article => checkCache(article.path, article.content))
  );
  if (
    caches.reduce((prev, next) => next === prev, true) &&
    (await checkCache("config.yml", JSON.stringify(config)))
  )
    return true;

  try {
    const links = articles.map(article => formatURL(article.path));
    const metadatas = articles.map(article => getMeta(article).data);

    const html = renderStylesToString(
      ReactDOMServer.renderToStaticMarkup(
        jsx(
          Document,
          { config, links, path: "./articles.mdx" },
          jsx(ArchivePage, { config, articles: metadatas })
        )
      )
    );
    await writeContent(html);
  } finally {
    console.log("Render completed: Archive");
  }
}

module.exports = render;
