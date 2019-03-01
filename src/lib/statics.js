const copy = require("cpy");
const { exists, makeDir } = require("./fs");

async function static() {
  if (await exists("./static/")) {
    try {
      await makeDir("./public/static/");
      await copy("./static/", "./public/", { parents: true });
    } finally {
      console.log("Static files copied");
    }
  }
}

module.exports = static;
