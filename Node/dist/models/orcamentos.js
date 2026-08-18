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
    usuarioId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "usuarios",
            key: "id"
        }
    },
    produtoId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "produtos",
            key: "id"
        }
    },
    servicoId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "servicos",
            key: "id"
        }
    },
    nome: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    veiculo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    urgencia: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    respostaAdmin: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    placa: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    chassi: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    foto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: banco_1.default,
    modelName: "Orcamento",
    tableName: "orcamentos",
    timestamps: true
});
exports.default = Orcamento;
