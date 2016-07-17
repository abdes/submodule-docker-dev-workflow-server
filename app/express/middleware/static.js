/**
 *
 * @flow
 */
'use strict';

import type Middleware from 'express';

import express from 'express';
import path from 'path';

export default function(options: {env: 'production' | 'development'}): Array<Middleware> {
  return [express.static(path.join(__dirname, '../../public'), {
    dotfiles: 'ignore',
    extensions: ['htm', 'html'],
    index: false
  })];
}
