/**
 * Created by zoh on 16.02.17.
 */

import http = require('http');
import {Transform} from "stream";


export default () => {
  return new Promise((resolve, reject) => {
    http.get("http://thestockmasters.com/files/images/sparta-kick.png", response => {
      var data = new Transform();

      response.on('data', function (chunk) {
        data.push(chunk);
      });

      response.on('end', function () {
        resolve(data.read());
      });

    });

  });
};