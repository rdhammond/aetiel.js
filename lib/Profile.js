'use strict';

const events = require('events');

class Profile extends events.EventEmitter {
  constructor(ioc, config) {
    super();
    this.ioc = ioc;

    this.config = config;
    this.Trigger = ioc.Triggers[config.trigger.name];
    this.Extractor = ioc.Extractors[config.extractor.name];
    this.Transformer = ioc.Transformers[config.transformer.name];
    this.Loader = ioc.Loaders[config.loader.name];
  }

  run(...params) {
    let trigger = new this.Trigger(this.ioc, this.config.trigger.options)
      .on('triggered', this.onTriggered.bind(this))
      .on('error', e => { this.emit('error', e); })
      .start(...params);

    return this;
  }

  onTriggered(incomingStream) {
    let extractor = new this.Extractor(this.ioc, this.config.extractor.options),
      transformer = new this.Transformer(this.ioc, this.config.transformer.options),
      loader = new this.Loader(this.ioc, this.config.loader.options);

    incomingStream
      .pipe(extractor)
      .pipe(transformer)
      .pipe(loader)
      .on('end', () => { this.emit('end'); })
      .on('error', (e) => { this.emit('error', e); });
  }
}

module.exports = Profile;
