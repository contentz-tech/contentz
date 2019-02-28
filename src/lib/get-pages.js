const fs = require("fs");
const globby = require("globby");
const { promisify } = require("util");

// import updatedFiles from "./updated-files";

const regex = ["./pages/**/*.mdx", "!./pages/index.mdx", "!./pages/articles.mdx"];
const readFile = promisify(fs.readFile);

async function getPages() {
  const paths = await globby(regex);
  // const updated = await updatedFiles();
  // filter somehow
  return await Promise.all(
    paths.map(async path => ({
      content: await readFile(path, "utf8"),
      path
    }))
  );
}

module.exports = getPages;
