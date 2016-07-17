/**
 *
 * @flow
 */
'use strict';

import morgan from 'morgan';

import type Middleware from 'express';

export default function(options: {env: 'production' | 'development'}): Middleware {
  return morgan('combined');
}
