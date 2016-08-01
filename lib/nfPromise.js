'use strict';

module.exports = function(self, funcName, ...args) {
  return new Promise((res, rej) => {
    try {
      let callback = (err, ...results) => err ? rej(err) : res.apply(this, results),
        f = self[funcName];

      args.push(callback);
      f.apply(self, args);
    }
    catch (e) {
      rej(e);
    }
  });
};
