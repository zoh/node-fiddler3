"use strict";
exports.__esModule = true;
var index_1 = require("../../logger/index");
var fs = require("fs");
exports.isDebug = function () { return process.env.DEBUG == 'true'; };
function makeUrl(cfg) {
    return (cfg.proxy_server.ssl ? 'https' : 'https') + "://" + cfg.proxy_server.address + ":" + cfg.proxy_server.port;
}
exports.makeUrl = makeUrl;
var yaml = require('js-yaml');
exports.loadConfig = function (configFile) {
    try {
        var data = fs.readFileSync(configFile, 'utf8');
        var doc = yaml.safeLoad(data);
    }
    catch (e) {
        if (e.code == 'ENOENT') {
            index_1.logger.error("Not found config file: " + configFile);
        }
        else {
            index_1.logger.error(e);
        }
        return null;
    }
    if (exports.isDebug()) {
        index_1.logger.info('Loaded config: ', doc);
    }
    return doc;
};
exports.makeConfig = function (filePath, cfgFile) {
    return new Promise(function (resolve, reject) {
        var pack = require('../../package.json');
        var data = yaml.safeDump(cfgFile);
        var res = "# version: " + pack.version + "\r\n";
        res += "# " + pack.repository.git + "\r\n";
        res += "\r\n" + data;
        fs.writeFile(filePath, res, function (err) {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};
