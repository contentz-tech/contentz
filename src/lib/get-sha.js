const crypto = require("crypto");

const cache = new Map();

function getSHA(file) {
  if (cache.has(file)) return cache.get(file);
  const shasum = crypto.createHash("sha1");
  shasum.update(file);
  const sha = shasum.digest("hex");
  cache.set(file, sha);
  return sha;
}

module.exports = getSHA;
