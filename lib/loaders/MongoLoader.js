'use strict';

const DEFAULT_MAX_BATCH_SIZE = 1000;

const Loader = require('./Loader');

class MongoLoader extends Loader {
  constructor(ioc, options) {
    super({objectMode: true });
    this.MongoClient = ioc.mongodb.MongoClient;
    this.connectionString = options.connectionString;
    this.maxBatchSize = options.maxBatchSize || DEFAULT_MAX_BATCH_SIZE;
    this.maps = options.maps;

    this.batch = [];

    this.on('finish', this.commitBatch.bind(this));
  }

  commitBatch() {
    if (this.batch.length === 0)
      return;

    let localBatch = this.batch;
    this.batch = [];

    return new Promise((resolve, reject) => {
      this.MongoClient.connect(this.connectionString, (err, db) => {
        if (err)
          return reject(err);

        return this.upsert(db, localBatch)
          .then(() => db.close())
          .then(() => resolve())
          .catch((e) => {
            this.emit('error', e);
            reject(e);
          });
      });
    });
  }

  load(data) {
    this.batch.push(data);

    if (this.maxBatchSize > 0 && this.batch.length >= this.maxBatchSize)
      this.commitBatch();
  }

  upsert(db, batch) {
    let sequence = Promise.resolve();

    for (var batchItem of batch) {
      for (var map of this.maps) {
        sequence = sequence.then(() => { this.upsertItem(db, batchItem, map) });
      }
    }

    return sequence;
  }

  upsertItem(db, item, map) {
    return new Promise((resolve, reject) => {
      db.collection(map.collection).updateOne(
        this.buildFilter(item, map),
        item,
        { upsert: true },
        (err) => {
          if (err)
            return reject(err);

          resolve();
        }
      );
    });
  }

  buildFilter(item, map) {
    let filter = {};

    for (var key of map.keys.split(',')) {
      filter[key] = item[key];
    }

    return filter;
  }
}

module.exports = MongoLoader;
