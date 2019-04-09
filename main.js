'use strict';

const fs = require('fs');
const path = require('path');


module.exports = {
  config(paths) {
    paths = paths || '.env';
    const parsed = paths
      .split(',')
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
      if (keyValueArr != null) {
        const key = keyValueArr[1];

        // default undefined or missing values to empty string
        let value = keyValueArr[2] || '';

        // expand newlines in quoted values
        const len = value ? value.length : 0;
        if (len > 0 && value.charAt(0) === '"' && value.charAt(len - 1) === '"') {
          value = value.replace(/\\n/gm, '\n');
        }

        // remove any surrounding quotes and extra spaces
        value = value.replace(/(^['"]|['"]$)/g, '').trim();

        obj[key] = value;
      }
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
