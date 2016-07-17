#!/usr/bin/env node
/**
 *  # tango
 *  Tango ![tango](https://logo.png)
 *
 * @flow
 */
'use strict';

import initApplication from './express/index';

var config = require('./config');

// Use whichever logging system you prefer.
// Doesn't have to be bole, I just wanted something more or less realistic
var bunyan = require('bunyan');

var log = bunyan.createLogger({name: 'tango'});

log.info('server process starting');

import type Application from 'express';
let app: Application = initApplication();

// Note that there's not much logic in this file.
// The server should be mostly "glue" code to set things up and
// then start listening
app.listen(config.express.port, config.express.ip, function (error) {
  if (error) {
    log.error('Unable to listen for connections', error);
    process.exit(10);
  }
  log.info('express is listening on http://' +
    config.express.ip + ':' + config.express.port);
});
