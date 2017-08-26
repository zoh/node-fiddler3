"use strict";
/**
 * Created by zoh on 16.02.17.
 */
exports.__esModule = true;
var http = require("http");
var stream_1 = require("stream");
exports["default"] = function () {
    return new Promise(function (resolve, reject) {
        http.get("http://thestockmasters.com/files/images/sparta-kick.png", function (response) {
            var data = new stream_1.Transform();
            response.on('data', function (chunk) {
                data.push(chunk);
            });
            response.on('end', function () {
                resolve(data.read());
            });
        });
    });
};
