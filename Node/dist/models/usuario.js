"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const banco_1 = __importDefault(require("../config/banco"));
class Users extends sequelize_1.Model {
}
Users.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    nome: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    telefone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [10, 11]
        }
    },
    senha: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    expiracao: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    verificado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "usuario"
    }
}, {
    sequelize: banco_1.default,
    modelName: "User",
    tableName: "usuarios",
    timestamps: true
});
exports.User = Users;
