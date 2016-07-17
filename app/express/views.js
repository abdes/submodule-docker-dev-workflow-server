/**
 *
 * @flow
 */
'use strict';

var exphbs = require('express-handlebars');
import path from 'path';

export type ViewsConfiguration = {
  engines:  Array<{name: string, engine: Function}>;
  'view engine': string;
  views: string | Array<string>;
};


function config (options?: {env: 'production' | 'development'}): ViewsConfiguration {
  return {
    engines: [
      {
        name: 'hbs',
        engine: exphbs({
          extname: '.hbs',
          layoutsDir: path.join(__dirname, '../views/layouts'),
          defaultLayout: 'main'
        })
      }
    ],
    'view engine': 'hbs',
    views: path.join(__dirname, '../views')
  };
}

module.exports = {
  config
};
