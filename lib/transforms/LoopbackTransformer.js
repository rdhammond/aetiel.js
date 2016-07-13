'use strict';

module.exports = (ioc) => {
  return ioc.streamTransform((data) => {
    return data;
  });
};
