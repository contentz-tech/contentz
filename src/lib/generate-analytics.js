const { minify } = require("terser");

const { writeFile, makeDir } = require("./fs");

async function generateAnalytics(config) {
  await writeFile(
    "./public/load-analytics.js",
    minify(
      [
        "window.dataLayer = window.dataLayer || [];",
        "function gtag(){dataLayer.push(arguments);}",
        'gtag("js", new Date());',
        `gtag("config", "${config.analytics}");`
      ].join("\n")
    ).code
  );
}

async function generator(config) {
  if (!config.analytics) return;
  try {
    await makeDir("./public");
    await generateAnalytics(config);
  } finally {
    console.log("Analytics generated");
  }
}

module.exports = generator;
