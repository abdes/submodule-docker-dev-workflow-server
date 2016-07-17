/**
 * #config.js
 *
 * Sample configuration file for the application.
 *
 * @flow
 */
'use strict';

module.exports = {
  express: {
    port: process.env.EXPRESS_PORT || 3000,
    ip: '127.0.0.1'
  },
  arangodb: {
    ip: '127.0.0.1',
    port: '8529',
    database: 'tango'
  },
  /*
  crypto: {
    privateKey:
    '37LvDSasdfasfsaf3a3IEIA;3r3oi3joijpjfa3a3m4XvjYOh9Yaa.p3id#IEYDNeaken',
    tokenExpiry: 1 * 30 * 1000 * 60 //1 hour
  },
  email: {
    test: true,
    username: "someone@gmail.com",
    password: "somepassword",
    accountName: "Snowflake"
  },
  validation: {
    username: /^[a-zA-Z0-9]{6,12}$/,
    password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/
  }
  */
};
