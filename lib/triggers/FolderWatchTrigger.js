'use strict';

const CHANGE_DELAY_MS = 2000,
  events = require('events');

class FolderWatchTrigger extends events.EventEmitter {
  constructor(ioc, options) {
    super();
    this.ioc = ioc;
    this.fs = ioc.fs;
    this.path = ioc.path;
    this.WatchTimer = ioc.WatchTimer;

    this.folder = options.path;
    this.filter = new RegExp(this.filter || '^.*$', 'i');
    this.timers = new Map();
  }

  start() {
    this.watch = this.createWatch(this.folder);
  }

  createWatch(path) {
    let watch = this.fs.watch(path);
    watch.on('change', this.onChange.bind(this));
    watch.on('error', this.onError.bind(this));
    return watch;
  }

  onChange(event, filename) {
    if (event !== 'change' || !this.filter.test(filename))
      return;

    let timer = this.timers.get(filename);

    if (!timer) {
      timer = new this.WatchTimer(this.ioc);
      timer.on('tick', () => { this.onTick(filename); });
      this.timers.set(filename, timer);
    }

    timer.restart(CHANGE_DELAY_MS);
  }

  onTick(filename) {
    this.timers.delete(filename);

    let fullPath = this.path.join(this.folder, filename),
      stream = this.fs.createReadStream(fullPath);

    stream.on('end', () => { this.onEnd(filename); });
    this.emit('triggered', stream);
  }

  onEnd(filename) {
    let fullPath = this.path.join(this.folder, filename);
    this.fs.unlink(fullPath, (e) => { this.onError(e); });
  }

  onError(e) {
    if (e) this.emit('error', e);
  }
}

module.exports = FolderWatchTrigger;
