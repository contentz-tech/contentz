const matter = require("gray-matter");

const { readFile } = require("./fs");

const defaultConfig = {
  title: "Just another Contentz site"
};

let config = null;

async function getConfig() {
  if (config) return config;
  const configContent = await readFile("./config.yml", "utf8");
  config = {
    ...defaultConfig,
    ...matter(configContent).data
  };
  return config;
}

module.exports = getConfig;
