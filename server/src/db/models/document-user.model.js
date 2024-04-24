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
exports.DocumentUser = void 0;
var sequelize_typescript_1 = require("sequelize-typescript");
var user_model_1 = require("./user.model");
var document_model_1 = require("./document.model");
var DocumentUser = function () {
    var _classDecorators = [(0, sequelize_typescript_1.Table)({ tableName: "document_user", underscored: true })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _permission_decorators;
    var _permission_initializers = [];
    var _user_decorators;
    var _user_initializers = [];
    var _userId_decorators;
    var _userId_initializers = [];
    var _document_decorators;
    var _document_initializers = [];
    var _documentId_decorators;
    var _documentId_initializers = [];
    var DocumentUser = _classThis = /** @class */ (function (_super) {
        __extends(DocumentUser_1, _super);
        function DocumentUser_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.permission = (__runInitializers(_this, _instanceExtraInitializers), __runInitializers(_this, _permission_initializers, void 0));
            _this.user = __runInitializers(_this, _user_initializers, void 0);
            _this.userId = __runInitializers(_this, _userId_initializers, void 0);
            _this.document = __runInitializers(_this, _document_initializers, void 0);
            _this.documentId = __runInitializers(_this, _documentId_initializers, void 0);
            return _this;
        }
        return DocumentUser_1;
    }(sequelize_typescript_1.Model));
    __setFunctionName(_classThis, "DocumentUser");
    (function () {
        _permission_decorators = [(0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM("VIEW", "EDIT"))];
        _user_decorators = [(0, sequelize_typescript_1.BelongsTo)(function () { return user_model_1.User; })];
        _userId_decorators = [(0, sequelize_typescript_1.ForeignKey)(function () { return user_model_1.User; }), sequelize_typescript_1.PrimaryKey, sequelize_typescript_1.Column];
        _document_decorators = [(0, sequelize_typescript_1.BelongsTo)(function () { return document_model_1.Document; })];
        _documentId_decorators = [(0, sequelize_typescript_1.ForeignKey)(function () { return document_model_1.Document; }), sequelize_typescript_1.PrimaryKey, sequelize_typescript_1.Column];
        __esDecorate(null, null, _permission_decorators, { kind: "field", name: "permission", static: false, private: false, access: { has: function (obj) { return "permission" in obj; }, get: function (obj) { return obj.permission; }, set: function (obj, value) { obj.permission = value; } } }, _permission_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } } }, _user_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: function (obj) { return "userId" in obj; }, get: function (obj) { return obj.userId; }, set: function (obj, value) { obj.userId = value; } } }, _userId_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _document_decorators, { kind: "field", name: "document", static: false, private: false, access: { has: function (obj) { return "document" in obj; }, get: function (obj) { return obj.document; }, set: function (obj, value) { obj.document = value; } } }, _document_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _documentId_decorators, { kind: "field", name: "documentId", static: false, private: false, access: { has: function (obj) { return "documentId" in obj; }, get: function (obj) { return obj.documentId; }, set: function (obj, value) { obj.documentId = value; } } }, _documentId_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        DocumentUser = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DocumentUser = _classThis;
}();
exports.DocumentUser = DocumentUser;
