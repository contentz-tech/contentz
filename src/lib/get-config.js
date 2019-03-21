const matter = require("gray-matter");

const { readFile, exists } = require("./fs");

const defaultConfig = {
  title: "Just another Contentz site",
  description: "",
  toc: false
};

let config = null;

async function getConfig() {
  if (config) return config;
  if (!(await exists("./config.yml"))) {
    config = { ...defaultConfig };
    return config;
  }
  const configContent = await readFile("./config.yml", "utf8");
  config = {
    ...defaultConfig,
    ...matter(configContent).data
  };
  return config;
}

module.exports = getConfig;
