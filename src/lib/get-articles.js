const globby = require("globby");
const { readFile } = require("./fs");

// import updatedFiles from "./updated-files";

const regex = ["./articles/**/*.mdx"];

async function getArticles() {
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

module.exports = getArticles;
