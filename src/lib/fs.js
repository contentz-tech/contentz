const fs = require("fs");
const { promisify } = require("util");
const mkdirp = require("mkdirp");

exports.writeFile = promisify(fs.writeFile);

exports.readFile = promisify(fs.readFile);

exports.makeDir = promisify(mkdirp);
