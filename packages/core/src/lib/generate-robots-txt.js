const { makeDir, writeFile } = require("./fs");
const getMeta = require("./get-meta");

function formatURL(path) {
  return path.slice(1, path.length - 4) + "/";
}

async function generateRobotsTXT(articles, pages) {
  const disallowedContent = articles
    .concat(pages)
    .map(content => ({
      route: formatURL(content.path).slice("/pages".length),
      ...getMeta(content)
    }))
    .filter(({ data }) => data.published !== true)
    .map(({ route }) => `Disallow: ${route}`)
    .concat("Disallow: /404.html");

  const content = ["User-agent: *"]
    .concat(disallowedContent)
    .concat("Sitemap: /sitemap.xml")
    .join("\n");

  try {
    await makeDir("./public");
    await writeFile("./public/robots.txt", content, "utf8");
  } finally {
    console.log("Robots.txt Generated");
  }
}

module.exports = generateRobotsTXT;
