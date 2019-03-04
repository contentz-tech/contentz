const getConfig = require("./lib/get-config");
const getMeta = require("./lib/get-meta");
const generateOG = require("./lib/generate-og");

const { readFile } = require("./lib/fs");

async function main(paths) {
  console.log("Preparing to start.");
  const config = await getConfig();

  const files = await Promise.all(
    paths.map(async path => {
      switch (path) {
        case "home":
        case "articles":
        case "archive":
        case "links":
        case "error": {
          return path;
        }
        default: {
          return { path: path, content: await readFile(path, "utf8") };
        }
      }
    })
  );

  const withData = files.map(file => {
    switch (file) {
      case "home": {
        return {
          path: "home.mdx",
          data: {
            title: config.title,
            description: config.description
          }
        };
      }
      case "articles":
      case "archive": {
        return {
          path: "articles.mdx",
          data: {
            title: "Articles",
            description: `List of articles of ${config.title}`
          }
        };
      }
      case "links": {
        return {
          path: "links.mdx",
          data: {
            title: "Shared Links"
          }
        };
      }
      case "error": {
        return {
          path: "error.mdx",
          data: {
            title: "Error 404",
            description:
              "The page or article you have tried to access was not found"
          }
        };
      }
      default: {
        return {
          path: file.path,
          data: getMeta(file).data
        };
      }
    }
  });

  await generateOG(withData);
  console.log("Done! Your social images has been successfully generated.");
}

module.exports = main;
