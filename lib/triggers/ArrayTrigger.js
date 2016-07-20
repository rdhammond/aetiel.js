'use strict';

const events = require('events');

class ArrayTrigger extends events.EventEmitter {
  constructor(ioc, options) {
    super();
    this.data = options.data;
    this.ArrayStream = ioc.ArrayStream;
  }

  start() {
    this.emit('triggered', new this.ArrayStream(this.data));
    return this;
  }
}

module.exports = ArrayTrigger;
