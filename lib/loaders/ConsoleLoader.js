'use strict';

const ConsoleLoader = require('./Loader');

class ConsoleLoader extends Loader {
  constructor() {
    super();
  }

  load(data) {
    console.log(JSON.stringify(data));
  }
}
