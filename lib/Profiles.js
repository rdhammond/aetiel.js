'use strict';

module.exports = (ioc) => {
  let profiles = new Map();

  for (var profileName of ioc.config.profiles)
    profiles.set(profileName, require(`${__dirname}/${name}.json`);

  return profiles;
};
