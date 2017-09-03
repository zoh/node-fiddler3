import {logger} from "../../logger/index";
import * as fs from "fs";

export const isDebug = () => process.env.DEBUG == 'true';

export interface Config {
  proxy_server: {
    address: string
    port: number
    ssl?: boolean
  }
  rules?: Rule[]
}

export function makeUrl(cfg: Config): string {
  return `${cfg.proxy_server.ssl ? 'https' : 'https'}://${cfg.proxy_server.address}:${cfg.proxy_server.port}`
}

export interface Rule {
  from: string
  to: string
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
  if (isDebug()) {
    logger.info('Loaded config: ', doc);
  }

  return doc
};


export const makeConfig = (filePath: string, cfgFile: Config): Promise<any> => {
  return new Promise((resolve, reject) => {

    const pack = require('../../package.json');
    const data = yaml.safeDump(cfgFile);

    let res = `# version: ${pack.version}\r\n`;
    res += `# ${pack.repository.git}\r\n`;
    res += "\r\n" + data;

    fs.writeFile(filePath, res, err => {
      if (err) {
        return reject(err)
      }
      resolve();
    });

  })
};