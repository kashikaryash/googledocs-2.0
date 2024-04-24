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
exports.Role = void 0;
var sequelize_typescript_1 = require("sequelize-typescript");
var user_model_1 = require("./user.model");
var user_role_model_1 = require("./user-role.model");
var Role = function () {
    var _classDecorators = [(0, sequelize_typescript_1.Table)({ tableName: "role", underscored: true, timestamps: false })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _users_decorators;
    var _users_initializers = [];
    var _roleUsers_decorators;
    var _roleUsers_initializers = [];
    var Role = _classThis = /** @class */ (function (_super) {
        __extends(Role_1, _super);
        function Role_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.name = (__runInitializers(_this, _instanceExtraInitializers), __runInitializers(_this, _name_initializers, void 0));
            _this.users = __runInitializers(_this, _users_initializers, void 0);
            _this.roleUsers = __runInitializers(_this, _roleUsers_initializers, void 0);
            return _this;
        }
        return Role_1;
    }(sequelize_typescript_1.Model));
    __setFunctionName(_classThis, "Role");
    (function () {
        _name_decorators = [(0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM("ADMIN", "SUPERADMIN"))];
        _users_decorators = [(0, sequelize_typescript_1.BelongsToMany)(function () { return user_model_1.User; }, {
                through: function () { return user_role_model_1.UserRole; },
            })];
        _roleUsers_decorators = [(0, sequelize_typescript_1.HasMany)(function () { return user_role_model_1.UserRole; }, {
                onDelete: "CASCADE",
            })];
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } } }, _name_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _users_decorators, { kind: "field", name: "users", static: false, private: false, access: { has: function (obj) { return "users" in obj; }, get: function (obj) { return obj.users; }, set: function (obj, value) { obj.users = value; } } }, _users_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _roleUsers_decorators, { kind: "field", name: "roleUsers", static: false, private: false, access: { has: function (obj) { return "roleUsers" in obj; }, get: function (obj) { return obj.roleUsers; }, set: function (obj, value) { obj.roleUsers = value; } } }, _roleUsers_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        Role = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Role = _classThis;
}();
exports.Role = Role;
