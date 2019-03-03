const { makeDir, writeFile } = require("./fs");
const { checkCache } = require("./cache");
const getMeta = require("./get-meta");

function formatURL(path) {
  return path.slice(1, path.length - 4) + "/";
}

async function generateRSS(articles, config) {
  // check for cache of all pages to render archive
  const caches = await Promise.all(
    articles.map(article => checkCache(article.path, article.content))
  );
  if (caches.reduce((prev, next) => next === prev, true)) return true;

  try {
    const rss = articles
      .map(article => ({
        ...getMeta(article).data,
        path: formatURL(article.path)
      }))
      .map(article => {
        const link = config.domain + article.path;
        return `
      <entry>
        <id>${article.title}</id>
        <title>${article.title}</title>
        <link href="${link}"/>
        <updated>${article.date.toJSON()}</updated>
        <content type="xhtml">
          <div xmlns="http://www.w3.org/1999/xhtml">
            <p>${article.description}</p>
            <a href="${link}">Read Article</a>
          </div>
        </content>
        <author>
          <name>${config.title}</name>
          <email>${config.email}</email>
        </author>
      </entry>`;
      })
      .join("");

    const feed = `<?xml version="1.0" encoding="utf-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <title>${config.title} - Articles</title>
    <link href="${config.domain}" rel="self"/>
    <link href="${config.domain}"/>
    <updated>${Date.now()}</updated>
    <id>${config.domain}</id>
    <author>
      <name>${config.title}</name>
      <email>${config.email}</email>
    </author>${rss}
  </feed>`;

    await makeDir("./public");
    return await writeFile("./public/atom.xml", feed, "utf8");
  } finally {
    console.log("RSS Atom Feed Generated");
  }
}

module.exports = generateRSS;
