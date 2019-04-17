const mdx = require("@mdx-js/mdx");
const babel = require("@babel/core");

async function parseMDX(content) {
  const source = await mdx(content);

  return babel.transform(
    [
      `const React = require("react");`,
      `const { css } = require("@emotion/core");`,
      `const { MDXTag } = require("@mdx-js/tag");`,
      source
    ].join("\n"),
    {
      presets: [
        [
          require("@babel/preset-env"),
          {
            targets: { node: true }
          }
        ],
        require("@emotion/babel-preset-css-prop")
      ]
    }
  );
}

module.exports = parseMDX;
