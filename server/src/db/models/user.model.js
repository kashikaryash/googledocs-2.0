"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var sequelize_typescript_1 = require("sequelize-typescript");
var refresh_token_model_1 = require("./refresh-token.model");
var role_model_1 = require("./role.model");
var user_role_model_1 = require("./user-role.model");
var document_user_model_1 = require("./document-user.model");
var User = function () {
    var _classDecorators = [(0, sequelize_typescript_1.Scopes)(function () { return ({
            withRoles: {
                include: [
                    {
                        model: user_role_model_1.UserRole,
                        attributes: ["createdAt", "updatedAt"],
                        include: [role_model_1.Role],
                    },
                ],
            },
        }); }), (0, sequelize_typescript_1.Table)({ tableName: 'user', underscored: true })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _password_decorators;
    var _password_initializers = [];
    var _isVerified_decorators;
    var _isVerified_initializers = [];
    var _verificationToken_decorators;
    var _verificationToken_initializers = [];
    var _passwordResetToken_decorators;
    var _passwordResetToken_initializers = [];
    var _refreshTokens_decorators;
    var _refreshTokens_initializers = [];
    var _roles_decorators;
    var _roles_initializers = [];
    var _userRoles_decorators;
    var _userRoles_initializers = [];
    var _sharedDocuments_decorators;
    var _sharedDocuments_initializers = [];
    var User = _classThis = /** @class */ (function (_super) {
        __extends(User_1, _super);
        function User_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.email = (__runInitializers(_this, _instanceExtraInitializers), __runInitializers(_this, _email_initializers, void 0));
            _this.password = __runInitializers(_this, _password_initializers, void 0);
            _this.isVerified = __runInitializers(_this, _isVerified_initializers, void 0);
            _this.verificationToken = __runInitializers(_this, _verificationToken_initializers, void 0);
            _this.passwordResetToken = __runInitializers(_this, _passwordResetToken_initializers, void 0);
            _this.refreshTokens = __runInitializers(_this, _refreshTokens_initializers, (Array));
            _this.roles = __runInitializers(_this, _roles_initializers, void 0);
            _this.userRoles = __runInitializers(_this, _userRoles_initializers, void 0);
            _this.sharedDocuments = __runInitializers(_this, _sharedDocuments_initializers, void 0);
            return _this;
        }
        return User_1;
    }(sequelize_typescript_1.Model));
    __setFunctionName(_classThis, "User");
    (function () {
        _email_decorators = [(0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)];
        _password_decorators = [(0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)];
        _isVerified_decorators = [(0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN)];
        _verificationToken_decorators = [(0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)];
        _passwordResetToken_decorators = [(0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)];
        _refreshTokens_decorators = [(0, sequelize_typescript_1.HasMany)(function () { return refresh_token_model_1.RefreshToken; }, {
                onDelete: 'CASCADE'
            })];
        _roles_decorators = [(0, sequelize_typescript_1.BelongsToMany)(function () { return role_model_1.Role; }, {
                through: {
                    model: function () { return user_role_model_1.UserRole; },
                },
            })];
        _userRoles_decorators = [(0, sequelize_typescript_1.HasMany)(function () { return user_role_model_1.UserRole; }, {
                onDelete: "CASCADE",
            })];
        _sharedDocuments_decorators = [(0, sequelize_typescript_1.HasMany)(function () { return document_user_model_1.DocumentUser; }, {
                onDelete: "CASCADE",
            })];
        __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } } }, _email_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: function (obj) { return "password" in obj; }, get: function (obj) { return obj.password; }, set: function (obj, value) { obj.password = value; } } }, _password_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _isVerified_decorators, { kind: "field", name: "isVerified", static: false, private: false, access: { has: function (obj) { return "isVerified" in obj; }, get: function (obj) { return obj.isVerified; }, set: function (obj, value) { obj.isVerified = value; } } }, _isVerified_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _verificationToken_decorators, { kind: "field", name: "verificationToken", static: false, private: false, access: { has: function (obj) { return "verificationToken" in obj; }, get: function (obj) { return obj.verificationToken; }, set: function (obj, value) { obj.verificationToken = value; } } }, _verificationToken_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _passwordResetToken_decorators, { kind: "field", name: "passwordResetToken", static: false, private: false, access: { has: function (obj) { return "passwordResetToken" in obj; }, get: function (obj) { return obj.passwordResetToken; }, set: function (obj, value) { obj.passwordResetToken = value; } } }, _passwordResetToken_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _refreshTokens_decorators, { kind: "field", name: "refreshTokens", static: false, private: false, access: { has: function (obj) { return "refreshTokens" in obj; }, get: function (obj) { return obj.refreshTokens; }, set: function (obj, value) { obj.refreshTokens = value; } } }, _refreshTokens_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _roles_decorators, { kind: "field", name: "roles", static: false, private: false, access: { has: function (obj) { return "roles" in obj; }, get: function (obj) { return obj.roles; }, set: function (obj, value) { obj.roles = value; } } }, _roles_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _userRoles_decorators, { kind: "field", name: "userRoles", static: false, private: false, access: { has: function (obj) { return "userRoles" in obj; }, get: function (obj) { return obj.userRoles; }, set: function (obj, value) { obj.userRoles = value; } } }, _userRoles_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _sharedDocuments_decorators, { kind: "field", name: "sharedDocuments", static: false, private: false, access: { has: function (obj) { return "sharedDocuments" in obj; }, get: function (obj) { return obj.sharedDocuments; }, set: function (obj, value) { obj.sharedDocuments = value; } } }, _sharedDocuments_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        User = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return User = _classThis;
}();
exports.User = User;
