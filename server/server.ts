import * as http from "http";
import {logger} from "../logger";
import {Config, isDebug} from "./config/config";
import * as httpProxy from "http-proxy";
import {error} from "util";

/*
 * todo:
 4. subscribe on config.yml
 */

const proxy = httpProxy.createProxyServer();

export const server = (cfg: Config) => {
  // todo: load config file
  // and reset cfg cache.
  // const watcher = new Watcher(__dirname + "/../.fiddler");

  const server = http.createServer((req, res) => {
    if (isDebug())
      logger.debug('url', req.url);

    let target: string;
    for (let rule of cfg.rules) {
      if (req.url.match(rule.from)) {
        target = rule.to;
        break;
      }
    }
    if (isDebug()) {
      logger.log('debug', 'target', target);
    }
    if (!target) {
      res.writeHead(502);
      return res.end('Not found target by route!');
    }
    //
    proxy.web(req, res, {target}, (err: any) => {
      if (isDebug()) {
        logger.debug(err);
      }

      res.writeHead(502);
      res.end(JSON.stringify(err));
    });
  });

  server.on('error', (err: any) => {
    console.log('error', err);
  });

  server.listen(cfg.proxy_server.port, cfg.proxy_server.address, () => {
    const address = server.address();
    logger.info(`Server running at ${address.family} http://${address.address}:${address.port}`);
  });

};

// test
if (require.main === module) {
  server(null)
}