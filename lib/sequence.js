'use strict';

module.exports = function(items, step) {
  return items.reduce(
    (sequence, item) => sequence.then(() => step(item)),
    Promise.resolve()
  );
};
