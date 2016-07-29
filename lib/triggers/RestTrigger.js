'use strict';

const events = require('events');

class RestTrigger extends events.EventEmitter {
  constructor(ioc) {
    super();
    this.ArrayStream = ioc.ArrayStream;
    this.isWatch = true;
  }

  start(request) {
    if (this.typeOf(request.body) !== 'Array')
        request.body = request.body.container || [request.body];

    let stream = new this.ArrayStream(request.body);
    stream.on('end', () => { this.emit('end'); });
    this.emit('triggered', stream);

    return this;
  }

  typeOf(obj) {
    let extendedType = Object.prototype.toString.call(typeof obj);
    return / ([^\]]+)\]$/.exec(extendedType);
  }
}

module.exports = RestTrigger;
