import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/banco";

interface CarrinhoItensAttributes{
    id: Number;
    carrinhoId: Number;
    produtoId: Number;
    quantidade: Number;
    precoUnitario: String;
};

interface CarrinhoItensCreationAttributes extends Optional<CarrinhoItensAttributes, "id"> {};

class CarrinhoItens extends Model<CarrinhoItensAttributes, CarrinhoItensCreationAttributes>{
    public id!: Number;
    public carrinhoId!: Number;
    public ProdutoId!: Number;
    public quantidade!: Number;
    public precoUnitario!: String;
};

CarrinhoItens.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    carrinhoId: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.INTEGER,
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
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false
    },
    precoUnitario: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        unique: false
    }
},{
    sequelize,
    modelName: 'CarrinhoItens',
    tableName: 'carrinhoItens',
    timestamps: true
});

export default CarrinhoItens;

