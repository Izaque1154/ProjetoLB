"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const banco_1 = __importDefault(require("../config/banco"));
class Carrinho extends sequelize_1.Model {
}
Carrinho.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    idUser: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: "usuarios",
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    },
    peca: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: banco_1.default,
    modelName: "Carrinho",
    tableName: "carrinho",
    timestamps: false
});
exports.default = Carrinho;
