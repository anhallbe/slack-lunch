'use strict';

var express = require('express');
var path = require('path');

var cache = require('./utils/cache')();
var upperEast = require('./handlers/uppereast');
var kenths = require('./handlers/kenths');

var app = express();

var TOKEN = process.env.TOKEN;
var DEV = process.env.DEVELOPMENT;

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/lunch', function(req, res) {
  if (!req.query.token == TOKEN && !DEV) {
    console.warn('Invalid token in request');
    res.sendStatus(403);
    return;
  }

  var text = req.query.text;
  if (cache.get(text)) {
    res.send({text: cache.get(text)});
    //Used cached copy. No need to do anything else.
    return;
  }

  switch (text) {
    case 'uppereast':
      upperEast(function(result) {
        res.send({text:result});
        cache.put('uppereast', result);
      });
      break;
    case 'kenths':
      kenths(function(result) {
        res.send({text:result});
        cache.put('kenths', result);
      });
      break;
    default:

  }
});

app.listen('8080', function() {
  if (DEV) {
    console.log('In DEVELOPMENT environment.');
  }
  console.log('listening on port 8080');
});
