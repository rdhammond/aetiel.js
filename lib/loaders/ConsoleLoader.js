'use strict';

const Loader = require('./Loader');

class ConsoleLoader extends Loader {
  constructor() {
    super();
  }

  load(data) {
    console.log(JSON.stringify(data));
  }
}

module.exports = ConsoleLoader;
