/**
 * # routes.js
 *
 * All the routes available are defined here
 * The endpoints descripe the method (POST/GET...)
 * and the url ('account/login')
 * and the handler
 *
 * @flow
 */
'use strict';

import express from 'express';
import siteRoutes from '../site/routes';

import type Application from 'express';

export default function(app: Application, options?: {env: 'production' | 'development'}) {
  app.use('/', siteRoutes(express.Router()));
}
