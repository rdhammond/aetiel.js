'use strict';

const stream = require('stream');

class PassthroughExtractor extends stream.Transform {
  constructor(ioc) {
    super({ objectMode: true });
  }

  _transform(chunk, encoding, callback) {
    callback(null, chunk);
  }
}

module.exports = PassthroughExtractor;
