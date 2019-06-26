const { minify } = require("terser");
const del = require("del");

const { writeFile, makeDir } = require("./fs");
const { readCache } = require("./cache");
const getSHA = require("./get-sha");

async function generateRegister() {
  await writeFile(
    "./public/load-sw.js",
    minify(
      [
        'if ("serviceWorker" in navigator) {',
        '  window.addEventListener("load", () => {',
        '    navigator.serviceWorker.register("/sw.js");',
        "  });",
        "}"
      ].join("\n")
    ).code
  );
}

async function generateUnregister() {
  await writeFile(
    "./public/load-sw.js",
    minify(
      [
        'if ("serviceWorker" in navigator) {',
        '  window.addEventListener("load", () => {',
        "    navigator.serviceWorker.getRegistrations().then(registrations => {",
        "      registrations.forEach(registration => registration.unregister());",
        "    })",
        "  });",
        "}"
      ].join("\n")
    ).code
  );
}

async function generateSW() {
  await writeFile(
    "./public/sw.js",
    minify(
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
    ).code
  );
}

async function generator(config) {
  // value didn't changed, avoid running
  const cache = await readCache();
  if (cache.sw === getSHA(`${config.sw !== false}`)) return true;

  if (config.sw === false) {
    try {
      return await Promise.all([
        await del(["./public/sw.js"]),
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
