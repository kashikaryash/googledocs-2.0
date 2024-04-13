import { Sequelize } from "sequelize-typescript";
import env from './env.config';

const sequelize =
  env.NODE_ENV === "test" || env.NODE_ENV === "development"
    ? new Sequelize("gdc", "postgres", "yash", {
        host: env.DB_HOST,
        dialect: "postgres",
        logging: false,
        dialectModule: require('pg'),
      })
    : new Sequelize(env.DATABASE_URL, {
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

export default sequelize;
