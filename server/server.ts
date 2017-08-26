import * as http from "http";
import * as fs from 'fs';
import request from "./proxy/request";
import {Watcher} from "./watcher"
import logger from '../logger'
import {resolve} from "url";



// TODO: что нужно сделать
/*
 1! отправку через http.request тестовую хотябы за картинкой
 2. описать интерфейс для настройки вебсервреа
 3. парсинг файла config.json
 */


export const server = (cfg: Config) => {
  // todo: load config file
  // const watcher = new Watcher(__dirname + "/../.fiddler");

  const server = http.createServer((req, res) => {
    request().then(data => {
      console.log('OK!', data);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(data);
    });

  });
  server.listen(cfg.proxy_server.port, cfg.proxy_server.address, () => {
    const address = server.address();
    logger.info(`Server running at ${address.family} http://${address.address}:${address.port}`);
  });

};


interface Config {
  proxy_server: {
    address: string
    port: number
  }
}

const yaml = require('js-yaml');
export const loadConfig = (configFile:string): Config => {
  try {
    const data = fs.readFileSync(configFile, 'utf8');
    var doc = yaml.safeLoad(data);
  } catch (e) {
    if (e.code == 'ENOENT') {
      logger.error("Not found config file: " + configFile);
    } else {
      logger.error(e)
    }
    return null
  }
  return doc
};


// test
if (require.main === module) {
  server(null)
}