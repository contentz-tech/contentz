const { join } = require("path");

const render = require("./render");
const { makeDir, writeFile } = require("./fs");
const { checkCache } = require("./cache");
const getMeta = require("./get-meta");
const parseMDX = require("./parse-mdx");

async function writeContent(file) {
  const finalPath = join(
    process.cwd(),
    "./public",
    file.path.replace(".mdx", ""),
    "/"
  );
  await makeDir(finalPath);
  await writeFile(
    join(finalPath, "index.html"),
    `<!DOCTYPE html>${file.content}`,
    "utf8"
  );
}

async function renderArticle(article, config) {
  if (
    (await checkCache(article.path, article.content)) &&
    (await checkCache("config.yml", JSON.stringify(config)))
  ) {
    return;
  }

  let title = "";
  try {
    const metadata = getMeta(article);
    title = metadata.data.title;
    const content = await parseMDX(metadata.content);
    const file = await render(
      { ...article, ...metadata, content, path: article.path },
      config
    );
    await writeContent(file);
  } finally {
    console.log('Article rendered: "%s"', title);
  }
}

module.exports = renderArticle;
