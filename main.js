'use strict';

const ioc = require('./ioc');
Array.prototype.any = any;
Array.prototype.contains = contains;

var restifyServer;

ioc.profiles = ioc.Profile.loadProfiles(ioc);
let profiles = Array.from(ioc.profiles.values());

if (profiles.any(x => x.config.trigger.name === 'RestTrigger')) {
  restifyServer = new ioc.RestifyServer(ioc);
  restifyServer.start();
}

let watchProfiles = profiles.filter(x => x.config.trigger.name === 'FolderWatchTrigger');

for (var profile of watchProfiles) {
  // ** TODO: Better logging
  profile.run().on('error', (e) => { console.error(e); });
}

let oneShotProfiles = profiles.filter(x =>
  !['RestTrigger', 'FolderWatchTrigger'].contains(x.config.trigger.name)
);

for (var profile of oneShotProfiles) {
  // ** TODO: Better logging
  profile.run()
    .on('error',(e) => { console.error(e) })
    .on('done', () => { console.log(`${profile.name} finished.`); });
}

console.log('Running one-shot profiles.');

function any(conditionCallback) {
  return this.reduce((prev, current) => prev || conditionCallback(current));
};

function contains(val) {
  return this.indexOf(val) >= 0;
}
