'use strict';

const events = require('events');

class ArrayTrigger extends events.EventEmitter {
  constructor(ioc, options) {
    super();
    this.data = options.data;
  }

  start() {
    this.emit('triggered', new ioc.ArrayStream(this.data));
    return this;
  }
}

module.exports = ArrayTrigger;
