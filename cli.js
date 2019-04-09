#!/usr/bin/env node
'use strict';

const getEnvPaths = require('./get-env-paths');

require('./main').config(getEnvPaths());
