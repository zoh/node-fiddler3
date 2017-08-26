"use strict";
exports.__esModule = true;
var http = require("http");
var fs = require("fs");
var request_1 = require("./proxy/request");
var logger_1 = require("../logger");
// TODO: что нужно сделать
/*
 1! отправку через http.request тестовую хотябы за картинкой
 2. описать интерфейс для настройки вебсервреа
 3. парсинг файла config.json
 */
exports.server = function (cfg) {
    // todo: load config file
    // const watcher = new Watcher(__dirname + "/../.fiddler");
    var server = http.createServer(function (req, res) {
        request_1["default"]().then(function (data) {
            console.log('OK!', data);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        });
    });
    server.listen(cfg.proxy_server.port, cfg.proxy_server.address, function () {
        var address = server.address();
        logger_1["default"].info("Server running at " + address.family + " http://" + address.address + ":" + address.port);
    });
};
var yaml = require('js-yaml');
exports.loadConfig = function (configFile) {
    try {
        var data = fs.readFileSync(configFile, 'utf8');
        var doc = yaml.safeLoad(data);
    }
    catch (e) {
        if (e.code == 'ENOENT') {
            logger_1["default"].error("Not found config file: " + configFile);
        }
        else {
            logger_1["default"].error(e);
        }
        return null;
    }
    return doc;
};
// test
if (require.main === module) {
    exports.server(null);
}
