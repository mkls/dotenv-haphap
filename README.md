# dotenv-haphap

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

## Preload

```bash
$ node -r dotenv-haphap/config your_script.js dotenv_paths=.env,confidential.env
```

or

```bash
$ DOTENV_PATHS=.env,confidnetial.env node -r dotenv-haphap/config your_script.js
```