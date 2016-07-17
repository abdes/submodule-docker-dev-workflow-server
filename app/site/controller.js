/**
 *
 * @flow
 */
'use strict';

import type Middleware from 'express';
import type Request from 'express';
import type Response from 'express';

import path from 'path';

const rest = require('rest');

/**
 * ## status - are we alive?
 *
 */
// function index(req: Request, res: Response, next: Middleware) {
//   res.sendFile(path.join(__dirname, '../public/index.html'));
// }

/**
 * ## status - are we alive?
 *
 */
function status(req: Request, res: Response, next: Middleware) {
  const mime = require('rest/interceptor/mime');
  var client = rest.wrap(mime);
  client({ 'path': 'http://localhost:8529/_db/example/hello/greet' })
  .then(function(response) {
    console.log('message: ', response.entity.message);
    res.send('The winning number is '+response.entity._key+': '+response.entity.message);
  })
  .catch(function(cause) {
    console.log(cause);
  });
  //res.send({'status': 'ok'});
}

module.exports = {
  //index,
  status
};
