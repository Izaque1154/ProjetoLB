"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//dependências
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
//Conexão com o banco de ados
//configurações
dotenv_1.default.config();
//Conexão
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_SENHA, {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    dialect: "postgres",
    protocol: "postgres",
    logging: false,
});
sequelize.authenticate()
    .then(() => console.log("Conexão com o banco de dados bem-sucedida!"))
    .catch((error) => console.log("Erro ao conectar-se ao banco: ", error));
exports.default = sequelize;
