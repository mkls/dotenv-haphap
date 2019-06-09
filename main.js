'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {
  config(...paths) {
    if (paths.length === 0) {
      paths = ['.env'];
    }
    const parsed = paths
      .map(loadEnvsFile)
      .map(parse)
      .reduce((accu, item) => Object.assign(accu, item), {});
    setEnv(parsed);
    return parsed;
  }
};

/*
 * (stolen from dotenv)
 * Parses a string or buffer into an object
 * @param {(string|Buffer)} src - source to be parsed
 * @returns {Object} keys and values from src
 */
function parse(src) {
  const obj = {};

  // convert Buffers before splitting into lines and processing
  src
    .toString()
    .split('\n')
    .forEach(function(line) {
      // matching "KEY' and 'VAL' in 'KEY=VAL'
      const keyValueArr = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      // matched?
      if (keyValueArr === null) {
        return;
      }

      const key = keyValueArr[1];
      // default undefined or missing values to empty string
      let val = keyValueArr[2] || '';
      const end = val.length - 1;
      const isDoubleQuoted = val[0] === '"' && val[end] === '"';
      const isSingleQuoted = val[0] === "'" && val[end] === "'";

      // if single or double quoted, remove quotes
      if (isSingleQuoted || isDoubleQuoted) {
        val = val.substring(1, end);

        // if double quoted, expand newlines
        if (isDoubleQuoted) {
          val = val.replace(/\\n/g, '\n');
        }
      } else {
        // remove surrounding whitespace
        val = val.trim();
      }

      obj[key] = val;
    });

  return obj;
}

const loadEnvsFile = envPath => {
  const fullPath = path.resolve(process.cwd(), envPath);

  if (!fs.existsSync(fullPath)) {
    return '';
  } else {
    return fs.readFileSync(fullPath, { encoding: 'utf8' });
  }
};

const setEnv = parsedEnv => {
  Object.keys(parsedEnv).forEach(function(key) {
    if (!process.env.hasOwnProperty(key)) {
      process.env[key] = parsedEnv[key];
    }
  });
};
