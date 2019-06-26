function loadModule(path) {
  try {
    let Component = require(path);
    if (Component.hasOwnProperty("default")) {
      Component = Component.default;
    }
    return Component;
  } catch (error) {
    if (error.code === "MODULE_NOT_FOUND") {
      console.error(
        `Error: The module ${error.message.slice(
          "Cannot find module ".length
        )} in the file '${path}' could not be found.`
      );
      process.exit(1);
    } else {
      console.error(error);
      process.exit(1);
    }
  }
}

module.exports = loadModule;
