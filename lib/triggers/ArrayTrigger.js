'use strict';

const events = require('events'),
  stream = require('stream');

class ArrayStream extends stream.Readable {
  constructor(data) {
    super({ objectMode: true });

    this.data = data;
    this.index = 0;
  }

  _read(size) {
    if (this.index >= this.data.length)
      return this.push(null);

    return this.push(this.data[this.index++]);
  }
}

class ArrayTrigger extends events.EventEmitter {
  constructor(ioc, options) {
    super();
    this.data = options.data;
  }

  start() {
    this.emit('triggered', new ArrayStream(this.data));
  }
}

module.exports = ArrayTrigger;
