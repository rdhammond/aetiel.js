'use strict';

const stream = require('stream');

module.exports = function(ioc, options) {
  return ioc.csv.parse(options);
};
