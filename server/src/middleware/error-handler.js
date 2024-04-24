"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorHandler = function (err, req, res, next) {
    console.log(err);
    res.sendStatus(500);
};
exports.default = errorHandler;
