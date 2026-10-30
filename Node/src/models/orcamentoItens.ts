import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/banco";

export interface OrcamentoItensAttributes {
    id: number;
    orcamentoId: number;
    produtoId: number | null;
    servicoId: number | null;
    quantidade: number;
    precoUnitario: number | string;
    descricao: string | null;
}

interface OrcamentoItensCreationAttributes extends Optional<
    OrcamentoItensAttributes,
    "id" |
    "produtoId" |
    "servicoId" |
    "descricao" 
> {}

class OrcamentoIten extends Model<OrcamentoItensAttributes, OrcamentoItensCreationAttributes>
    implements OrcamentoItensAttributes {
    public id!: number;
    public orcamentoId!: number;
    public produtoId!: number | null;
    public servicoId!: number | null;
    public quantidade!: number;
    public precoUnitario!: number | string;
    public descricao!: string | null;
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
        onDelete: "SET NULL",
    },
    produtoId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'produtos',
            key: 'id'
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    servicoId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'servicos',
            key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
            isInt: true,
            min: 1
        }
    },
    precoUnitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
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

