'use strict'
const express                           = require('express');
const app                               = express();
var router = require('./app/route/index');
app.use('/', router);
var devport = 3030;
///////////// local version of the API: it works standalone on port 3030 for being tested
///////////// this script is not called on the lambda version
///////////// so, in dev or in staging this App can be run via the node command: node local.js
///////////// in Lambda it requires to be called via the lambda.js script using the following Lambda handler: lambda.handler
///////////// that will call the App using a different handler and not directly opening an express web server on port 3030
app.listen(devport, () => console.log('LAMBDA API EXAMPLE WORKING ON '+devport));
