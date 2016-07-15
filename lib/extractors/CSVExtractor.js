'use strict';

const stream = require('stream');

class CSVExtractor extends stream.Transform {
  constructor(ioc, options) {
    super({ objectMode: true });

    this.fs = ioc.fs;
    this.csv = ioc.csv;

    this.filename = options.filename;
    delete options.filename;
    this.options = options;
  }

  start() {
    return new Promise((resolve, reject) => {
      this.fs.createReadStream(this.filename)
        .pipe(this.csv.parse(this.options))
        .pipe(this)
        .on('finish', () => { resolve(); })
        .on('error', (e) => { reject(e); });
    });
  }

  _transform(chunk, encoding, callback) {
    callback(null, chunk);
  }
}

module.exports = CSVExtractor;
