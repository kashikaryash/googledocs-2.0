import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import env from "./config/env.config";
import db from "./db/models";
import router from "./routes";
import cors from "cors";
import errorHandler from "./middleware/error-handler";

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(router);
app.use(errorHandler);
const port = 8080;

db.sequelize.sync();

export default app;