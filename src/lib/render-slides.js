const { renderStylesToString } = require("emotion-server");
const { jsx } = require("@emotion/core");
const ReactDOMServer = require("react-dom/server");
const { join } = require("path");

const { makeDir, writeFile } = require("./fs");
const { checkCache } = require("./cache");
const getMeta = require("./get-meta");
const i18n = require("./i18n");

const SlidesPage = require("../components/slides");
const Document = require("../components/document");
const { IntlProvider } = require("../components/intl");

function formatURL(path) {
  return path.slice(1, path.length - 4) + "/";
}

async function writeContent(html) {
  const finalPath = join(process.cwd(), "./public", "/slides", "/");
  await makeDir(finalPath);
  await writeFile(join(finalPath, "index.html"), html, "utf8");
}

function format({ path, content }) {
  const meta = getMeta({ path, content });
  return {
    ...meta.data,
    url: formatURL(path)
  };
}

async function render(config, slides) {
  if (!config.hasSlides) return;
  const caches = await Promise.all(
    slides.map(slide => checkCache(slide.path, slide.content))
  );
  if (
    caches.reduce((prev, next) => next === prev, true) &&
    (await checkCache("config.yml", JSON.stringify(config)))
  ) {
    return true;
  }

  const messages = await i18n();

  try {
    const html = renderStylesToString(
      ReactDOMServer.renderToStaticMarkup(
        jsx(
          IntlProvider,
          { locale: config.language || config.lang || "en", messages },
          jsx(
            Document,
            { data: { published: true }, messages, config, path: "slides.mdx" },
            jsx(SlidesPage, { messages, config, slides: slides.map(format) })
          )
        )
      )
    );
    await writeContent(`<!DOCTYPE html>${html}`);
  } finally {
    console.log("Render completed: Slides");
  }
}

module.exports = render;
