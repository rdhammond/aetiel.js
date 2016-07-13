'use strict';

const stream = require('stream');

class ArrayExtractor extends stream.Transform {
  constructor(ioc, array) {
    super({
      writableObjectMode: true,
      readableObjectMode: true
    });

    this.data = options.data;
    this.typeOf = ioc.typeOf.bind(this);
  }

  start() {
    this.write(this.data);
  }

  _transform(chunk, encoding, callback) {
    if (this.typeOf(chunk) !== 'Array')
      return callback(new Error(
        'ArrayExtractor can only have arrays written to it.'
      ));

    for (var item of chunk)
      this.push(item);

    callback();
  }
}

module.exports = ArrayExtractor;
