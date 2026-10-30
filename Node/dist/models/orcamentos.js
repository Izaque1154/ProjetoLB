"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const banco_1 = __importDefault(require("../config/banco"));
class Orcamento extends sequelize_1.Model {
}
Orcamento.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    solicitacaoId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        unique: true,
        references: {
            model: "solicitacoes_orcamento",
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT"
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
        allowNull: true
    },
    respostaAdmin: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    valorTotal: {
        type: sequelize_1.DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    frete: {
        type: sequelize_1.DataTypes.DECIMAL(12, 2),
        allowNull: true,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    desconto: {
        type: sequelize_1.DataTypes.DECIMAL(12, 2),
        allowNull: true,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    prazoEntrega: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    garantia: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    }
}, {
    sequelize: banco_1.default,
    modelName: "Orcamento",
    tableName: "orcamentos",
    timestamps: true
});
exports.default = Orcamento;
