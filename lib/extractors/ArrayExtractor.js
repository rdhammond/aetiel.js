'use strict';

module.exports = (ioc, values) => {
  let stream = ioc.stream.createWriteStream({objectMode: true});

  for (var value of values) {
    stream.write(value);
  }

  return stream;
};
