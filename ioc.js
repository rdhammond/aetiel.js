'use strict';

let ioc = {
  streamTransform: require('stream-transform'),

  Loader: require('./lib/loaders/Loader'),
  Profiles: require('./lib/Profile'),

  extractors: [
    ArrayExtractor: require('./lib/extractors/ArrayExtractor')
  ],

  transformers: [
    LoopbackTransformer: require('./lib/transformers/LoopbackTransformer')
  ],

  loaders: [
    ConsoleLoader: require('./lib/loaders/ConsoleLoader')
  ]
};

// Singletons
ioc.profiles = new Profiles(ioc);

module.exports = ioc;
