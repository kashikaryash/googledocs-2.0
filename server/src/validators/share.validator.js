"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shareValidator = void 0;
var express_validator_1 = require("express-validator");
var permission_enum_1 = require("../types/enums/permission-enum");
var ShareValidator = /** @class */ (function () {
    function ShareValidator() {
        this.create = [
            (0, express_validator_1.body)("email")
                .isEmail()
                .normalizeEmail()
                .withMessage("Must provide a valid email to share this document with."),
            (0, express_validator_1.body)("permission").custom(function (value) {
                if (!Object.values(permission_enum_1.default).includes(value))
                    throw new Error("Must provide a valid document permisson.");
                else
                    return true;
            }),
        ];
    }
    return ShareValidator;
}());
var shareValidator = new ShareValidator();
exports.shareValidator = shareValidator;
