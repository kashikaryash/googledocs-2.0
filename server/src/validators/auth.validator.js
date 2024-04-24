"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidator = void 0;
var express_validator_1 = require("express-validator");
var AuthValidator = /** @class */ (function () {
    function AuthValidator() {
        this.login = [
            (0, express_validator_1.body)("email")
                .isEmail()
                .normalizeEmail()
                .withMessage("Must provide a valid email address"),
            (0, express_validator_1.body)("password").exists().withMessage("Must provide a password"),
        ];
        this.refreshToken = [
            (0, express_validator_1.body)("token").exists().withMessage("Must provide a valid token."),
        ];
    }
    return AuthValidator;
}());
var authValidator = new AuthValidator();
exports.authValidator = authValidator;
