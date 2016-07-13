module.exports = {
  streamTransform: require('stream-transform'),

  Loader: require('./lib/loaders/Loader'),

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
