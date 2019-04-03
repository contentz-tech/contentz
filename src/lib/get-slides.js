const globby = require("globby");
const { readFile } = require("./fs");

const regex = ["./slides/**/*.mdx"];

async function getSlides() {
  const paths = await globby(regex);
  return await Promise.all(
    paths.map(async path => ({
      content: await readFile(path, "utf8"),
      path
    }))
  );
}

module.exports = getSlides;
