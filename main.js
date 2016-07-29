'use strict';

const ioc = require('./ioc');

var restifyServer;

for (var profile of ioc.Profile.loadProfiles(ioc)) {
  if (profile.config.trigger.name === 'RestTrigger' && !restifyServer)
    restifyServer = startRestify();

  // ** TODO: Better logging
  let promise = profile.run().on('error', (e) => { console.error(e); });

  if (!profile.config.trigger.isWatch)
    promise = promise.on('done', () => { console.log(`${profile.name} finished.`) });
}

function startRestify() {
  let server = new ioc.RestifyServer(ioc);
  server.start();
  return server;
}
