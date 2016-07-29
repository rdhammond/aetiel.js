'use strict';

module.exports = {
  path: require('path'),
  csv: require('csv'),
  fs: require('fs'),
  stream: require('stream'),
  timers: require('timers'),
  restify: require('restify'),
  mongodb: require('mongodb'),

  config: require('./config'),
  Loader: require('./lib/loaders/Loader'),
  Transformer: require('./lib/transformers/Transformer'),
  Profile: require('./lib/Profile'),
  WatchTimer: require('./lib/WatchTimer'),
  RestifyServer: require('./lib/RestifyServer'),
  ArrayStream: require('./lib/ArrayStream'),

  Triggers: {
    ArrayTrigger: require('./lib/triggers/ArrayTrigger'),
    FileTrigger: require('./lib/triggers/FileTrigger'),
    FolderWatchTrigger: require('./lib/triggers/FolderWatchTrigger'),
    RestTrigger: require('./lib/triggers/RestTrigger'),
    StreamTrigger: require('./lib/triggers/StreamTrigger')
  },

  Extractors: {
    PassthroughExtractor: require('./lib/extractors/PassthroughExtractor'),
    CSVExtractor: require('./lib/extractors/CSVExtractor')
  },

  Transformers: {
    LoopbackTransformer: require('./lib/transformers/LoopbackTransformer')
  },

  Loaders: {
    ConsoleLoader: require('./lib/loaders/ConsoleLoader'),
    MongoLoader: require('./lib/loaders/MongoLoader')
  }
};
