#!/usr/bin/env node
const meow = require("meow");
const chalk = require("chalk");
const execa = require("execa");
const commandExists = require("command-exists");
const hasModule = require("has-module");

const pkg = require("./package.json");

function canUseYarn() {
  return commandExists("yarn");
}

async function install(module) {
  if (await canUseYarn()) {
    await execa("yarn", ["add", module]);
  } else {
    await execa("npm", ["install", module]);
  }
}

async function installAndRun(cmd, args) {
  const module = `@contentz/${cmd}`;
  if (!hasModule(module)) {
    console.log(`Module @contentz/${cmd} not found, starting to install it...`);
    await install(module);
  }
  const command = require(module);
  await command(args);
}

async function main() {
  const cli = meow(
    `${chalk.white("Usage")}
    $ ${chalk.cyan("contentz init")} Initialize a new project using Contentz
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

  let [cmd = "help", ...files] = cli.input;
  cmd = cmd.toLowerCase();

  switch (cmd) {
    case "help": {
      return cli.showHelp(0);
    }
    case "build": {
      return await installAndRun(cmd);
    }
    case "social": {
      return await installAndRun(cmd, files);
    }
    case "write": {
      return await installAndRun(cmd, files);
    }
    case "init": {
      return await installAndRun(cmd, files[0]);
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
