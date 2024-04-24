"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
var express_validator_1 = require("express-validator");
var catch_async_1 = require("../../middleware/catch-async");
var user_service_1 = require("../../services/user.service");
var responses_1 = require("../../responses");
var jsonwebtoken_1 = require("jsonwebtoken");
var UserController = /** @class */ (function () {
    function UserController() {
        var _this = this;
        this.register = (0, catch_async_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var err, _a, email, password1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        err = (0, express_validator_1.validationResult)(req);
                        if (!err.isEmpty) {
                            return [2 /*return*/, res.status(400).json(err)];
                        }
                        _a = req.body, email = _a.email, password1 = _a.password1;
                        return [4 /*yield*/, user_service_1.userService.createUser(email, password1)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, res.sendStatus(200)];
                }
            });
        }); });
        this.getUser = (0, catch_async_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = parseInt(req.params.id);
                        return [4 /*yield*/, user_service_1.userService.findUserById(userId)];
                    case 1:
                        user = _a.sent();
                        if (user === null)
                            return [2 /*return*/, res.sendStatus(400)];
                        return [2 /*return*/, res.status(200).json(user)];
                }
            });
        }); });
        this.resetPassword = (0, catch_async_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var err, email, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        err = (0, express_validator_1.validationResult)(req);
                        if (!err.isEmpty()) {
                            return [2 /*return*/, res.status(400).json(err)];
                        }
                        email = req.body.email;
                        return [4 /*yield*/, user_service_1.userService.findUserByEmail(email)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, res.status(200).json(responses_1.resetPassword)];
                        return [4 /*yield*/, user_service_1.userService.resetPassword(user)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.status(200).json(responses_1.resetPassword)];
                }
            });
        }); });
        this.verifyEmail = (0, catch_async_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var verificationToken, decoded, user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        verificationToken = req.params.token;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, jsonwebtoken_1.default.verify(verificationToken, "verify_email")];
                    case 2:
                        decoded = _a.sent();
                        return [4 /*yield*/, user_service_1.userService.findUserByVerificationToken(decoded.email, verificationToken)];
                    case 3:
                        user = _a.sent();
                        if (!user || user.isVerified) {
                            return [2 /*return*/, res.sendStatus(400)]; // Bad request if user not found or already verified
                        }
                        return [4 /*yield*/, user_service_1.userService.updateIsVerified(user, true)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, res.sendStatus(200)]; // Success
                    case 5:
                        error_1 = _a.sent();
                        console.error("Error verifying email:", error_1);
                        return [2 /*return*/, res.sendStatus(403)]; // Forbidden for invalid tokens or other errors
                    case 6: return [2 /*return*/];
                }
            });
        }); });
        this.confirmResetPassword = (0, catch_async_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var err, resetPasswordToken, password1;
            var _this = this;
            return __generator(this, function (_a) {
                err = (0, express_validator_1.validationResult)(req);
                if (!err.isEmpty()) {
                    return [2 /*return*/, res.status(400).json(err)];
                }
                resetPasswordToken = req.params.token;
                password1 = req.body.password1;
                jsonwebtoken_1.default.verify(resetPasswordToken, "password_reset", function (err, decoded) { return __awaiter(_this, void 0, void 0, function () {
                    var email;
                    return __generator(this, function (_a) {
                        if (err)
                            return [2 /*return*/, res.sendStatus(403)];
                        try {
                            email = decoded.email;
                            user_service_1.userService
                                .findUserByPasswordResetToken(email, resetPasswordToken)
                                .then(function (user) {
                                if (!user) {
                                    return res.sendStatus(400);
                                }
                                user_service_1.userService
                                    .updatePassword(user, password1)
                                    .then(function () {
                                    return res.sendStatus(200);
                                })
                                    .catch(function () {
                                    return res.sendStatus(500);
                                });
                            })
                                .catch(function () {
                                return res.sendStatus(500);
                            });
                        }
                        catch (error) {
                            console.log(error);
                            return [2 /*return*/, res.sendStatus(403)];
                        }
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        }); });
    }
    return UserController;
}());
var userController = new UserController();
exports.userController = userController;
