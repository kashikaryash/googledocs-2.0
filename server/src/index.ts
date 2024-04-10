import express,{ Express, Request, Response } from "express";

import dotenv from 'dotenv';
import env from "./config/env.config";
import db from "./db/models";

dotenv.config();

const app:Express = express();
app.use(express.json())
const port = env.PORT;

db.sequelize.sync();

app.get('/',(res:Response,req:Request) => {
    res.send('Express + TypeScript');
})
app.listen(port,() =>{
    console.log(`App is listening on port ${port}`);
})