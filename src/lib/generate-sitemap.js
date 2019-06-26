const { makeDir, writeFile } = require("./fs");
const { checkCache } = require("./cache");

function formatURL(path) {
  return path.slice(1, path.length - 4) + "/";
}

async function generateSitemap(articles, pages, config) {
  // check for cache of all pages to render archive
  const caches = await Promise.all(
    articles.concat(pages).map(({ path, content }) => checkCache(path, content))
  );
  if (caches.reduce((prev, next) => next === prev, true)) return true;

  try {
    const urls = articles
      .map(article => {
        const path = formatURL(article.path);
        const priority =
          (100 -
            path.split("/").filter(section => section !== "").length * 15) /
          100;
        return { path, priority };
      })
      .concat(
        pages.map(page => {
          const path = formatURL(page.path).slice("/pages".length);
          const priority =
            (100 -
              path.split("/").filter(section => section !== "").length * 15) /
            100;
          return { path, priority };
        })
      )
      .concat([
        { path: "/", priority: 1 },
        { path: "/articles/", priority: 0.9 },
        config.hasLinks ? { path: "/links/", priority: 0.9 } : null
      ])
      .filter(path => path !== null)
      .sort((a, b) => {
        if (a.priority > b.priority) return -1;
        if (a.priority < b.priority) return 1;
        return 0;
      })
      .map(({ path, priority }) => {
        return `  <url>
    <loc>${config.domain}${path}</loc>
    <lastmod>${new Date().toJSON()}</lastmod>
    <priority>${priority}</priority>
  </url>`;
      })
      .join("\n");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${urls}
</urlset>`;

    await makeDir("./public");
    return await writeFile("./public/sitemap.xml", sitemap, "utf8");
  } finally {
    console.log("Sitemap Generated");
  }
}

module.exports = generateSitemap;
