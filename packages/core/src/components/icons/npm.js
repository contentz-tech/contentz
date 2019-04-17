const { jsx } = require("@emotion/core");

module.exports = () =>
  jsx(
    "svg",
    {
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      width: 32,
      height: 32,
      viewBox: "0 0 32 32"
    },
    jsx("title", null, "npm"),
    jsx("path", { d: "M0 0v32h32v-32h-32zM26 26h-4v-16h-6v16h-10v-20h20v20z" })
  );
