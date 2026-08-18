"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const banco_1 = __importDefault(require("../config/banco"));
;
;
class CarrinhoItens extends sequelize_1.Model {
}
;
CarrinhoItens.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    carrinhoId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: "carrinho",
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
        unique: false
    },
    produtoId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: "produtos",
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
        unique: false
    },
    quantidade: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: false
    },
    precoUnitario: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false,
        unique: false
    }
}, {
    sequelize: banco_1.default,
    modelName: 'CarrinhoItens',
    tableName: 'carrinhoItens',
    timestamps: true
});
exports.default = CarrinhoItens;
