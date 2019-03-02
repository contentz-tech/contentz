const getSHA = require("./get-sha");

const getConfig = require("./get-config");
const { exists, readFile, writeFile, makeDir } = require("./fs");

let savedCache = null;

async function checkCache(path, content) {
  if ((await getConfig()).incremental === false) return false;
  const cache = await readCache();
  return (
    cache[path] === getSHA(content) &&
    cache.version === getSHA(require("../../package.json").version)
  );
}
exports.checkCache = checkCache;

async function readCache() {
  if (savedCache !== null) return savedCache;
  if (await exists("./.cache/files.json")) {
    const cache = await readFile("./.cache/files.json", "utf8");
    savedCache = JSON.parse(cache);
    return savedCache;
  }
  savedCache = {};
  return {};
}
exports.readCache = readCache;

async function writeCache(files) {
  try {
    await makeDir("./.cache/");
    const file = files
      .map(({ content, path }) => {
        return {
          path,
          sha: getSHA(content)
        };
      })
      .reduce((cache, file) => {
        return {
          ...cache,
          [file.path]: file.sha
        };
      }, {});
    await writeFile("./.cache/files.json", JSON.stringify(file));
  } finally {
    console.log("Cache of files created!");
  }
}
exports.writeCache = writeCache;
