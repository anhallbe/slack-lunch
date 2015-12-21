'use strict';

var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var app = express();

const UPPEREAST_URL = 'http://uppereast.kvartersmenyn.se/';
const DAYS = ['MÅNDAG', 'TISDAG', 'ONSDAG', 'TORSDAG', 'FREDAG'];
const WEEKDAYS = {
  1: 'MÅNDAG',
  2: 'TISDAG',
  3: 'ONSDAG',
  4: 'TORSDAG',
  5: 'FREDAG'
}

app.get('/uppereast', (req, res) => {
  let today = new Date();
  let weekday = WEEKDAYS[today.getDay()];
  request(UPPEREAST_URL, (err, resp, html) => {
    if (!err) {
      let result = {};
      let $ = cheerio.load(html);

      let children = $('.meny').children();
      var currentDay = 'WHAT';
      for (let c in children) {
        let child = children[c];
        if (child.name == 'strong' && child.children[0]) {
          currentDay = child.children[0].data;
        }
        if (child.name == 'br' && child.next && child.next.data && DAYS.indexOf(currentDay) !== -1) {
          let food = child.next.data;
          if (!result[currentDay]) {
            result[currentDay] = [];
          }
          result[currentDay].push(food);
        }
      }

      let output = 'Upper East ' + weekday + ':\n';
      result[weekday].forEach(r => {
        output += r + '\n';
      })
      console.log(output);
      res.send({text:output});
    }
  })
});

app.listen('8080');
