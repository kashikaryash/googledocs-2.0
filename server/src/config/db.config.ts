import { Sequelize } from "sequelize-typescript";

// Your ElephantSQL connection URL
const DATABASE_URL = "postgres://euwsyyky:xsM1bFU3y780qVZ012FJ8OmBRIbW1UPK@kala.db.elephantsql.com/euwsyyky";

const sequelize: Sequelize = new Sequelize(
  DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
    dialectModule: require('pg'),
  }
);

export default sequelize;
