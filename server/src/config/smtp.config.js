"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer_1 = require("nodemailer");
var transporter = (0, nodemailer_1.createTransport)({
    port: 587,
    host: "smtp.gmail.com",
    auth: {
        user: "kashikaryash@gmail.com",
        pass: "lyizepymrfidgreo",
    },
    secure: false,
});
exports.default = transporter;
