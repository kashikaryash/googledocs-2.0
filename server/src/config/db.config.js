"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
// const env_config_1 = __importDefault(require("./env.config"));
// console.log("DATABASE_URL:", env_config_1.default.DATABASE_URL);

const sequelize = new sequelize_typescript_1.Sequelize("postgres://euwsyyky:xsM1bFU3y780qVZ012FJ8OmBRIbW1UPK@kala.db.elephantsql.com/euwsyyky", {
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

sequelize.authenticate()
    .then(() => console.log('Database connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

exports.default = sequelize;
