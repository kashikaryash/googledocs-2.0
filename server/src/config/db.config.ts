import { Sequelize } from "sequelize-typescript";
import env from "./env.config";

let sequelize: Sequelize;

if (env.NODE_ENV === "test" || env.NODE_ENV === "development") {
  sequelize = new Sequelize({
    database:"gd",
    username:"postgres",
    password:"admin",
    host:"localhost",
    dialect:"postgres",
    logging:false,
  });
} else {
  if (!env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in environment variables.");
  }

  sequelize = new Sequelize(env.DATABASE_URL, {
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

export default sequelize;
