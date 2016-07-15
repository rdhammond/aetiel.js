'use strict';

module.exports = {
  path: require('path'),
  q: require('q'),

  config: require('./config'),
  Loader: require('./lib/loaders/Loader'),
  Transformer: require('./lib/transformers/Transformer'),
  Profile: require('./lib/Profile'),

  Extractors: {
    ArrayExtractor: require('./lib/extractors/ArrayExtractor')
  },

  Transformers: {
    LoopbackTransformer: require('./lib/transformers/LoopbackTransformer')
  },

  Loaders: {
    ConsoleLoader: require('./lib/loaders/ConsoleLoader')
  }
};
