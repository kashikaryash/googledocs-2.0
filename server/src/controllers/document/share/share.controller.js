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
exports.shareController = void 0;
var catch_async_1 = require("../../../middleware/catch-async");
var express_validator_1 = require("express-validator");
var document_model_1 = require("../../../db/models/document.model");
var user_model_1 = require("../../../db/models/user.model");
var document_user_model_1 = require("../../../db/models/document-user.model");
var mail_service_1 = require("../../../services/mail.service");
var ShareController = /** @class */ (function () {
    function ShareController() {
        var _this = this;
        this.create = (0, catch_async_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var err, id, document, _a, email, permission, sharedUser, documentUser, mail;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        err = (0, express_validator_1.validationResult)(req);
                        if (!err.isEmpty()) {
                            return [2 /*return*/, res.status(400).json(err)];
                        }
                        id = req.params.id;
                        return [4 /*yield*/, document_model_1.Document.findByPk(id)];
                    case 1:
                        document = _d.sent();
                        if (!document)
                            return [2 /*return*/, res.sendStatus(400)];
                        if (!((_b = req.user) === null || _b === void 0 ? void 0 : _b.id) || document.userId !== parseInt((_c = req.user) === null || _c === void 0 ? void 0 : _c.id)) {
                            return [2 /*return*/, res.sendStatus(400)];
                        }
                        _a = req.body, email = _a.email, permission = _a.permission;
                        return [4 /*yield*/, user_model_1.User.findOne({
                                where: {
                                    email: email,
                                },
                            })];
                    case 2:
                        sharedUser = _d.sent();
                        if (!sharedUser)
                            return [2 /*return*/, res.sendStatus(400)];
                        return [4 /*yield*/, document_user_model_1.DocumentUser.create({
                                documentId: id,
                                userId: sharedUser.id,
                                permission: permission,
                            })];
                    case 3:
                        documentUser = _d.sent();
                        mail = {
                            from: "kuluruvineeth8623@gmail.com",
                            to: sharedUser.email,
                            subject: "".concat(req.user.email, " shared a document with you!"),
                            text: "Click the following link to view and edit the document : http://localhost:3000/document/".concat(id),
                        };
                        //call mailservice to send email
                        return [4 /*yield*/, mail_service_1.mailservice.sendMail(mail)];
                    case 4:
                        //call mailservice to send email
                        _d.sent();
                        return [2 /*return*/, res.status(201).json(documentUser)];
                }
            });
        }); });
        this.delete = (0, catch_async_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var err, _a, documentId, userId, document, query, documentUser;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        err = (0, express_validator_1.validationResult)(req);
                        if (!err.isEmpty()) {
                            return [2 /*return*/, res.status(400).json(err)];
                        }
                        _a = req.params, documentId = _a.documentId, userId = _a.userId;
                        return [4 /*yield*/, document_model_1.Document.findOne({
                                where: {
                                    id: documentId,
                                    userId: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id,
                                },
                            })];
                    case 1:
                        document = _c.sent();
                        if (!document)
                            return [2 /*return*/, res.sendStatus(400)];
                        query = {
                            where: {
                                documentId: documentId,
                                userId: userId,
                            },
                        };
                        return [4 /*yield*/, document_user_model_1.DocumentUser.findOne(query)];
                    case 2:
                        documentUser = _c.sent();
                        if (!documentUser)
                            return [2 /*return*/, res.sendStatus(400)];
                        return [4 /*yield*/, document_user_model_1.DocumentUser.destroy(query)];
                    case 3:
                        _c.sent();
                        return [2 /*return*/, res.sendStatus(200)];
                }
            });
        }); });
    }
    return ShareController;
}());
var shareController = new ShareController();
exports.shareController = shareController;
