'use strict';

const events = require('events');

class FileTrigger extends events.EventEmitter {
  constructor(ioc, options) {
    super();

    this.fs = ioc.fs;
    this.filename = options.filename;
  }

  start() {
    try {
      this.emit('triggered', this.fs.createReadStream(this.filename));
    }
    catch(e) {
      this.emit('error', e);
    }

    return this;
  }
}

module.exports = FileTrigger;
