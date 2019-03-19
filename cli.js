#!/usr/bin/env node
const meow = require("meow");
const chalk = require("chalk");

const pkg = require("./package.json");

const cli = meow(
  `${chalk.white("Usage")}
  $ ${chalk.cyan("contentz build")} Build the whole website
  $ ${chalk.cyan(
    "contentz social <path>"
  )} Generate the social images for the given files
  $ ${chalk.cyan(
    "contentz write <path>"
  )} Generate a base article inside "/articles" with the current date
  $ ${chalk.cyan("contentz help")} Show this message
`,
  {
    description: `${chalk.cyan("Contentz")} - ${pkg.description}`
  }
);

const [cmd, ...files] = cli.input;

if (cmd === "help") cli.showHelp(0);
if (!cmd) require("./src/build")(files);

const commands = {
  build: require("./src/build"),
  social: require("./src/social"),
  write: require("./src/write"),
  page: () => {}
};

const command = commands[cmd];
command(files);
