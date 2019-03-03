const globby = require("globby");
const { readFile } = require("./fs");

const regex = ["./articles/**/*.mdx"];

async function getArticles() {
  const paths = await globby(regex);
  return await Promise.all(
    paths.map(async path => ({
      content: await readFile(path, "utf8"),
      path
    }))
  );
}

module.exports = getArticles;
