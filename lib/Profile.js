'use strict';

const events = require('events');

class Profile extends events.EventEmitter {
  constructor(ioc, profileName) {
    super();

    this.ioc = ioc;
    this.config = require(`../profiles/${profileName}`);
    this.Trigger = ioc.Triggers[this.config.trigger.name];
    this.Extractor = ioc.Extractors[this.config.extractor.name];
    this.Transformer = ioc.Transformers[this.config.transformer.name];
    this.Loader = ioc.Loaders[this.config.loader.name];
  }

  run() {
    let trigger = new this.Trigger(this.ioc, this.config.trigger.options);
    trigger.on('triggered', this.onTriggered.bind(this));
    trigger.on('error', this.onError.bind(this));
    trigger.start();
  }

  onTriggered(incomingStream) {
    let extractor = new this.Extractor(this.ioc, this.config.extractor.options),
      transformer = new this.Transformer(this.ioc, this.config.transformer.options),
      loader = new this.Loader(this.ioc, this.config.loader.options);

    incomingStream.pipe(extractor).pipe(transformer).pipe(loader);
  }

  onError(e) {
    this.emit('error', e);
  }
}

module.exports = Profile;
