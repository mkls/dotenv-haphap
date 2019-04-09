# dotenv-haphap

<img src="https://raw.githubusercontent.com/motdotla/dotenv/master/dotenv.png" alt="dotenv" align="right" />

Inspired by [dotenv](https://github.com/motdotla/dotenv), but allows loading multiple dotenv files.

Instead of a path for a single dotenv file, you can call config with a coma separated list of paths.


## Install

```bash
npm install dotenv-haphap
```

## Usage

As early as possible in your application, require and configure dotenv-haphap.

```javascript
require('dotenv-haphap').config('.env,confidential.env')
```

It will never modify any environment variables that have already been set.
Variables defined in later .env files will overwrite values in previous ones.

For example, if you have `HAPHAP=11` in your `.env` file, and `HAPHAP=14` in `confidential.env`, then
`process.env.HAPHAP` will be 14 when using the require from above.


## Preload

```bash
$ node -r dotenv-haphap/config your_script.js dotenv_paths=.env,confidential.env
```

or

```bash
$ DOTENV_PATHS=.env,confidnetial.env node -r dotenv-haphap/config your_script.js
```

## FAQ

### Should I commit my `.env` file?

You should not commit them if you have sensitive information in it (such as database passwords or API keys).

We found it easier though to commit parts of the .env file which contain local development specific values
(like connection strings to local docker images), but not deploying them to production.

### Should I have multiple `.env` files?

Generally you should not have a different .env file for each environment (like one for staging and for prod), but for
local development it might be helpful to have a .env file for test execution and one for starting the app locally.

Also, if there are parts of the .env file you do not wish to commit, you could separate them into a confidential.env
file, which you put in gitignore and let each developer set it up locally.
