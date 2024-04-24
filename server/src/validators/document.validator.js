"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentValidator = void 0;
var express_validator_1 = require("express-validator");
var DocumentValidator = /** @class */ (function () {
    function DocumentValidator() {
        this.update = [
            (0, express_validator_1.body)("title")
                .optional()
                .isLength({ min: 0, max: 25 })
                .withMessage("Title must be between 0 and 25 characters."),
            // body("content")
            //   .optional()
            //   .custom((value) => {
            //     try {
            //       JSON.parse(value);
            //     } catch (error) {
            //       console.log(error);
            //       throw new Error("Invalid document content.");
            //     }
            //   }),
            (0, express_validator_1.body)("isPublic")
                .optional()
                .isBoolean()
                .withMessage("Must provide true or false value"),
        ];
    }
    return DocumentValidator;
}());
var documentValidator = new DocumentValidator();
exports.documentValidator = documentValidator;
