const { renderStylesToString } = require("emotion-server");
const { jsx } = require("@emotion/core");
const ReactDOMServer = require("react-dom/server");
const { join } = require("path");

const { makeDir, writeFile } = require("./fs");

const HomePage = require("../components/home");
const Document = require("../components/document");

async function writeContent(html) {
  const finalPath = join(process.cwd(), "./public", "/");
  await makeDir(finalPath);
  await writeFile(join(finalPath, "index.html"), html, "utf8");
}

async function render(config) {
  const html = renderStylesToString(
    ReactDOMServer.renderToStaticMarkup(
      jsx(Document, { config }, jsx(HomePage, { config }))
    )
  );
  await writeContent(html);
}

module.exports = render;
