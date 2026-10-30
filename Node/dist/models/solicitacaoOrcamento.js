"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const banco_1 = __importDefault(require("../config/banco"));
const budget_1 = require("../types/budget");
class SolicitacaoOrcamento extends sequelize_1.Model {
}
SolicitacaoOrcamento.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    usuarioId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "usuarios",
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    },
    orcamentoId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "orcamentos",
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
    },
    servicoId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "servicos",
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
    },
    nome: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: false
    },
    veiculo: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: true
    },
    placa: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true
    },
    chassi: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    },
    quilometragem: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 0
        }
    },
    descricao: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    urgencia: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    },
    foto: {
        type: sequelize_1.DataTypes.JSONB,
        allowNull: true
    },
    status: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
        defaultValue: "novo",
        validate: {
            isIn: [budget_1.ORCAMENTO_STATUS]
        }
    }
}, {
    sequelize: banco_1.default,
    modelName: "SolicitacaoOrcamento",
    tableName: "solicitacoes_orcamento",
    timestamps: true
});
exports.default = SolicitacaoOrcamento;
