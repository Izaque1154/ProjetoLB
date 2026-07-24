import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/banco";

interface UsuarioAtributos {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    senha: string;
    token: string | null;
    expiracao: Date | null;
    verificado: boolean;
    role: string;
}

interface UsuarioCreationAtributos extends Optional<UsuarioAtributos, "token" | "expiracao" | "verificado" | "role" | "id"> {}

class Users extends Model<UsuarioAtributos, UsuarioCreationAtributos> implements UsuarioAtributos {
    public id!: number;
    public nome!: string;
    public email!: string;
    public telefone!: string;
    public senha!: string;
    public token!: string | null;
    public expiracao!: Date | null;
    public verificado!: boolean;
    public role!: string;
}

Users.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [10, 11]
        }
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    expiracao: {
        type: DataTypes.DATE,
        allowNull: true
    },
    verificado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "usuario"
    }
}, {
    sequelize,
    modelName: "User",
    tableName: "usuarios",
    timestamps: false
});

export const User = Users;
