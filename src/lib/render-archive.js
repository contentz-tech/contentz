const { renderStylesToString } = require("emotion-server");
const { jsx } = require("@emotion/core");
const ReactDOMServer = require("react-dom/server");
const matter = require("gray-matter");
const { join } = require("path");

const { makeDir, writeFile } = require("./fs");

const ArchivePage = require("../components/archive");
const Document = require("../components/document");

function formatURL(path) {
  return path.slice(1, path.length - 4) + "/";
}

function extractMetadata(article) {
  const extracted = matter(article.content);
  return Object.assign(
    extracted.data,
    { path: formatURL(article.path) },
    extracted.data.tags && typeof extracted.data.tags === "string"
      ? {
          tags: extracted.data.tags.split(/,\s?/)
        }
      : {}
  );
}

async function writeContent(html) {
  const finalPath = join(process.cwd(), "./public", "/articles", "/");
  await makeDir(finalPath);
  await writeFile(join(finalPath, "index.html"), html, "utf8");
}

async function render(config, articles) {
  if (!config.hasArticles) return;
  try {
    const links = articles.map(article => formatURL(article.path));
    const metadatas = articles.map(article => extractMetadata(article));
  
    const html = renderStylesToString(
      ReactDOMServer.renderToStaticMarkup(
        jsx(
          Document,
          { config, links },
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
