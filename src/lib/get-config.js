const matter = require("gray-matter");

const { readFile } = require("./fs");

async function getConfig() {
  const config = await readFile("./config.yml", "utf8");
  return matter(config).data;
}

module.exports = getConfig;
