const del = require("del");

const getArticles = require("./lib/get-articles");
const getPages = require("./lib/get-pages");
const getConfig = require("./lib/get-config");
const getSlides = require("./lib/get-slides");
const getLinks = require("./lib/get-links");
const renderArticle = require("./lib/render-article");
const renderHome = require("./lib/render-home");
const renderArchive = require("./lib/render-archive");
const renderPage = require("./lib/render-page");
const renderSlide = require("./lib/render-slide");
const renderSlides = require("./lib/render-slides");
const renderLinks = require("./lib/render-links");
const renderError = require("./lib/render-error");
const generateRSS = require("./lib/generate-rss");
const generateSitemap = require("./lib/generate-sitemap");
const generateRobotsTXT = require("./lib/generate-robots-txt");
const statics = require("./lib/statics");
const generateSW = require("./lib/generate-sw");
const generateAnalytics = require("./lib/generate-analytics");
const { writeCache } = require("./lib/cache");

async function main() {
  console.log("Preparing to start.");
  try {
    const [config, articles, pages, links, slides] = await Promise.all([
      getConfig(),
      getArticles(),
      getPages(),
      getLinks(),
      getSlides()
    ]);
    if (links.length > 0) {
      config.hasLinks = true;
    }
    if (articles.length > 0) {
      config.hasArticles = true;
    }
    if (slides.length > 0) {
      config.hasSlides = true;
    }
    if (config.incremental !== false) {
      config.incremental = true;
    }
    console.log("Starting rendering process...");
    await Promise.all([
      statics(),
      ...articles.map(article => renderArticle(article, config)),
      ...pages.map(page => renderPage(page, config)),
      ...slides.map(slide => renderSlide(slide, config)),
      renderHome(config),
      renderArchive(config, articles),
      renderSlides(config, slides),
      renderLinks(links, config),
      renderError(config),
      generateRSS(articles, config),
      generateSitemap(articles, pages, config),
      generateRobotsTXT(articles, pages),
      generateSW(config),
      generateAnalytics(config)
    ]);
    await Promise.all([
      del("./.tmp/**"),
      writeCache([
        ...articles,
        ...pages,
        { path: "version", content: require("../package.json").version },
        { path: "config.yml", content: JSON.stringify(config) },
        { path: "sw", content: `${config.sw !== false}` },
        { path: "links.yml", content: JSON.stringify(links) }
      ])
    ]);
    console.log("Done! Your website has been successfully built.");
  } catch (error) {
    console.error(
      "Error building your website. Check the error below for more information."
    );
    console.error(error);
    process.exit(1);
  }
}

module.exports = main;
