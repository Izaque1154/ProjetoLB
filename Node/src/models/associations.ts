import sequelize from "../config/banco";
import Carrinho from "./carrinho";
import { User } from "./usuario";
import Orcamento from "./orcamentos";
import { produtos } from "./produtos";
import Servico from "./servicos";
import CarrinhoItens from "./carrinho_itens"
import OrcamentoIten from "./orcamentoItens";
import SolicitacaoOrcamento from "./solicitacaoOrcamento";

// Solicitações de orçamento
SolicitacaoOrcamento.belongsTo(User, {
    foreignKey: "usuarioId",
    as: "usuario"
});
User.hasMany(SolicitacaoOrcamento, {
    foreignKey: "usuarioId",
    as: "solicitacoes"
});
SolicitacaoOrcamento.belongsTo(Servico, {
    foreignKey: "servicoId",
    as: "servico"
});
Servico.hasMany(SolicitacaoOrcamento, {
    foreignKey: "servicoId",
    as: "solicitacoes"
});

// Uma solicitação pode gerar no máximo um orçamento.
SolicitacaoOrcamento.hasOne(Orcamento, {
    foreignKey: "solicitacaoId",
    as: "orcamento"
});
Orcamento.belongsTo(SolicitacaoOrcamento, {
    foreignKey: "solicitacaoId",
    as: "solicitacao"
});
Orcamento.belongsTo(User, {
    foreignKey: "usuarioId",
    as: "usuario"
});
User.hasMany(Orcamento, {
    foreignKey: "usuarioId",
    as: "orcamentos"
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
    foreignKey: 'orcamentoId',
    as: 'orcamento'
});
OrcamentoIten.belongsTo(produtos, {
    foreignKey: 'produtoId',
    as: 'produto'
});
OrcamentoIten.belongsTo(Servico, {
    foreignKey: 'servicoId',
    as: 'servico'
});

Orcamento.hasMany(OrcamentoIten, {
    foreignKey: 'orcamentoId',
    as: 'itens'
});
produtos.hasMany(OrcamentoIten, {
    foreignKey: 'produtoId'
});
Servico.hasMany(OrcamentoIten, {
    foreignKey: 'servicoId'
})

