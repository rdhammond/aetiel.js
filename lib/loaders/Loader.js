'use strict';

const stream = require('stream');

class Loader extends stream.Writable {
  constructor(options) {
    super({objectMode: true});
    this.options = options;
  }

  _write(chunk, encoding, callback) {
    try {
      this.load(chunk);
      callback();
    }
    catch (e) {
      callback(e);
    }
  }

  load(data) {
    throw new Error('Loader is an abstract class. Please implement load().')
  }
}

module.exports = Loader;
