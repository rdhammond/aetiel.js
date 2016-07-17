'use strict';

const stream = require('stream');

class ArrayStream extends stream.Readable {
  constructor(data) {
    super({ objectMode: true });
    this.data = data;
  }

  _read(size) {
    for (var datum of this.data)
      this.push(datum);

    this.push(null);
  }
}

module.exports = ArrayStream;
