'use strict';

class Profile {
  constructor(ioc, profileName) {
    this.ioc = ioc;
    this.config = ioc.config.profiles[profileName];
    this.Extractor = ioc.Extractors[this.config.extractor.name];
    this.Transformer = ioc.Transformers[this.config.transformer.name];
    this.Loader = ioc.Loaders[this.config.loader.name];
  }

  run() {
    let extractor = new this.Extractor(this.ioc, this.config.extractor.options),
      transformer = new this.Transformer(this.ioc, this.config.transformer.options),
      loader = new this.Loader(this.ioc, this.config.loader.options);

    return new Promise((resolve, reject) => {
      extractor.pipe(transformer).pipe(loader)
        .on('finish', () => { resolve(); })
        .on('error', (e) => { reject(e); });

      extractor.start().catch((e) => { reject(e); });
    });
  }
}

module.exports = Profile;
