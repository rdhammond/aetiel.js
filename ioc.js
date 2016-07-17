'use strict';

module.exports = {
  path: require('path'),
  csv: require('csv'),
  fs: require('fs'),
  stream: require('stream'),
  timers:require('timers'),

  Loader: require('./lib/loaders/Loader'),
  Transformer: require('./lib/transformers/Transformer'),
  Profile: require('./lib/Profile'),
  WatchTimer: require('./lib/WatchTimer'),

  Triggers: {
    ArrayTrigger: require('./lib/triggers/ArrayTrigger'),
    FileTrigger: require('./lib/triggers/FileTrigger'),
    FolderWatchTrigger: require('./lib/triggers/FolderWatchTrigger')
  },

  Extractors: {
    PassthroughExtractor: require('./lib/extractors/PassthroughExtractor'),
    CSVExtractor: require('./lib/extractors/CSVExtractor')
  },

  Transformers: {
    LoopbackTransformer: require('./lib/transformers/LoopbackTransformer')
  },

  Loaders: {
    ConsoleLoader: require('./lib/loaders/ConsoleLoader')
  }
};
