'use strict';

const stream = require('stream'),
  rgxSpecificType = / ([^\]]+)\]$/;

class ArrayExtractor extends stream.Transform {
  constructor(ioc, options) {
    super({ objectMode: true });

    this.data = options.data;
  }

  start() {
    return new Promise((resolve) => {
      this.write(this.data);
      this.end();
      resolve();
    });
  }

  typeOf(obj) {
    return rgxSpecificType.exec(
      Object.prototype.toString.call(obj)
    )[1];
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
