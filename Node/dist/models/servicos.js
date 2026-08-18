"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const banco_1 = __importDefault(require("../config/banco"));
class Servico extends sequelize_1.Model {
}
Servico.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    precoBase: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: true
    },
    ativo: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: banco_1.default,
    modelName: "Servico",
    tableName: "servicos",
    timestamps: true
});
exports.default = Servico;
