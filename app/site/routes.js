/**
 *
 * @flow
 */
'use strict';

import type Router from 'express';

import * as controller from './controller';

function siteRoutes(router: Router) {
  router.get('/status', controller.status);
  //router.get('/', controller.index);
  return router;
}

module.exports = siteRoutes;
