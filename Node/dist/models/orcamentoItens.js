"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const banco_1 = __importDefault(require("../config/banco"));
class OrcamentoIten extends sequelize_1.Model {
}
OrcamentoIten.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    orcamentoId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'orcamentos',
            key: 'id'
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    produtoId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'produtos',
            key: 'id'
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    servicoId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'servicos',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    quantidade: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    precoUnitario: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false
    },
    descricao: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: banco_1.default,
    modelName: 'OrcamentoIten',
    tableName: 'orçamentoItens',
    timestamps: true
});
exports.default = OrcamentoIten;
