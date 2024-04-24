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
exports.userService = void 0;
var user_model_1 = require("../db/models/user.model");
var bcrypt_1 = require("bcrypt");
var jsonwebtoken_1 = require("jsonwebtoken");
var refresh_token_model_1 = require("../db/models/refresh-token.model");
var mail_service_1 = require("./mail.service");
var UserService = /** @class */ (function () {
    function UserService() {
        var _this = this;
        this.findUserByEmail = function (email) { return __awaiter(_this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.User.findOne({ where: { email: email } })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        }); };
        this.createUser = function (email, password) { return __awaiter(_this, void 0, void 0, function () {
            var salt, hashedPassword, verificationToken, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, bcrypt_1.genSalt)()];
                    case 1:
                        salt = _a.sent();
                        return [4 /*yield*/, (0, bcrypt_1.hash)(password, salt)];
                    case 2:
                        hashedPassword = _a.sent();
                        verificationToken = jsonwebtoken_1.default.sign({ email: email }, "verify_email");
                        return [4 /*yield*/, user_model_1.User.create({
                                email: email,
                                password: hashedPassword,
                                verificationToken: verificationToken,
                            })];
                    case 3:
                        user = _a.sent();
                        return [4 /*yield*/, this.sendVerificationEmail(user)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.sendVerificationEmail = function (user) { return __awaiter(_this, void 0, void 0, function () {
            var mail;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mail = {
                            from: "kashikaryash@gmail.com",
                            to: user.email,
                            subject: "Welcome to Google Docs",
                            text: "click the following link to verify your email : http://localhost:5173/user/verify-email/".concat(user.verificationToken),
                        };
                        return [4 /*yield*/, mail_service_1.mailservice.sendMail(mail)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.sendPasswordResetEmail = function (user) { return __awaiter(_this, void 0, void 0, function () {
            var mail;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mail = {
                            from: "kashikaryash@gmail.com",
                            to: user.email,
                            subject: "Reset your password!",
                            text: "http://localhost:5173/user/reset-email/".concat(user.passwordResetToken),
                        };
                        return [4 /*yield*/, mail_service_1.mailservice.sendMail(mail)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.checkPassword = function (user, password) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, bcrypt_1.compare)(password, user.password)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.getRequestUser = function (user) { return __awaiter(_this, void 0, void 0, function () {
            var userWithRoles, roles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(user instanceof user_model_1.User)) return [3 /*break*/, 2];
                        return [4 /*yield*/, user_model_1.User.scope("withRoles").findByPk(user.id)];
                    case 1:
                        userWithRoles = _a.sent();
                        roles = userWithRoles === null || userWithRoles === void 0 ? void 0 : userWithRoles.userRoles.map(function (userRole) { return userRole.role.name; });
                        return [2 /*return*/, {
                                id: user.id,
                                email: user.email,
                                roles: roles,
                            }];
                    case 2: return [2 /*return*/, user];
                }
            });
        }); };
        this.generateAuthResponse = function (user) { return __awaiter(_this, void 0, void 0, function () {
            var requestUser, accessToken, refreshToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRequestUser(user)];
                    case 1:
                        requestUser = _a.sent();
                        accessToken = jsonwebtoken_1.default.sign(requestUser, "access_token", {
                            expiresIn: "24h",
                        });
                        refreshToken = jsonwebtoken_1.default.sign(requestUser, "refresh_token", {
                            expiresIn: "24h",
                        });
                        return [4 /*yield*/, refresh_token_model_1.RefreshToken.destroy({
                                where: { userId: requestUser.id },
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, refresh_token_model_1.RefreshToken.create({ token: refreshToken, userId: requestUser.id })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, { accessToken: accessToken, refreshToken: refreshToken }];
                }
            });
        }); };
        this.getIsTokenActive = function (token) { return __awaiter(_this, void 0, void 0, function () {
            var refreshToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, refresh_token_model_1.RefreshToken.findOne({
                            where: { token: token },
                        })];
                    case 1:
                        refreshToken = _a.sent();
                        return [2 /*return*/, refreshToken != null];
                }
            });
        }); };
        this.logoutUser = function (userId) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, refresh_token_model_1.RefreshToken.destroy({
                            where: {
                                userId: userId,
                            },
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.findUserById = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.User.findByPk(id)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        }); };
        this.resetPassword = function (user) { return __awaiter(_this, void 0, void 0, function () {
            var passwordResetToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        passwordResetToken = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, "password_reset", {
                            expiresIn: "24h",
                        });
                        return [4 /*yield*/, user.update({ passwordResetToken: passwordResetToken })];
                    case 1:
                        _a.sent();
                        //send password reset email method should be called
                        return [4 /*yield*/, this.sendPasswordResetEmail(user)];
                    case 2:
                        //send password reset email method should be called
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.findUserByPasswordResetToken = function (email, passwordResetToken) { return __awaiter(_this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.User.findOne({
                            where: {
                                email: email,
                                passwordResetToken: passwordResetToken,
                            },
                        })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        }); };
        this.updatePassword = function (user, password) { return __awaiter(_this, void 0, void 0, function () {
            var salt, hashedPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, bcrypt_1.genSalt)()];
                    case 1:
                        salt = _a.sent();
                        return [4 /*yield*/, (0, bcrypt_1.hash)(password, salt)];
                    case 2:
                        hashedPassword = _a.sent();
                        return [4 /*yield*/, user.update({
                                password: hashedPassword,
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.findUserByVerificationToken = function (email, verificationToken) { return __awaiter(_this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.User.findOne({
                            where: {
                                email: email,
                                verificationToken: verificationToken,
                            },
                        })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        }); };
        this.updateIsVerified = function (user, isVerified) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user.update({
                            isVerified: isVerified,
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
    }
    return UserService;
}());
var userService = new UserService();
exports.userService = userService;
