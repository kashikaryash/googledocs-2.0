"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_config_1 = require("../../config/db.config");
var document_user_model_1 = require("./document-user.model");
var document_model_1 = require("./document.model");
var refresh_token_model_1 = require("./refresh-token.model");
var role_model_1 = require("./role.model");
var user_role_model_1 = require("./user-role.model");
var user_model_1 = require("./user.model");
var sequelize_1 = require("sequelize");
db_config_1.default.addModels([
    user_model_1.User,
    refresh_token_model_1.RefreshToken,
    role_model_1.Role,
    user_role_model_1.UserRole,
    document_model_1.Document,
    document_user_model_1.DocumentUser,
]);
var db = {
    Sequelize: sequelize_1.default,
    sequelize: db_config_1.default,
    User: user_model_1.User,
    RefreshToken: refresh_token_model_1.RefreshToken,
    Role: role_model_1.Role,
    UserRole: user_role_model_1.UserRole,
    Document: document_model_1.Document,
    DocumentUser: document_user_model_1.DocumentUser,
};
exports.default = db;
