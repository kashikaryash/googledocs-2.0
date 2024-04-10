"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const env_config_1 = __importDefault(require("./config/env.config"));
const models_1 = __importDefault(require("./db/models"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = env_config_1.default.PORT;
models_1.default.sequelize.sync();
app.get('/', (res, req) => {
    res.send('Express + TypeScript');
});
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
