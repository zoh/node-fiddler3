"use strict";
exports.__esModule = true;
var logger_1 = require("../logger");
var chokidar = require("chokidar");
var Watcher = (function () {
    function Watcher(dir) {
        var watcher = chokidar.watch(dir, { ignoreInitial: true, persistent: true });
        logger_1["default"].info("Start watch dir: " + dir);
        // todo: check config.yml
        // todo: check rules.yml
        watcher
            .on('add', function (path) {
            console.log('File', path, 'has been added');
        })
            .on('change', function (path) {
            console.log('File', path, 'has been changed');
        })
            .on('unlink', function (path) {
            console.log('File', path, 'has been removed');
        })
            .on('error', function (error) {
            console.error('Error happened', error);
        });
    }
    return Watcher;
}());
exports.Watcher = Watcher;
