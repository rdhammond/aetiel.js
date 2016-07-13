'use strict';

const stream = require('stream');

class Loader extends stream.WriteableStream {
  constructor() {
    super({writableObjectMode: true});
  }

  _write(chunk, encoding, callback) {
    try {
      load(chunk);
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
