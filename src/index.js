const getArticles = require("./lib/get-articles");
const getPages = require("./lib/get-pages");
const getConfig = require("./lib/get-config");
const renderArticle = require("./lib/render-article");
const renderHome = require("./lib/render-home");
const renderArchive = require("./lib/render-archive");
const renderPage = require("./lib/render-page");
const generateRSS = require("./lib/generate-rss");

async function main() {
  console.log("Getting configuration and list of articles");
  const [config, articles, pages] = await Promise.all([getConfig(), getArticles(), getPages()]);
  console.log("Starting rendering process...");
  await Promise.all([
    ...articles.map(article => renderArticle(article, config)),
    ...pages.map(article => renderPage(article, config)),
    renderHome(config),
    renderArchive(config, articles),
    generateRSS(articles, config)
  ]);
}

main()
  .then(() => console.log("Done! Your website has been succesfully built."))
  .catch(error => {
    console.error("Error building your website.");
    console.error(error);
    process.exit(1);
  });
