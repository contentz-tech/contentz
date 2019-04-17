const { renderStylesToString } = require("emotion-server");
const { jsx } = require("@emotion/core");
const ReactDOMServer = require("react-dom/server");
const { join } = require("path");

const { makeDir, writeFile, exists } = require("./fs");
const i18n = require("./i18n");

const ErrorPage = require("../components/error");
const Document = require("../components/document");
const { IntlProvider } = require("../components/intl");

async function writeContent(html) {
  const finalPath = join(process.cwd(), "./public");
  await makeDir(finalPath);
  await writeFile(join(finalPath, "404.html"), html, "utf8");
}

async function render(config) {
  if (!(await exists("./public/404.html"))) {
    const messages = await i18n();
    try {
      const html = renderStylesToString(
        ReactDOMServer.renderToStaticMarkup(
          jsx(
            IntlProvider,
            { locale: config.language || config.lang || "en", messages },
            jsx(
              Document,
              {
                config,
                path: "error.mdx",
                data: {
                  title: messages.error.title,
                  description: messages.error.description
                }
              },
              jsx(ErrorPage, { config })
            )
          )
        )
      );
      await writeContent(`<!DOCTYPE html>${html}`);
    } finally {
      console.log("Render completed: Error");
    }
  }
}

module.exports = render;
