"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const env_config_1 = __importDefault(require("./env.config"));
let sequelize;
if (env_config_1.default.NODE_ENV === "test" || env_config_1.default.NODE_ENV === "development") {
    sequelize = new sequelize_typescript_1.Sequelize({
        database: "gd",
        username: "postgres",
        password: "admin",
        host: "localhost",
        dialect: "postgres",
        logging: false,
    });
}
else {
    if (!env_config_1.default.DATABASE_URL) {
        throw new Error("DATABASE_URL is not defined in environment variables.");
    }
    sequelize = new sequelize_typescript_1.Sequelize(env_config_1.default.DATABASE_URL, {
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
        logging: false,
    });
}
exports.default = sequelize;
