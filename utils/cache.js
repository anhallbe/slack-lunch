'use strict';
class Cache {
  constructor() {
    this.store = new Map();
  }

  get(restaurant) {
    let now = new Date();
    let cached = this.store.get(restaurant);
    if (cached && cached.date.getDate() == now.getDate()) {
      return cached.text;
    }
  }

  put(restaurant, text) {
    let entry = {
      text: text,
      date: new Date()
    };
    this.store.set(restaurant, entry);
  }
}

module.exports = function() {
  return new Cache();
}
