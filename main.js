'use strict';

const ioc = require('./ioc');
ioc.profiles = loadProfiles();

var restifyServer;

// ** TODO: Scheduling, etc.
if (ioc.config.restify) {
  restifyServer = new ioc.RestifyServer(ioc);
  restifyServer.start();
}

/*let request = {
  body: [1,2,3,4]
};

ioc.profiles.get('restifyArrayProfile').run(request)
  .on('end', () => { console.log('Finished.'); })
  .on('error', () => { console.log(e); });*/

function loadProfiles() {
  let profiles = new Map(),
    path = ioc.config.profilesPath || 'profiles',
    filenames = ioc.fs.readdirSync(path).filter(x => /\.json$/i.test(x));

  for (var filename of filenames) {
    let name = filename.split('.')[0],
      fileLoc = ioc.path.join(path, filename).replace(/\\/g, '/');

    if (fileLoc.charAt(0) != '/')
      fileLoc = './' + fileLoc;

    let config = require(fileLoc);
    profiles.set(name, new ioc.Profile(ioc, config));
  }

  return profiles;
}
