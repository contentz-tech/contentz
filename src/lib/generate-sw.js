const { minify } = require("terser");

const { writeFile, makeDir, exists } = require("./fs");

const register = minify(
  [
    'if ("serviceWorker" in navigator) {',
    '  window.addEventListener("load", () => {',
    '    navigator.serviceWorker.register("/sw.js");',
    "  });",
    "}"
  ].join("\n")
).code;

const sw = minify(
  [
    "importScripts(",
    '  "https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js"',
    ");",
    "",
    "if (workbox) {",
    "  workbox.routing.registerRoute(",
    "    context => context.url.pathname !== '/load-sw.js' && context.url.pathname !== '/sw.js',",
    "    new workbox.strategies.NetworkFirst()",
    "  );",
    "}",
    ""
  ].join("\n")
).code;

async function generateRegister() {
  if (await exists("./public/load-sw.js")) return;
  await writeFile("./public/load-sw.js", register);
}

async function generateSW() {
  // if (await exists("./public/sw.js")) return;
  await writeFile("./public/sw.js", sw);
}

async function generator() {
  try {
    await makeDir("./public");
    await Promise.all([generateRegister(), generateSW()]);
  } finally {
    console.log("Service Worker automatically generated");
  }
}

module.exports = generator;
