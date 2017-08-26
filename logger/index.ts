///<reference path="../typings/modules/colors/index.d.ts"/>
///<reference path="../typings/modules/winston/index.d.ts"/>

import colors = require("colors")
import winston = require("winston")


const color = (val) => {
  switch (val) {
    case 'ERROR':
      return colors.red(val);
    case 'INFO':
      return colors.green(val);
    default:
      return val
  }
};

var logger = new (winston.Logger)({
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
          (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '' );
      }
    })
  ]
});


export default logger