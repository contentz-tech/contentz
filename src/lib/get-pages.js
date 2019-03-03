const globby = require("globby");

const regex = [
  "./pages/**/*.mdx",
  "!./pages/index.mdx",
  "!./pages/articles.mdx"
];
const { readFile } = require("./fs");

async function getPages() {
  const paths = await globby(regex);
  return await Promise.all(
    paths.map(async path => ({
      content: await readFile(path, "utf8"),
      path
    }))
  );
}

module.exports = getPages;
