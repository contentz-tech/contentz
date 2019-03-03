const { renderToStaticNodeStream } = require("react-dom/server");
const { renderStylesToNodeStream } = require("emotion-server");
const { jsx } = require("@emotion/core");
const chrome = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");
const { join, resolve } = require("path");

const { exists, writeFile, makeDir } = require("./fs");
const { checkCache } = require("./cache");
const getMeta = require("./get-meta");
const OpenGraph = require("../components/open-graph");

const CHROME_PATH =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

function getImagePath(path) {
  const tmp = path.slice(".tmp/og".length);
  return join(
    "./public/static/og",
    tmp.includes("/pages")
      ? tmp.slice("/pages".length, tmp.indexOf(".mdx"))
      : tmp.slice(0, tmp.indexOf(".mdx"))
  );
}

function renderContent(ui) {
  return new Promise(resolve => {
    let html = "";
    const stream = renderToStaticNodeStream(ui).pipe(
      renderStylesToNodeStream()
    );
    stream.on("data", chunk => {
      html += chunk;
    });
    stream.on("end", () => {
      resolve(html);
    });
  });
}

async function generateOG(config, articles, pages) {
  if (config.hasOwnProperty("socialImage") && config.socialImage === false)
    return;

  const hasChrome = await exists(CHROME_PATH);
  const options = {
    args: hasChrome ? [] : chrome.args,
    executablePath: hasChrome ? CHROME_PATH : await chrome.executablePath,
    headless: hasChrome ? true : chrome.headless,
    defaultViewport: { width: 2048, height: 1170 }
  };
  const browser = await puppeteer.launch(options);

  await makeDir("./.tmp/og");

  const nonCached = await Promise.all(
    articles
      .concat(pages)
      .filter(async file => !(await checkCache(file.path, file.content)))
  );

  const rendered = await Promise.all(
    nonCached
      .map(file => ({ path: file.path, data: getMeta(file).data }))
      .filter(({ data }) => !data.hasOwnProperty("social"))
      .concat([
        {
          path: "pages.mdx",
          data: {
            title: config.title,
            description: config.description
          }
        },
        {
          path: "pages/articles.mdx",
          data: {
            title: "Articles",
            description: `List of articles of ${config.title}`
          }
        },
        {
          path: "pages/links.mdx",
          data: {
            title: "Shared Links"
          }
        },
        {
          path: "pages/404.mdx",
          data: {
            title: "Error 404",
            description: "The page or article you have tried to access was not found"
          }
        }
      ])
      .map(async ({ path, data }) => ({
        path,
        html: await renderContent(jsx(OpenGraph, { ...data }))
      }))
  );

  const paths = await Promise.all(
    rendered.map(async ({ path, html }) => {
      const tmpPath = join("./.tmp/og", path);
      await makeDir(tmpPath);
      const finalPath = join(tmpPath, "index.html");
      await writeFile(finalPath, html);
      return finalPath;
    })
  );

  await Promise.all(
    paths.map(async path => {
      const page = await browser.newPage();
      await page.goto(`file://${resolve(path)}`);
      const file = await page.screenshot({ type: "png" });
      const ogPath = getImagePath(path);
      await makeDir(ogPath);
      writeFile(join(ogPath, "open-graph.png"), file);
    })
  );

  await browser.close();
}

module.exports = generateOG;
