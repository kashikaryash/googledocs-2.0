"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
// Your ElephantSQL connection URL
const DATABASE_URL = "postgres://postgres.dowconoewklkcplajpzl:2vKuNQTo12TzaCezUAPyTIzHqf7xXNCo@aws-0-ap-south-1.pooler.supabase.com:5432/postgres";
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
