'use strict';

module.exports = () => getEnvPath() || getCliPath() || '.env';

function getEnvPath() {
  return process.env.DOTENV_PATHS || null
}

function getCliPath() {
  const re = /^dotenv_paths=(.+)$/;
  const matchingOption = process.argv.find(arg => arg.match(re));

  if (matchingOption) {
    const matches = matchingOption.match(re);
    return matches[1];
  } else {
    return null;
  }
}
