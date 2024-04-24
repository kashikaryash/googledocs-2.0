"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
// Your ElephantSQL connection URL
const DATABASE_URL = "postgres://euwsyyky:xsM1bFU3y780qVZ012FJ8OmBRIbW1UPK@kala.db.elephantsql.com/euwsyyky";
const sequelize = new sequelize_typescript_1.Sequelize(DATABASE_URL, {
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
