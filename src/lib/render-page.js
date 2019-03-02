const matter = require("gray-matter");
const mdx = require("@mdx-js/mdx");
const buble = require("buble");
const { join } = require("path");

const render = require("./render");
const { makeDir, writeFile } = require("./fs");
const { checkCache } = require("./cache");

function extractMetadata(content) {
  const extracted = matter(content);
  return Object.assign(
    extracted,
    extracted.data.tags && typeof extracted.data.tags === "string"
      ? {
          data: {
            ...extracted.data,
            tags: extracted.data.tags.split(/,\s?/)
          }
        }
      : {}
  );
}

async function parseMDX(content) {
  const source = await mdx(content);

  return buble.transform(
    [
      'const React = require("react");',
      'const { jsx, css } = require("@emotion/core");',
      'const { MDXTag } = require("@mdx-js/tag");',
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
  await writeFile(join(finalPath, "index.html"), file.content, "utf8");
}

async function renderPage(page, config) {
  if (await checkCache(page.path, page.content)) return true;

  let title = "";
  try {
    const metadata = extractMetadata(page.content);
    title = metadata.data.title;
    const content = await parseMDX(metadata.content);
    const file = await render({ ...page, ...metadata, content }, config);
    await writeContent(file);
  } finally {
    console.log('Page rendered: "%s"', title);
  }
}

module.exports = renderPage;
