"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const banco_1 = __importDefault(require("./banco"));
;
;
class Carrinho extends sequelize_1.Model {
}
class Users extends sequelize_1.Model {
}
//criando tabela usuarios
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
    }
}, {
    sequelize: banco_1.default,
    modelName: 'User',
    tableName: 'usuarios',
    timestamps: false
});
//tabela carrinho
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
        onDelete: "CASCADE",
    },
    peca: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: banco_1.default,
    modelName: 'Carrinho',
    tableName: 'carrinho',
    timestamps: false
});
banco_1.default.sync({ force: true })
    .then(() => console.log("usuário criado com sucesso!"))
    .catch((error) => console.log("Erro ao criar usuário: ", error));
exports.User = Users;
exports.default = Carrinho;
