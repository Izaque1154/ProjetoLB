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
//Orçamento
orcamentos_1.default.belongsTo(usuario_1.User, {
    foreignKey: "usuarioId",
});
orcamentos_1.default.belongsTo(produtos_1.produtos, {
    foreignKey: "produtoId",
});
orcamentos_1.default.belongsTo(servicos_1.default, {
    foreignKey: "servicoId"
});
usuario_1.User.hasMany(orcamentos_1.default, {
    foreignKey: "usuarioId",
});
produtos_1.produtos.hasMany(orcamentos_1.default, {
    foreignKey: "produtoId",
});
servicos_1.default.hasMany(orcamentos_1.default, {
    foreignKey: "servicoId",
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
    foreignKey: 'orcamentoId'
});
orcamentoItens_1.default.belongsTo(produtos_1.produtos, {
    foreignKey: 'produtoId'
});
orcamentoItens_1.default.belongsTo(servicos_1.default, {
    foreignKey: 'servicoId'
});
orcamentos_1.default.hasMany(orcamentoItens_1.default, {
    foreignKey: 'orcamentoId',
});
produtos_1.produtos.hasMany(orcamentoItens_1.default, {
    foreignKey: 'produtoId'
});
servicos_1.default.hasMany(orcamentoItens_1.default, {
    foreignKey: 'servicoId'
});
