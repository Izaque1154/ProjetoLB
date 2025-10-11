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
const senha = process.env.SENHA_BANCO;
const url = process.env.DATABASE_URL;
//Conexão
const sequelize = new sequelize_1.Sequelize(url, "root", senha, {
    host: "localhost",
    dialect: "mysql",
    logging: false
});
sequelize.authenticate()
    .then(() => console.log("Conexão com o banco de dados bem-sucedida!"))
    .catch((error) => console.log("Erro ao conectar-se ao banco: ", error));
exports.default = sequelize;
