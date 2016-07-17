/**
 * # index.js
 *
 * This is a configuration for Express.
 *
 * @flow
 */
'use strict';

/**
 * ## Imports
 *
 */

import express from 'express';
import * as views from './views';
import setupRoutes from './routes';
import middleware from './middleware';
import errorHandler from './middleware/errorHandler';
import accepts from 'accepts';

export default function (): express.Application {
  var app: express.Application = express();
  var options = {env: app.get('env')};

  // Configure views and template engines
  let config = views.config(options);
  for (let {name, engine} of config.engines) {
    app.engine(name, engine);
  }
  app.set('view engine', config['view engine']);
  app.set('views', config.views);

  // Configure middlewares (except the error handler which must alwasy be
  // set after all routes have been configured)
  app.use(middleware(options));

  // Configure routes
  setupRoutes(app, options);

  // Always keep this route as the last one!
  app.use(function(req, res, next){
    res.status(404);
    // negotiate
    var accept = accepts(req);
    var type = accept.type('html', 'json', 'text');
    // html
    if (type === 'html') {
      // We must redirect here as serving static files with sendFile will
      // result in the assets inside the file using the URL root of the
      // original request and not the 404 files
      res.redirect('/404');
    // json
    } else if (type === 'json') {
      res.send({ url: req.url, error: 'Not found' });
    // plain text
    } else {
      res.type('txt').send('Not found');
    }
  });

  // Finally the error handler (MUST be the last thing in the app stack)
  app.use(errorHandler(options));

  return app;
}
