'use strict'
const express                           = require('express');
const awsServerlessExpressMiddleware    = require('aws-serverless-express/middleware');
const app                               = express();
app.use(awsServerlessExpressMiddleware.eventContext());
var router = require('./app/route/index');
app.use('/', router);

function errorHandler(err, req, res, next) {
  res.json({'error': { error: err }});
}
app.use(errorHandler);
module.exports = app;
