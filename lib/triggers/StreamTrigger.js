'use stricct';

const events = require('events');

class StreamTrigger extends events.EventEmitter {
  constructor() { super(); }

  start(stream) {
    this.emit('triggered', stream);
    return this;
  }
}

module.exports = StreamTrigger;
