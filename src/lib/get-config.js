const matter = require("gray-matter");

const { readFile } = require("./fs");

let config = {};

async function getConfig() {
  const configContent = await readFile("./config.yml", "utf8");
  config = matter(configContent).data;
  return config;
}

module.exports = getConfig;
