import { DataTypes, Model } from "sequelize";
import sequelize from "../config/banco";
import {ProdutosAtributos, FichaTecnicaAtributos} from "../interfaces/interfaceCart"

class Produtos extends Model<ProdutosAtributos, ProdutosAtributos> implements ProdutosAtributos {
    public id!: number;
    public titulo!: string;
    public garantia!: string;
    public preco!: string;
    public categoria!: string | null;
    public fabricante!: string | null;
    public codigo!: string | null;
    public imagem!: string | null;
    public fichaTecnica!: FichaTecnicaAtributos;
    public estoque!: number;
    public compatibilidade!: string | null;
    public caracteristica!: string;
    public descricao!: string;
}

Produtos.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    garantia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fabricante: {
        type: DataTypes.STRING,
        allowNull: true
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    imagem: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fichaTecnica: {
        type: DataTypes.JSONB,
        allowNull: false
    },
    estoque: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    compatibilidade: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    caracteristica: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Produtos",
    tableName: "produtos",
    timestamps: false
});

export const produtos = Produtos;
