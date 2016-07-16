'use strict';

// ** TODO: Actual scheduling, etc.
const ioc = require('./ioc');

let profile = new ioc.Profile(ioc, 'csvLoopbackProfile');
profile.on('error', (e) => { console.error(e); });
profile.run();
