'use strict';

const Transformer = require('./transformer');

class LoopbackTransformer extends Transformer {
  constructor() {
    super();
  }

  transform(data) {
    return data;
  }
}

module.exports = LoopbackTransformer;
