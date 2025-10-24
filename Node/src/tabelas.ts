import { Sequelize, DataTypes, Model, Optional }  from "sequelize";
import dotenv from "dotenv";
import express from "express";
import sequelize from "./banco"

//Criando o modelo
    //Interfaces
    interface UsuarioAtributos{
        id: number;
        nome: string;
        email: string;
        telefone: string;
        senha: string;
        token: string|null;
        expiracao: Date|null;
        verificado: boolean
    }
    interface CarrinhoUsuario{
        id: number;
        idUser: number;
        peca: string
    }

    interface CarrinhoUsuarioAtributos extends Optional<CarrinhoUsuario, "id">{};
    interface UsuarioCreationAtributos extends Optional<UsuarioAtributos, 'id'> {};

    class Carrinho extends Model<CarrinhoUsuario, CarrinhoUsuarioAtributos>
        implements CarrinhoUsuario{
            public id!: number;
            public idUser!: number;
            public peca!: string;
        }
    class Users extends Model<UsuarioAtributos, UsuarioCreationAtributos>
        implements UsuarioAtributos {
            public id!: number;
            public nome!: string;
            public email!: string;
            public telefone!: string;
            public senha!: string;
            public token!: string|null;
            public expiracao!: Date|null;
            public verificado!: boolean;
        }
    
    //criando tabela usuarios
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
            type:DataTypes.STRING,
            allowNull:false
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
        }
    }, 
    {
        sequelize,
        modelName: 'User',
        tableName: 'usuarios',
        timestamps: false
        }
    )         
    //tabela carrinho
    Carrinho.init({
        id:{
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
            onDelete: "CASCADE",

        },
        peca: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{
        sequelize,
        modelName: 'Carrinho',
        tableName: 'carrinho',
        timestamps: false
    })
    
    sequelize.sync({force:true})
        .then(() => console.log("usuário criado com sucesso!"))
        .catch((error) => console.log("Erro ao criar usuário: ", error))
    
export const User = Users
export default Carrinho
