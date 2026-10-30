import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/banco";
import { ORCAMENTO_STATUS, OrcamentoStatus } from "../types/budget";

export interface SolicitacaoOrcamentoAttributes {
    id: number;
    usuarioId: number;
    orcamentoId: number | null;
    servicoId: number | null;
    nome: string;
    veiculo: string | null;
    placa: string | null;
    chassi: string | null;
    quilometragem: number | null;
    descricao: string;
    urgencia: string | null;
    foto: string[] | null;
    status: OrcamentoStatus;
    createdAt?: Date;
    updatedAt?: Date;
}

type SolicitacaoOrcamentoCreationAttributes = Optional<
    SolicitacaoOrcamentoAttributes,
    | "id"
    | "orcamentoId"
    | "servicoId"
    | "placa"
    | "veiculo"
    | "chassi"
    | "quilometragem"
    | "urgencia"
    | "foto"
    | "status"
    | "createdAt"
    | "updatedAt"
>;

class SolicitacaoOrcamento
    extends Model<SolicitacaoOrcamentoAttributes, SolicitacaoOrcamentoCreationAttributes>
    implements SolicitacaoOrcamentoAttributes {
    public id!: number;
    public usuarioId!: number;
    public orcamentoId!: number | null;
    public servicoId!: number | null;
    public nome!: string;
    public veiculo!: string | null;
    public placa!: string | null;
    public chassi!: string | null;
    public quilometragem!: number | null;
    public descricao!: string;
    public urgencia!: string | null;
    public foto!: string[] | null;
    public status!: OrcamentoStatus;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

SolicitacaoOrcamento.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
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
    orcamentoId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "orcamentos",
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
    },
    servicoId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "servicos",
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
    },
    nome: {
        type: DataTypes.STRING(150),
        allowNull: false
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
        allowNull: true,
        validate: {
            min: 0
        }
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    urgencia: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    foto: {
        type: DataTypes.JSONB,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: "novo",
        validate: {
            isIn: [ORCAMENTO_STATUS]
        }
    }
}, {
    sequelize,
    modelName: "SolicitacaoOrcamento",
    tableName: "solicitacoes_orcamento",
    timestamps: true
});

export default SolicitacaoOrcamento;
