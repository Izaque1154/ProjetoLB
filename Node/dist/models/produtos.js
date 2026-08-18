"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.produtos = void 0;
const sequelize_1 = require("sequelize");
const banco_1 = __importDefault(require("../config/banco"));
class Produtos extends sequelize_1.Model {
}
Produtos.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false
    },
    titulo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    garantia: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    categoria: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    fabricante: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    codigo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    imagem: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    fichaTecnica: {
        type: sequelize_1.DataTypes.JSONB,
        allowNull: false
    },
    estoque: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    compatibilidade: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    caracteristica: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    descricao: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize: banco_1.default,
    modelName: "Produtos",
    tableName: "produtos",
    timestamps: true
});
exports.produtos = Produtos;
