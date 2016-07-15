'use strict';

// ** TODO: Actual scheduling, etc.
const ioc = require('./ioc');

let profile = new ioc.Profile(ioc, 'testProfile');

profile.run()
  .then(() => { console.log('Finished.'); })
  .catch((e) => { console.log(e); });
