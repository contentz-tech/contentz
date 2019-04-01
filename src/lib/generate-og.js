const { renderToStaticNodeStream } = require("react-dom/server");
const { renderStylesToNodeStream } = require("emotion-server");
const { jsx } = require("@emotion/core");
const puppeteer = require("puppeteer-core");
const { join, parse } = require("path");
const CHROME_PATH = require("local-chrome");

const { exists, writeFile, makeDir } = require("./fs");
const OpenGraph = require("../components/open-graph");

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

async function generateOG(files) {
  const hasChrome = await exists(CHROME_PATH);

  if (!hasChrome) {
    console.error(
      "Google Chrome was not found, it's required to generate the social images."
    );
    process.exit(1);
  }

  const options = {
    args: [],
    executablePath: CHROME_PATH,
    headless: true,
    defaultViewport: { width: 2048, height: 1170 }
  };

  const withContent = await Promise.all(
    files.map(async file => {
      return {
        path: file.path,
        content: await renderContent(jsx(OpenGraph, { ...file.data }))
      };
    })
  );

  const browser = await puppeteer.launch(options);

  const images = await Promise.all(
    withContent.map(async ({ path, content }) => {
      const page = await browser.newPage();
      // I'm going to use data:text/html to avoid writing the HTML to disk
      await page.goto(
        `data:text/html;base64,${Buffer.from(content).toString("base64")}`
      );
      const file = await page.screenshot({ type: "png" });
      return { path, file };
    })
  );

  await makeDir("./static/_social");

  await Promise.all(
    images.map(async image => {
      const path = join(
        "./static/_social/",
        image.path.replace(".mdx", ".png")
      );
      await makeDir(parse(path).dir);
      await writeFile(path, image.file);
    })
  );

  await browser.close();
}

module.exports = generateOG;
