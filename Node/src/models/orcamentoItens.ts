import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/banco";

interface OrcamentoItensAttributes {
    id: number;
    orcamentoId: number;
    produtoId: number;
    servicoId: number;
    quantidade: number;
    precoUnitario: number;
    descricao: string;
}

interface OrcamentoItensCreationAttributes extends Optional<OrcamentoItensAttributes, 'id'> {}

class OrcamentoIten extends Model<OrcamentoItensAttributes, OrcamentoItensCreationAttributes>{
    public id!: number;
    public orcamentoId!: number;
    public produtoId!: number;
    public servicoId!: number;
    public quantidade!: number;
    public precoUnitario!: number;
    public descricao!: string;
}

OrcamentoIten.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    orcamentoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'orcamentos',
            key: 'id'
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    produtoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'produtos',
            key: 'id'
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    servicoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'servicos',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precoUnitario: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'OrcamentoIten',
    tableName: 'orçamentoItens',
    timestamps: true
})

export default OrcamentoIten

