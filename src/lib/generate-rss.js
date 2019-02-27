const matter = require("gray-matter");

const { makeDir, writeFile } = require("./fs");

function formatURL(path) {
  return path.slice(1, path.length - 4) + "/";
}

function extractMetadata(article) {
  const extracted = matter(article.content);
  return Object.assign(
    extracted.data,
    { path: formatURL(article.path) },
    extracted.data.tags && typeof extracted.data.tags === "string"
      ? {
          tags: extracted.data.tags.split(/,\s?/)
        }
      : {}
  );
}

async function generateRSS(articles, config) {
  console.log("Generating RSS Atom feed");
  const rss = articles
    .map(extractMetadata)
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
}

module.exports = generateRSS;
