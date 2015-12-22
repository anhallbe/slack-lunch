'use strict';

var request = require('request');
var cheerio = require('cheerio');

const KENTHS_URL = 'http://kenths.kvartersmenyn.se/';
const DAYS = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag'];
const WEEKDAYS = {
  1: 'Måndag',
  2: 'Tisdag',
  3: 'Onsdag',
  4: 'Torsdag',
  5: 'Fredag'
}

module.exports = function(cb) {
  let today = new Date();
  let weekday = WEEKDAYS[today.getDay()];
  request(KENTHS_URL, (err, resp, html) => {
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

      let output = 'Kenths ' + weekday + ':\n';
      result[weekday].forEach(r => {
        output += r + '\n';
      })
      cb(output);
    }
  });
}
