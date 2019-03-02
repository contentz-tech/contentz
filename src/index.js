const getArticles = require("./lib/get-articles");
const getPages = require("./lib/get-pages");
const getConfig = require("./lib/get-config");
const getLinks = require("./lib/get-links");
const renderArticle = require("./lib/render-article");
const renderHome = require("./lib/render-home");
const renderArchive = require("./lib/render-archive");
const renderPage = require("./lib/render-page");
const renderLinks = require("./lib/render-links");
const renderError = require("./lib/render-error");
const generateRSS = require("./lib/generate-rss");
const statics = require("./lib/statics");
const generateSW = require("./lib/generate-sw");
const { writeCache } = require("./lib/cache");

async function main() {
  console.log("Preparing to start.");
  const [config, articles, pages, links] = await Promise.all([
    getConfig(),
    getArticles(),
    getPages(),
    getLinks()
  ]);
  if (links.length > 0) {
    config.hasLinks = true;
  }
  if (articles.length > 0) {
    config.hasArticles = true;
  }
  console.log("Starting rendering process...");
  await Promise.all([
    statics(),
    ...articles.map(article => renderArticle(article, config)),
    ...pages.map(article => renderPage(article, config)),
    renderHome(config),
    renderArchive(config, articles),
    renderLinks(links, config),
    renderError(config),
    generateRSS(articles, config),
    generateSW(config)
  ]);
  await writeCache([
    ...articles,
    ...pages,
    { path: "version", content: require("../package.json").version },
    { path: "config.yml", content: JSON.stringify(config) },
    { path: "sw", content: `${config.sw !== false}` },
    { path: "links.yml", content: JSON.stringify(links) }
  ]);
}

main()
  .then(() => console.log("Done! Your website has been successfully built."))
  .catch(error => {
    console.error(
      "Error building your website. Check the error below for more information."
    );
    console.error(error);
    process.exit(1);
  });
