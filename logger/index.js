"use strict";
exports.__esModule = true;
var colors = require("colors");
var winston = require("winston");
var color = function (val) {
    switch (val) {
        case 'ERROR':
            return colors.red(val);
        case 'INFO':
            return colors.green(val);
        case 'DEBUG':
            return colors.bgYellow(val);
        default:
            return val;
    }
};
exports.logger = new (winston.Logger)({
    level: 'debug',
    transports: [
        new (winston.transports.Console)({
            timestamp: function () {
                return new Date();
            },
            formatter: function (options) {
                // Return string will be passed to logger.
                return options.timestamp() +
                    ' ' + color(options.level.toUpperCase()) +
                    ' ' + (options.message ? options.message : '') +
                    (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');
            }
        })
    ]
});
