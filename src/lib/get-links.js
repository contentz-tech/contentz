const matter = require("gray-matter");
const { readFile, exists } = require("./fs");

async function getLinks() {
  if (await exists("./links.yml")) {
    return matter(await readFile("./links.yml")).data;
  }
  return [];
}

module.exports = getLinks;
