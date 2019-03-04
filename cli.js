#!/usr/bin/env node
const meow = require("meow");
const chalk = require("chalk");

const pkg = require("./package.json");

const cli = meow(
  `${chalk.white("Usage")}
  $ ${chalk.cyan("contentz build")}
  $ ${chalk.cyan("contentz social <path>")}
`,
  {
    description: `${chalk.cyan("Contentz")} - ${pkg.description}`
  }
);

const [cmd, ...file] = cli.input;

if (!cmd) cli.showHelp(0);

const commands = {
  build: require("./src/build"),
  social: require("./src/social"),
  write: () => {},
  page: () => {}
}

const command = commands[cmd];
command(file);
