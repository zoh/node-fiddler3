"use strict";
exports.__esModule = true;
var http = require("http");
var logger_1 = require("../logger");
var config_1 = require("./config/config");
var httpProxy = require("http-proxy");
/*
 * todo:
 4. subscribe on config.yml
 */
var proxy = httpProxy.createProxyServer();
exports.server = function (cfg) {
    // todo: load config file
    // and reset cfg cache.
    // const watcher = new Watcher(__dirname + "/../.fiddler");
    var server = http.createServer(function (req, res) {
        if (config_1.isDebug())
            logger_1.logger.debug('url', req.url);
        var target;
        for (var _i = 0, _a = cfg.rules; _i < _a.length; _i++) {
            var rule = _a[_i];
            if (req.url.match(rule.from)) {
                target = rule.to;
                break;
            }
        }
        if (config_1.isDebug()) {
            logger_1.logger.log('debug', 'target', target);
        }
        if (!target) {
            res.writeHead(502);
            return res.end('Not found target by route!');
        }
        //
        proxy.web(req, res, { target: target }, function (err) {
            if (config_1.isDebug()) {
                logger_1.logger.debug(err);
            }
            res.writeHead(502);
            res.end(JSON.stringify(err));
        });
    });
    server.on('error', function (err) {
        console.log('error', err);
    });
    server.listen(cfg.proxy_server.port, cfg.proxy_server.address, function () {
        var address = server.address();
        logger_1.logger.info("Server running at " + address.family + " http://" + address.address + ":" + address.port);
    });
};
// test
if (require.main === module) {
    exports.server(null);
}
