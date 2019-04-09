'use strict';

(function () {
  require('./main').config(getEnvPath() || getCliPath() || '.env');
})();

function getCliPath() {
  const re = /^dotenv_paths=(.+)$/;
  const matchingOption = process.argv.find(arg => arg.match(re));

  if (matchingOption) {
    const matches = cur.match(re);
    return matches[1];
  } else {
    return null;
  }
}

function getEnvPath() {
  return process.env.DOTENV_PATHS || null
}
