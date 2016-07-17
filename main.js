'use strict';

// ** TODO: Actual scheduling, etc.
const ioc = require('./ioc');

let profile = new ioc.Profile(ioc, 'folderWatchLoopback');
profile.on('error', (e) => { console.error(e); });
profile.run();
