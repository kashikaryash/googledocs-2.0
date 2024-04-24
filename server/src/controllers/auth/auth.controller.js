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
exports.authController = void 0;
var express_validator_1 = require("express-validator");
var catch_async_1 = require("../../middleware/catch-async");
var user_service_1 = require("../../services/user.service");
var responses_1 = require("../../responses");
var jsonwebtoken_1 = require("jsonwebtoken");
var AuthController = /** @class */ (function () {
    function AuthController() {
        var _this = this;
        this.login = (0, catch_async_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var err, _a, email, password, user, validPassword, authResponse;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        err = (0, express_validator_1.validationResult)(req);
                        if (!err.isEmpty) {
                            return [2 /*return*/, res.status(400).json(err)];
                        }
                        _a = req.body, email = _a.email, password = _a.password;
                        return [4 /*yield*/, user_service_1.userService.findUserByEmail(email)];
                    case 1:
                        user = _b.sent();
                        if (!user)
                            return [2 /*return*/, res.status(401).json({ errors: responses_1.userNotFound })];
                        return [4 /*yield*/, user_service_1.userService.checkPassword(user, password)];
                    case 2:
                        validPassword = _b.sent();
                        if (!validPassword)
                            return [2 /*return*/, res.status(401).json({ errors: responses_1.userNotFound })];
                        return [4 /*yield*/, user_service_1.userService.generateAuthResponse(user)];
                    case 3:
                        authResponse = _b.sent();
                        return [2 /*return*/, res.status(200).json(authResponse)];
                }
            });
        }); });
        this.refreshToken = (0, catch_async_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var err, refreshToken, isTokenActive;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        err = (0, express_validator_1.validationResult)(req);
                        if (!err.isEmpty()) {
                            return [2 /*return*/, res.status(400).json(err)];
                        }
                        refreshToken = req.body.token;
                        return [4 /*yield*/, user_service_1.userService.getIsTokenActive(refreshToken)];
                    case 1:
                        isTokenActive = _a.sent();
                        if (!isTokenActive)
                            return [2 /*return*/, res.sendStatus(403)];
                        jsonwebtoken_1.default.verify(refreshToken, "refresh_token", function (error, decoded) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, id, email, roles, user, authResponse, error_1;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (error)
                                            return [2 /*return*/, res.sendStatus(403)];
                                        _b.label = 1;
                                    case 1:
                                        _b.trys.push([1, 3, , 4]);
                                        _a = decoded, id = _a.id, email = _a.email, roles = _a.roles;
                                        user = { id: id, email: email, roles: roles };
                                        return [4 /*yield*/, user_service_1.userService.generateAuthResponse(user)];
                                    case 2:
                                        authResponse = _b.sent();
                                        return [2 /*return*/, res.status(200).json(authResponse)];
                                    case 3:
                                        error_1 = _b.sent();
                                        console.log(error_1);
                                        res.sendStatus(403);
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        }); });
        this.logout = (0, catch_async_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!req.user)
                            return [2 /*return*/, res.sendStatus(401)];
                        userId = parseInt(req.user.id);
                        return [4 /*yield*/, user_service_1.userService.logoutUser(userId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, res.sendStatus(200)];
                }
            });
        }); });
    }
    return AuthController;
}());
var authController = new AuthController();
exports.authController = authController;
