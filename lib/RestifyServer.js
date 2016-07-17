'use strict';

const DEFAULT_PORT = 8081;

class RestifyServer {
  constructor(ioc) {
    this.profiles = ioc.profiles;
    this.port = ioc.config.restify.port || DEFAULT_PORT;
    this.server = this.createServer(ioc);
  }

  createServer(ioc) {
    let server = ioc.restify.createServer({ name: 'Aetiel' });
    server.use(ioc.restify.bodyParser());
    server.pre(ioc.restify.pre.userAgentConnection());
    server.post(`/:profileName`, this.onPost.bind(this));
    return server;
  }

  onPost(req, res, next) {
    let profile = this.profiles.get(req.params.profileName);

    if (profile.config.trigger.name !== 'RestTrigger')
      return next();

    profile
      .on('end', () => { res.send(200); })
      .on('error', e => {
        // ** TODO: Unified error logging
        console.log(e.message);
        res.send(500);
      })
      .run(req);
  }

  start() {
    this.server.listen(
      this.port,
      () => { console.log(`Aetiel listening for REST on ${this.port}`); }
    );
  }
}

module.exports = RestifyServer;
