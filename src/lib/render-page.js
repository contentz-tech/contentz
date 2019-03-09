const mdx = require("@mdx-js/mdx");
const buble = require("buble");
const { join } = require("path");

const render = require("./render");
const { makeDir, writeFile } = require("./fs");
const { checkCache } = require("./cache");
const getMeta = require("./get-meta");

async function parseMDX(content) {
  const source = await mdx(content);

  return buble.transform(
    [
      'const React = require("react");',
      'const { jsx, css } = require("@emotion/core");',
      'const { MDXTag } = require("@mdx-js/tag");',
      'const Video = require("contentz/src/components/video.js");',
      source.replace("export default ", "\n"),
      "module.exports = MDXContent;"
    ].join("\n"),
    {
      target: { node: process.version.slice(1).split(".")[0] },
      jsx: "jsx"
    }
  );
}

async function writeContent(file) {
  const finalPath = join(
    process.cwd(),
    "./public",
    file.path.slice("./pages".length).replace(".mdx", ""),
    "/"
  );
  await makeDir(finalPath);
  await writeFile(join(finalPath, "index.html"), `<!DOCTYPE html>${file.content}`, "utf8");
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
    const file = await render({ ...page, ...metadata, content, path: page.path }, config);
    await writeContent(file);
  } finally {
    console.log('Page rendered: "%s"', title);
  }
}

module.exports = renderPage;
