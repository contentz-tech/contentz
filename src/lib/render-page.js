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
    file.path.slice("./pages".length).replace(".mdx", ""),
    "/"
  );
  await makeDir(finalPath);
  await writeFile(
    join(finalPath, "index.html"),
    `<!DOCTYPE html>${file.content}`,
    "utf8"
  );
}

async function renderPage(page, config) {
  if (
    (await checkCache(page.path, page.content)) &&
    (await checkCache("config.yml", JSON.stringify(config)))
  )
    return true;

  let title = "";
  try {
    const metadata = getMeta(page);
    title = metadata.data.title;
    const content = await parseMDX(metadata.content);
    const file = await render(
      { ...page, ...metadata, content, path: page.path },
      config
    );
    await writeContent(file);
  } finally {
    console.log('Page rendered: "%s"', title);
  }
}

module.exports = renderPage;
