/**
 *
 * @flow
 */
'use strict';

import logRequests from './logger';
import serveStatic from './static';

import type Middleware from 'express';

export default function(options?: {env: 'production' | 'development'}): Array<Middleware> {
  var defaultOptions = {env: 'production'};
  var merged = Object.assign(defaultOptions, options);
  return [
    logRequests(merged),
    serveStatic(merged)
  ];
}
