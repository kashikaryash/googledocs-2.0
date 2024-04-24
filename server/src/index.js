"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var models_1 = require("./db/models");
var routes_1 = require("./routes");
var cors_1 = require("cors");
var error_handler_1 = require("./middleware/error-handler");
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use(routes_1.default);
app.use(error_handler_1.default);
var port = 8080;
models_1.default.sequelize.sync();
exports.default = app;
