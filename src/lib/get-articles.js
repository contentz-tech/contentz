const fs = require("fs");
const globby = require("globby");
const { promisify } = require("util");

// import updatedFiles from "./updated-files";

const regex = ["./articles/**/*.mdx"];
const readFile = promisify(fs.readFile);

/**
 * @typedef {{content: string, path: string}} Article
 */

/**
 * Read the list of articles to render and return the MDX content and the path of each one
 * @return {Article[]}
 */
async function readArticles() {
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

module.exports = readArticles;
