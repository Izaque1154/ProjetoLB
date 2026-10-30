import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/banco";
import { ORCAMENTO_STATUS, OrcamentoStatus } from "../types/budget";

export interface OrcamentoAttributes {
    id: number;
    solicitacaoId: number | null;
    usuarioId: number;
    veiculo: string | null;
    placa: string | null;
    chassi: string | null;
    quilometragem: number | null;
    respostaAdmin: string | null;
    frete: number | null;
    desconto: number | null;
    prazoEntrega: string | null;
    garantia: string | null;
    valorTotal: number | string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface OrcamentoCreationAttributes extends Optional<
    OrcamentoAttributes,
    "id" | 
    "respostaAdmin" | 
    "valorTotal" | 
    "frete" | 
    "desconto" | 
    "prazoEntrega" | 
    "garantia" | 
    "createdAt" | 
    "updatedAt" | 
    'solicitacaoId' | 
    "veiculo" |
    "placa" |
    "chassi" |
    "quilometragem" 
> {}

class Orcamento extends Model<OrcamentoAttributes, OrcamentoCreationAttributes> implements OrcamentoAttributes {
    public id!: number;
    public solicitacaoId!: number;
    public usuarioId!: number;
    public veiculo!: string | null;
    public placa!: string | null;
    public chassi!: string | null;
    public quilometragem!: number | null;
    public respostaAdmin!: string | null;
    public valorTotal!: number | string;
    public frete!: number | null;
    public desconto!: number | null;
    public prazoEntrega!: string | null;
    public garantia!: string | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Orcamento.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    solicitacaoId: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "usuarios",
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    },
    veiculo: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    placa: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    chassi: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    quilometragem: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    respostaAdmin: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    valorTotal: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    frete: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    desconto: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    prazoEntrega: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    garantia: {
        type: DataTypes.STRING(100),
        allowNull: true
    }
},{
    sequelize,
    modelName: "Orcamento",
    tableName: "orcamentos",
    timestamps: true
})

export default Orcamento;

