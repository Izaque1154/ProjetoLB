import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/banco";

interface CarrinhoUsuario {
    id: number;
    idUser: number;
    peca: number;
}

interface CarrinhoUsuarioAtributos extends Optional<CarrinhoUsuario, "id"> {}

class Carrinho extends Model<CarrinhoUsuario, CarrinhoUsuarioAtributos> implements CarrinhoUsuario {
    public id!: number;
    public idUser!: number;
    public peca!: number;
}

Carrinho.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    idUser: {
        type: DataTypes.INTEGER,
        references: {
            model: "usuarios",
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    },
    peca: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Carrinho",
    tableName: "carrinho",
    timestamps: false
});

export default Carrinho;
