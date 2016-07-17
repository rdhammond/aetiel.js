'use strict';

const events = require('events');

class WatchTimer extends events.EventEmitter {
  constructor(ioc) {
    super();
    this.timers = ioc.timers;
  }

  restart(timeoutMs) {
    if (this.timer)
      this.timers.clearTimeout(this.timer);

    this.timer = this.timers.setTimeout(
      () => { this.emit('tick'); },
      timeoutMs
    );
  }
}

module.exports = WatchTimer;
