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
exports.UserRole = void 0;
var sequelize_typescript_1 = require("sequelize-typescript");
var user_model_1 = require("./user.model");
var role_model_1 = require("./role.model");
var UserRole = function () {
    var _classDecorators = [(0, sequelize_typescript_1.Table)({ tableName: "user_role", underscored: true })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _user_decorators;
    var _user_initializers = [];
    var _userId_decorators;
    var _userId_initializers = [];
    var _role_decorators;
    var _role_initializers = [];
    var _roleId_decorators;
    var _roleId_initializers = [];
    var UserRole = _classThis = /** @class */ (function (_super) {
        __extends(UserRole_1, _super);
        function UserRole_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.user = (__runInitializers(_this, _instanceExtraInitializers), __runInitializers(_this, _user_initializers, void 0));
            _this.userId = __runInitializers(_this, _userId_initializers, void 0);
            _this.role = __runInitializers(_this, _role_initializers, void 0);
            _this.roleId = __runInitializers(_this, _roleId_initializers, void 0);
            return _this;
        }
        return UserRole_1;
    }(sequelize_typescript_1.Model));
    __setFunctionName(_classThis, "UserRole");
    (function () {
        _user_decorators = [(0, sequelize_typescript_1.BelongsTo)(function () { return user_model_1.User; })];
        _userId_decorators = [(0, sequelize_typescript_1.ForeignKey)(function () { return user_model_1.User; }), sequelize_typescript_1.PrimaryKey, sequelize_typescript_1.Column];
        _role_decorators = [(0, sequelize_typescript_1.BelongsTo)(function () { return role_model_1.Role; })];
        _roleId_decorators = [(0, sequelize_typescript_1.ForeignKey)(function () { return role_model_1.Role; }), sequelize_typescript_1.PrimaryKey, sequelize_typescript_1.Column];
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } } }, _user_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: function (obj) { return "userId" in obj; }, get: function (obj) { return obj.userId; }, set: function (obj, value) { obj.userId = value; } } }, _userId_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: function (obj) { return "role" in obj; }, get: function (obj) { return obj.role; }, set: function (obj, value) { obj.role = value; } } }, _role_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _roleId_decorators, { kind: "field", name: "roleId", static: false, private: false, access: { has: function (obj) { return "roleId" in obj; }, get: function (obj) { return obj.roleId; }, set: function (obj, value) { obj.roleId = value; } } }, _roleId_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        UserRole = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UserRole = _classThis;
}();
exports.UserRole = UserRole;
