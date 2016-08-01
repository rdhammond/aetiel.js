'use strict';

const DEFAULT_MAX_BATCH_SIZE = 1000;

const Loader = require('./Loader');

class MongoLoader extends Loader {
  constructor(ioc, options) {
    super({objectMode: true });
    this.MongoClient = ioc.mongodb.MongoClient;
    this._ = ioc._
    this.sequence = ioc.sequence;
    this.nfPromise = ioc.nfPromise;

    this.connectionString = options.connectionString;
    this.maxBatchSize = options.maxBatchSize || DEFAULT_MAX_BATCH_SIZE;
    this.maps = options.maps;
    this.batch = [];

    this.on('finish', this.commitBatch.bind(this));
  }

  load(data) {
    this.batch.push(data);

    if (this.maxBatchSize > 0 && this.batch.length >= this.maxBatchSize)
      this.commitBatch();
  }

  commitBatch() {
    var _db;

    if (this.batch.length === 0)
      return;

    let localBatch = this.batch;
    this.batch = [];

    return this.connect()
      .then(db => { _db = db; return this.upsertBatch(db, localBatch); })
      .catch(e => this.emit('error', e))
      .then(() => { if (_db) _db.close(); });
  }

  connect() {
    return this.nfPromise(this.MongoClient, 'connect', this.connectionString);
  }

  upsertBatch(db, batch) {
    return this.sequence(batch, x => this.upsertItem(db, x));
  }

  upsertItem(db, item) {
    return this.sequence(this.maps, x => this.upsertMappedItem(db, item, x));
  }

  upsertMappedItem(db, item, map) {
    let keys = this._.pick(item, map.keys),
      values = map.values ? this._.pick(item, map.values) : item,
      collection = db.collection(map.collection);

    return this.nfPromise(collection, 'updateOne', keys, values, {upsert: true});
  }
}

module.exports = MongoLoader;
