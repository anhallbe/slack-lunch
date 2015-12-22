'use strict';

var express = require('express');

var handleUpperEast = require('./handlers/uppereast');

var app = express();

app.get('/uppereast', handleUpperEast);

app.listen('8080');
