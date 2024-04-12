"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = require("nodemailer");
const transporter = (0, nodemailer_1.createTransport)({
    port: 587,
    host: "smtp.gmail.com",
    auth: {
        user: "kashikaryash@gmail.com",
        pass: "lyizepymrfidgreo",
    },
    secure: false,
});
exports.default = transporter;
