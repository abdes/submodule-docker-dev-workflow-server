/**
 * # Express error handler middleware (errorHandler.js)
 *
 * Express error handling middleware acts in the same way any other middleware
 * function does, exdept that they take an extra argument as an error object.
 * - - -
 * Error handler middleware **MUST** be installed in the express app stack as
 * **the last middleware** after all other middleware functions and routes have
 * been configured.
 * - - -
 * This implementation provides stack traces in development env
 * and error message responses for requests accepting text, html,
 * or json. The behavior can be customized by passing options when
 * instantiating this module.
 *
 *
 * ```js
 * import express from 'express';
 * import errorHandler from './middleware/errorHandler';
 * ```
 * ```js
 * var app = express();
 * let options = {env: app.get('env')};
 * ```
 * ```js
 * // configure engines and middleware functions
 * // setup routes and routers
 * // configure 404 handler
 * ```
 * ```js
 * // last, configure the error handler, passing the options
 * app.use(errorHandler(options));
 * ```
 *
 * ## Options
 * | Key | Description | Values |
 * |:----|:------------|:-------|
 * | env | node.js runtime environment type | 'development' or 'production' |
 *
 * In *production* mode, the error handler will not produce the stack trace.
 *
 * ## Behavior
 *
 * The error handler will prefer to send back the response to the client in
 * the following order:
 * 1. HTML
 * 2. JSON
 * 3. Text
 *
 * ### HTML:
 *
 *   When accepted connect will output a nice html stack trace.
 *
 * ### JSON:
 *
 * When _application/json_ is accepted, connect will respond with
 *   an object in the form of `{ "error": error }`.
 *
 * ### Text:
 *
 *   By default, and when _text/plain_ is accepted a simple stack trace
 *   or error message will be returned.
 *
 * @flow
 */
'use strict';

import type Error from 'express';
import type Request from 'express';
import type Response from 'express';
import type Middleware from 'express';

import util from 'util';
import accepts from 'accepts';

/**
 * Takes a value of type Error or any other type and return a string that
 * contains the eror stack trace or the string representation of the value.
 *
 * @api
 * private
 */
function stringify(val: ?Error): string {
  if (val) {
    var stack = val.stack;
    if (stack) {
      return String(stack);
    }
    var str = String(val);
    return str === toString.call(val)
      ? util.inspect(val)
      : str;
  } else {
    // null or undefined values represented by empty string
    return '';
  }
}


function errorHandler(options: {env: 'production' | 'development'}): Middleware {
  // get environment
  let env: string = options.env;

  return function (err: Error, req: Request, res: Response, next: Middleware){
    // respect err.statusCode
    if (err.statusCode) {
      res.statusCode = err.statusCode;
    }

    // respect err.status
    if (err.status) {
      res.statusCode = err.status;
    }

    // default status code to 500
    if (res.statusCode < 400) {
      res.statusCode = 500;
    }

    // cannot actually respond
    if (res._header) {
      return req.socket.destroy();
    }

    // negotiate the accepted content type from the request
    var accept = accepts(req);
    var type = accept.type('html', 'json', 'text');

    // Security header for content sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');

    // get a string representation of the err value
    var str = stringify(err);

    // html
    if (type === 'html') {
      // check if the err object needs special processing to produce a
      // user friendly content
      var isInspect = !err.stack && String(err) === toString.call(err);
      var error = !isInspect
        ? (str.split('\n', 1)[0] || 'Error')
        : 'Error';
      var stack = !isInspect
        ? String(str).split('\n').slice(1)
        : [str];
      res.render('500', {
          error: error,
          stack: (env === 'development') ? stack : {}
        });
    // json
    } else if (type === 'json') {
      console.log(type + ': type is json');
      var error = { message: err.message, stack: (env === 'development') ? err.stack : {} };
      for (var prop in err) {
        error[prop] = err[prop];
      }
      var json = JSON.stringify({ error: error }, null, 2);
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(json);
    // plain text
    } else {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.send(err.message);
      res.end((env === 'development') ? err.stack : {});
    }
  };
}

module.exports = errorHandler;
