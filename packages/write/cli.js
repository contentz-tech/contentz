#!/usr/bin/env node
const meow = require("meow");
const chalk = require("chalk");

const pkg = require("./package.json.js");
const command = require("./src/index.js.js");

async function main() {
  const cli = meow(
    `${chalk.white("Usage")}
    $ ${chalk.cyan("contentz-write")} Write a new article using Contentz
    $ ${chalk.cyan("contentz-write help")} Show this message
  `,
    {
      description: `${chalk.cyan("Contentz Write")} - ${pkg.description}`
    }
  );

  let args = cli.input;
  cmd = args[0].toLowerCase();

  switch (cmd) {
    case "help": {
      return cli.showHelp(0);
    }
    default: {
      await command(args);
      return;
    }
  }
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
