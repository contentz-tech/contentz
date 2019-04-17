const matter = require("gray-matter");

const { readFile, exists } = require("./fs");

const defaultConfig = {
  title: "Just another Contentz site",
  description: "",
  language: "en",
  toc: false
};

let config = null;

function parsePackage(pkgRaw) {
  const pkg = JSON.parse(pkgRaw);
  let result = {};
  if (pkg.name) {
    result.title = pkg.name;
  }
  if (pkg.description) {
    result.description = pkg.description;
  }
  if (pkg.repository) {
    result.repository = pkg.repository;
  }
  if (pkg.contentz) {
    result = {
      ...result,
      ...pkg.contentz
    };
  }
  return result;
}

async function getConfig({ cache = true } = {}) {
  if (config && cache) return config;

  config = Object.assign({}, defaultConfig);

  if (await exists("./package.json")) {
    Object.assign(
      config,
      parsePackage(await readFile("./package.json", "utf8"))
    );
  }

  if (await exists("./config.yml")) {
    Object.assign(config, matter(await readFile("./config.yml", "utf8")).data);
  }

  return config;
}

module.exports = getConfig;
