const { renderToStaticNodeStream } = require("react-dom/server");
const { renderStylesToNodeStream } = require("emotion-server");

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

module.exports = renderContent;
