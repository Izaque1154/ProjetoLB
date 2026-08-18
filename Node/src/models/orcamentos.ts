import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/banco";

interface OrcamentoAttributes {
    id: number;
    usuarioId: number;
    produtoId?: number | null;
    servicoId?: number | null;
    nome: string;
    telefone: string;
    veiculo: string;
    descricao: string;
    urgencia?: string;
    status: string;
    respostaAdmin?: string | null;
    placa?: string | null;
    chassi?: string | null ;
    foto?: string | null;
}

interface OrcamentoCreationAttributes extends Optional<OrcamentoAttributes, "id" | "produtoId" | "servicoId" | "respostaAdmin" | "foto"> {}

class Orcamento extends Model<OrcamentoAttributes, OrcamentoCreationAttributes> implements OrcamentoAttributes {
    public id!: number;
    public usuarioId!: number;
    public produtoId!: number | null;
    public servicoId!: number | null;
    public nome!: string;
    public telefone!: string;
    public veiculo!: string;
    public descricao!: string;
    public urgencia!: string;
    public status!: string;
    public respostaAdmin!: string | null;
    public placa!: string | null;
    public chassi!: string | null;
    public foto!: string | null;
}

Orcamento.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "usuarios",
            key: "id"
        }
    },
    produtoId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "produtos",
            key: "id"
        }
    },
    servicoId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "servicos",
            key: "id"
        }
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    veiculo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    urgencia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    respostaAdmin: {
        type: DataTypes.STRING,
        allowNull: true
    },
    placa: {
        type: DataTypes.STRING,
        allowNull: true
    },
    chassi: {
        type: DataTypes.STRING,
        allowNull: true
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    sequelize,
    modelName: "Orcamento",
    tableName: "orcamentos",
    timestamps: true
})

export default Orcamento;

