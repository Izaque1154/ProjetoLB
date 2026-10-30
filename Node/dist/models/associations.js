"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const carrinho_1 = __importDefault(require("./carrinho"));
const usuario_1 = require("./usuario");
const orcamentos_1 = __importDefault(require("./orcamentos"));
const produtos_1 = require("./produtos");
const servicos_1 = __importDefault(require("./servicos"));
const carrinho_itens_1 = __importDefault(require("./carrinho_itens"));
const orcamentoItens_1 = __importDefault(require("./orcamentoItens"));
const solicitacaoOrcamento_1 = __importDefault(require("./solicitacaoOrcamento"));
// Solicitações de orçamento
solicitacaoOrcamento_1.default.belongsTo(usuario_1.User, {
    foreignKey: "usuarioId",
    as: "usuario"
});
usuario_1.User.hasMany(solicitacaoOrcamento_1.default, {
    foreignKey: "usuarioId",
    as: "solicitacoes"
});
solicitacaoOrcamento_1.default.belongsTo(servicos_1.default, {
    foreignKey: "servicoId",
    as: "servico"
});
servicos_1.default.hasMany(solicitacaoOrcamento_1.default, {
    foreignKey: "servicoId",
    as: "solicitacoes"
});
// Uma solicitação pode gerar no máximo um orçamento.
solicitacaoOrcamento_1.default.hasOne(orcamentos_1.default, {
    foreignKey: "solicitacaoId",
    as: "orcamento"
});
orcamentos_1.default.belongsTo(solicitacaoOrcamento_1.default, {
    foreignKey: "solicitacaoId",
    as: "solicitacao"
});
orcamentos_1.default.belongsTo(usuario_1.User, {
    foreignKey: "usuarioId",
    as: "usuario"
});
usuario_1.User.hasMany(orcamentos_1.default, {
    foreignKey: "usuarioId",
    as: "orcamentos"
});
//Carrinho
usuario_1.User.hasOne(carrinho_1.default, {
    foreignKey: 'idUser',
    as: 'carrinho'
});
carrinho_1.default.belongsTo(usuario_1.User, {
    foreignKey: "idUser",
    as: 'usuario'
});
carrinho_1.default.hasMany(carrinho_itens_1.default, {
    foreignKey: 'carrinhoId'
});
produtos_1.produtos.hasMany(carrinho_itens_1.default, {
    foreignKey: 'produtoId'
});
carrinho_itens_1.default.belongsTo(carrinho_1.default, {
    foreignKey: 'carrinhoId'
});
carrinho_itens_1.default.belongsTo(produtos_1.produtos, {
    foreignKey: 'produtoId'
});
//Oçamento Item
orcamentoItens_1.default.belongsTo(orcamentos_1.default, {
    foreignKey: 'orcamentoId',
    as: 'orcamento'
});
orcamentoItens_1.default.belongsTo(produtos_1.produtos, {
    foreignKey: 'produtoId',
    as: 'produto'
});
orcamentoItens_1.default.belongsTo(servicos_1.default, {
    foreignKey: 'servicoId',
    as: 'servico'
});
orcamentos_1.default.hasMany(orcamentoItens_1.default, {
    foreignKey: 'orcamentoId',
    as: 'itens'
});
produtos_1.produtos.hasMany(orcamentoItens_1.default, {
    foreignKey: 'produtoId'
});
servicos_1.default.hasMany(orcamentoItens_1.default, {
    foreignKey: 'servicoId'
});
