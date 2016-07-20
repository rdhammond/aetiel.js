'use strict';

const events = require('events');

class Profile extends events.EventEmitter {
  constructor(ioc, name, config) {
    super();
    this.ioc = ioc;

    this.name = name;
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

  onTriggered(incomingStream, dontEmitAfter) {
    let extractor = new this.Extractor(this.ioc, this.config.extractor.options),
      transformer = new this.Transformer(this.ioc, this.config.transformer.options),
      loader = new this.Loader(this.ioc, this.config.loader.options);

    let finalStream = incomingStream
      .pipe(extractor)
      .pipe(transformer)
      .pipe(loader)
      .on('error', (e) => { this.emit('error', e); });

    if (!dontEmitAfter)
      finalStream.on('finish', () => { this.emit('done'); })
  }
}

Profile.loadProfiles = (ioc) => {
  let profiles = new Map(),
    path = ioc.config.profiles.path || 'profiles';

  for (var name of ioc.config.profiles.start) {
    let fileLoc = ioc.path.join(path, name + '.json').replace(/\\/g, '/');

    if (fileLoc.charAt(0) != '/')
      fileLoc = '../' + fileLoc;

    let config = require(fileLoc);
    profiles.set(name, new Profile(ioc, name, config));
  }

  return profiles;
};

module.exports = Profile;
