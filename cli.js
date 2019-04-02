#!/usr/bin/env node
const meow = require("meow");
const chalk = require("chalk");
const { join } = require("path");

const pkg = require("./package.json");

async function main() {
  const cli = meow(
    `${chalk.white("Usage")}
    $ ${chalk.cyan("contentz build")} Build the whole website
    $ ${chalk.cyan(
      "contentz social <path>"
    )} Generate the social images for the given files
    $ ${chalk.cyan(
      "contentz write <path>"
    )} Generate a base article inside "/articles" with the current date and non published
    $ ${chalk.cyan("contentz help")} Show this message
  `,
    {
      description: `${chalk.cyan("Contentz")} - ${pkg.description}`
    }
  );

  let [cmd = "build", ...files] = cli.input;
  cmd = cmd.toLowerCase();

  switch (cmd) {
    case "help": {
      return cli.showHelp(0);
    }
    case "build":
    case "social":
    case "write": {
      const command = require(join("./src", cmd));
      await command(files);
      return;
    }
    default: {
      console.error(`Command ${cmd} is not supported.`);
      cli.showHelp(1);
    }
  }
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
