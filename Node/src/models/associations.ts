import sequelize from "../config/banco";
import Carrinho from "./carrinho";
import { User } from "./usuario";
import Orcamento from "./orcamentos";
import { produtos } from "./produtos";
import Servico from "./servicos";
import CarrinhoItens from "./carrinho_itens"
import OrcamentoIten from "./orcamentoItens";

//Orçamento
Orcamento.belongsTo(User, {
    foreignKey: "usuarioId",
});
Orcamento.belongsTo(produtos, {
    foreignKey: "produtoId",
});
Orcamento.belongsTo(Servico, {
    foreignKey: "servicoId"
});

User.hasMany(Orcamento, {
    foreignKey: "usuarioId",
});
produtos.hasMany(Orcamento, {
    foreignKey: "produtoId",
});
Servico.hasMany(Orcamento, {
    foreignKey: "servicoId",
});

//Carrinho
User.hasOne(Carrinho, {
    foreignKey: 'idUser',
    as: 'carrinho'
});
Carrinho.belongsTo(User, {
    foreignKey: "idUser",
    as: 'usuario'
});

Carrinho.hasMany(CarrinhoItens, {
    foreignKey: 'carrinhoId'
});
produtos.hasMany(CarrinhoItens, {
    foreignKey: 'produtoId'
});

CarrinhoItens.belongsTo(Carrinho, {
    foreignKey: 'carrinhoId'
});
CarrinhoItens.belongsTo(produtos, {
    foreignKey: 'produtoId'
});

//Oçamento Item
OrcamentoIten.belongsTo(Orcamento, {
    foreignKey: 'orcamentoId'
});
OrcamentoIten.belongsTo(produtos, {
    foreignKey: 'produtoId'
});
OrcamentoIten.belongsTo(Servico, {
    foreignKey: 'servicoId'
});

Orcamento.hasMany(OrcamentoIten, {
    foreignKey: 'orcamentoId',
});
produtos.hasMany(OrcamentoIten, {
    foreignKey: 'produtoId'
});
Servico.hasMany(OrcamentoIten, {
    foreignKey: 'servicoId'
})

