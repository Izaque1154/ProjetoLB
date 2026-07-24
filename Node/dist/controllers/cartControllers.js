"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exibirProduto = exports.comprar = exports.excluir = exports.buscarCarrinho = exports.itemCarrinho = exports.carrinho = void 0;
//Dependências
const carrinho_1 = __importDefault(require("../models/carrinho"));
const produtos_1 = require("../models/produtos");
//Carrinho
const carrinho = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idUser = Number(req.user.id);
    const { peca } = req.body;
    if (!idUser || peca === undefined || peca === null) {
        return res.status(404).json({ erro: "token invalido" });
    }
    ;
    try {
        const resp = yield carrinho_1.default.findOne({ where: { idUser: idUser, peca: peca } });
        if (resp === null) {
            yield carrinho_1.default.create({
                idUser: idUser,
                peca: peca
            });
            return res.status(200).json({ res: "Item adicionado ao carrinho" });
        }
        return res.status(200).json({ res: "Item já existe no carrinho" });
    }
    catch (error) {
        return res.status(500).json({ erro: "Carrinho vazio" });
    }
    ;
});
exports.carrinho = carrinho;
//Função para consultar o carrinho
const itemCarrinho = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idUser = Number(req.user.id);
    const { peca } = req.body;
    if (!idUser || peca === undefined || peca === null) {
        return res.status(404).json({ erro: "token invalido" });
    }
    ;
    try {
        const resp = yield carrinho_1.default.findOne({ where: {
                idUser: idUser,
                peca: peca
            } });
        if (!resp) {
            return res.status(500).json({ erro: "Peça não encontrada" });
        }
        ;
        return res.status(200).json({ msg: "item já existe no carrinho" });
    }
    catch (error) {
        return res.status(400).json({ erro: "Carrinho vazio" });
    }
    ;
});
exports.itemCarrinho = itemCarrinho;
//Função para buscar item no carrinho
const buscarCarrinho = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idUser = Number(req.user.id);
    if (!idUser) {
        return res.status(404).json({ erro: "Token invalido" });
    }
    ;
    try {
        const resp = yield carrinho_1.default.findAll({ where: { idUser: idUser } });
        return res.status(200).json({ msg: resp });
    }
    catch (erro) {
        return res.status(400).json({ erro: "Nenhum item no carrinho" });
    }
    ;
});
exports.buscarCarrinho = buscarCarrinho;
//Excluir item no carrinho
const excluir = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idUser = Number(req.user.id);
    const { peca } = req.body;
    if (!idUser || idUser === null) {
        return res.status(404).json({ erro: "Token invalido" });
    }
    ;
    try {
        yield carrinho_1.default.destroy({ where: { peca: peca, idUser: idUser } });
        return res.status(200).json({ msg: "item apagado" });
    }
    catch (erro) {
        return res.status(400).json({ erro: "item não encontrado" });
    }
    ;
});
exports.excluir = excluir;
//Comprar item no carrinho
const comprar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idUser = Number(req.user.id);
    if (!idUser || idUser === null) {
        return res.status(404).json({ erro: "Token invalido" });
    }
    ;
    try {
        yield carrinho_1.default.destroy({ where: { idUser: idUser } });
        return res.status(200).json({ msg: "item apagado" });
    }
    catch (erro) {
        return res.status(400).json({ erro: "item não encontrado" });
    }
    ;
});
exports.comprar = comprar;
//exibir produtos 
const exibirProduto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listaProdutos = yield produtos_1.produtos.findAll();
        return res.status(200).json({ produtos: listaProdutos });
    }
    catch (erro) {
        return res.status(400).json({ erro });
    }
    ;
});
exports.exibirProduto = exibirProduto;
