const fs = require("fs");
const { promisify } = require("util");
const mkdirp = require("mkdirp");

const stat = promisify(fs.stat);

exports.writeFile = promisify(fs.writeFile);

exports.readFile = promisify(fs.readFile);

exports.makeDir = promisify(mkdirp);

exports.exists = async path => {
  try {
    await stat(path);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") {
      return false;
    }
    throw error;
  }
};
