'use strict';

module.exports = (ioc, profile) => {
  const Extractor = ioc.Extractors[profile.extractor.name],
    Transformer = ioc.Transformers[profile.transformer.name],
    Loader = ioc.Loaders[profile.loader.name];

  let extractor = new Extractor(ioc, profile.extractor.options);

  extractor.pipe(new Transformer(ioc, profile.transformer.options))
    .pipe(new Loader(ioc, profile.loader.options));

  return extractor;
};
