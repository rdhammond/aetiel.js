'use strict';

module.exports = {
  path: require('path'),
  csv: require('csv'),
  fs: require('fs'),

  config: require('./config'),
  Loader: require('./lib/loaders/Loader'),
  Transformer: require('./lib/transformers/Transformer'),
  Profile: require('./lib/Profile'),

  Extractors: {
    ArrayExtractor: require('./lib/extractors/ArrayExtractor'),
    CSVExtractor: require('./lib/extractors/CSVExtractor')
  },

  Transformers: {
    LoopbackTransformer: require('./lib/transformers/LoopbackTransformer')
  },

  Loaders: {
    ConsoleLoader: require('./lib/loaders/ConsoleLoader')
  }
};
