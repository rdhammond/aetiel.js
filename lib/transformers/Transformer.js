'use strict';

const stream = require('stream');

class Transformer extends stream.Transform {
  constructor(options) {
    super({objectMode: true});
    this.options = options;
  }

  _transform(chunk, encoding, callback) {
    try {
      callback(null, this.transform(chunk));
    }
    catch (e) {
      callback(e);
    }
  }

  transform(data) {
    throw new Error('Transformer is an abstract class. Please implement \
      transform().');
  }
}

module.exports = Transformer;
