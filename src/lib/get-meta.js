const matter = require("gray-matter");

const cache = new Map();

function getMeta(file) {
  if (cache.has(file.path)) return cache.get(file.path);
  const extracted = matter(file.content);
  const data = Object.assign(
    extracted.data,
    !extracted.data.date
      ? { date: new Date() }
      : !(extracted.data.date instanceof Date)
      ? { date: new Date(extracted.data.date) }
      : { date: extracted.data.date },
    extracted.data.tags && typeof extracted.data.tags === "string"
      ? {
          tags: extracted.data.tags.split(/,\s?/)
        }
      : {}
  );
  cache.set(file.path, { data, content: extracted.content });
  return { data, content: extracted.content };
}

module.exports = getMeta;
