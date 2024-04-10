"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const env_config_1 = __importDefault(require("./env.config"));
const sequelize = env_config_1.default.NODE_ENV === "test" || env_config_1.default.NODE_ENV === "development"
    ? new sequelize_typescript_1.Sequelize("mygd", "postgres", "yash", {
        host: env_config_1.default.DB_HOST,
        dialect: "postgres",
        logging: false,
        dialectModule: require('pg'),
    })
    : new sequelize_typescript_1.Sequelize(env_config_1.default.DATABASE_URL, {
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
        logging: false,
        dialectModule: require('pg'),
    });
exports.default = sequelize;
