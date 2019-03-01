const { minify } = require("terser");
const del = require("del");

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

const unregister = minify(
  [
    'if ("serviceWorker" in navigator) {',
    '  window.addEventListener("load", () => {',
    "    navigator.serviceWorker.getRegistrations().then(registrations => {",
    "      registrations.forEach(registration => registration.unregister());",
    "    })",
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
    "    context => location.origin && context.url.origin && context.url.pathname !== '/load-sw.js' && context.url.pathname !== '/sw.js',",
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

async function generateUnregister() {
  if (await exists("./public/unload-sw.js")) return;
  await writeFile("./public/unload-sw.js", unregister);
  unregister;
}

async function generateSW() {
  // if (await exists("./public/sw.js")) return;
  await writeFile("./public/sw.js", sw);
}

async function generator(config) {
  if (config.sw === false || config.sw === "false") {
    try {
      return await Promise.all([
        await del(["./public/sw.js", "./public/load-sw.js"]),
        await generateUnregister()
      ]);
    } finally {
      console.log("Service Worker unregister generated");
    }
  }
  try {
    await makeDir("./public");
    await Promise.all([generateRegister(), generateSW()]);
  } finally {
    console.log("Service Worker automatically generated");
  }
}

module.exports = generator;
