import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/banco';

interface ServicoAttributes {
    id: number;
    nome: string;
    descricao: string;
    precoBase: number | null;
    ativo: boolean;
    image: string;
}

interface ServicoCreationAttributes extends Optional<ServicoAttributes, "id" | "precoBase" | "ativo" | "image"> {}

class Servico extends Model<ServicoAttributes, ServicoCreationAttributes> implements ServicoAttributes {
    public id!: number;
    public nome!: string;
    public descricao!: string;
    public precoBase!: number | null;
    public ativo!: boolean;
    public image!: string;
}

Servico.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    precoBase: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
{
    sequelize,
    modelName: "Servico",
    tableName: "servicos",
    timestamps: true
})

export default Servico;
