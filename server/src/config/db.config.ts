import { Sequelize } from "sequelize-typescript";

// Your ElephantSQL connection URL
const DATABASE_URL = "postgres://postgres.kkfzuhkxgnogsucvjqhf:2vKuNQTo12TzaCezUAPyTIzHqf7xXNCo@aws-0-ap-south-1.pooler.supabase.com:5432/postgres";

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
