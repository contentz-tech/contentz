const { join, parse } = require("path");
const { minify } = require("terser");
const { jsx } = require("@emotion/core");

const { makeDir, writeFile } = require("./fs");
const { checkCache } = require("./cache");
const getMeta = require("./get-meta");
const parseMDX = require("./parse-mdx");
const renderContent = require("./render-content");
const i18n = require("./i18n");
const loadModule = require("./load-module");

const Slide = require("../components/slide");
const Document = require("../components/document");
const { IntlProvider } = require("../components/intl");

async function writeContent(file) {
  const finalPath = join(process.cwd(), "./public", file.path);
  await makeDir(parse(finalPath).dir);
  await writeFile(join(finalPath), `<!DOCTYPE html>${file.content}`, "utf8");
}

function writeToFile(path) {
  return async (content, index) => {
    await makeDir(path.slice(0, path.lastIndexOf("/") + 1));
    await writeFile(path.replace(".js", `.${index}.js`), content.code, "utf8");
  };
}

async function generateSlideJS() {
  await writeFile(
    "./public/slide.js",
    minify(
      [
        "const totalSlides = parseInt(",
        '  document.getElementById("slide").dataset.total,',
        "  10",
        ");",
        "function next(pathname) {",
        '  if (pathname.endsWith("/")) return pathname + 1',
        '  const number = parseInt(pathname.slice(pathname.lastIndexOf("/") + 1), 10) + 1;',
        "  if (number > totalSlides) return pathname;",
        '  return pathname.slice(0, pathname.lastIndexOf("/") + 1) + number;',
        "}",
        "function prev(pathname) {",
        '  if (pathname.endsWith("/")) return pathname;',
        '  const number = parseInt(pathname.slice(pathname.lastIndexOf("/") + 1), 10) - 1;',
        '  return pathname.slice(0, pathname.lastIndexOf("/") + 1) + (number === 0 ? "" : number);',
        "}",
        'window.addEventListener("keydown", ({ key }) => {',
        '  if (key === "ArrowRight") window.location.pathname = next(window.location.pathname);',
        '  if (key === "ArrowLeft") window.location.pathname = prev(window.location.pathname);',
        "})"
      ].join("\n")
    ).code
  );
}

async function renderSlide(slide, config) {
  if (
    (await checkCache(slide.path, slide.content)) &&
    (await checkCache("config.yml", JSON.stringify(config)))
  )
    return true;

  let title = "";
  try {
    const metadata = getMeta(slide);
    title = metadata.data.title;

    const tmpPath = join("./.tmp", slide.path).replace("mdx", "js");

    const slides = await Promise.all(
      metadata.content.split("---").map(parseMDX)
    );

    await Promise.all(slides.map(writeToFile(tmpPath)));

    const messages = await i18n();

    const links = slides.map((_, index) =>
      join(
        "/slides",
        slide.path.slice("./slides".length).replace(".mdx", ""),
        `${index === 0 ? "index" : index}.html`
      )
    );

    await Promise.all([
      generateSlideJS(),
      ...slides.map(async (_, index) => {
        const slidePath = tmpPath.replace(".js", `.${index}.js`);
        const Component = loadModule(join(process.cwd(), slidePath));
        const content = await renderContent(
          jsx(
            IntlProvider,
            { locale: config.language || config.lang || "en", messages },
            jsx(
              Document,
              { data: metadata.data, messages, config, links, path: slidePath },
              jsx(Slide, {
                ...slide,
                ...metadata,
                config,
                Component,
                totalSlides: slides.length - 1
              })
            )
          )
        );
        await writeContent({ content, path: links[index] });
      })
    ]);
  } finally {
    console.log('Slide rendered: "%s"', title);
  }
}

module.exports = renderSlide;
