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
exports.buscarOrcamentoPorSolicitacao = exports.buscarCliente = exports.servico = exports.buscarOrcamentos = exports.criarOrcamento = exports.buscarCatalogoAdmin = exports.atualizarOrcamentoAdmin = exports.buscarOrcamentoAdminPorId = exports.buscarOrcamentosAdmin = exports.buscarMeuOrcamentoPorId = exports.buscarMeusOrcamentos = exports.criarOrcamentoDaSolicitacao = exports.atualizarStatusSolicitacao = exports.buscarSolicitacaoAdminPorId = exports.buscarSolicitacoesAdmin = exports.buscarMinhaSolicitacaoPorId = exports.buscarMinhasSolicitacoes = exports.criarSolicitacao = void 0;
const crypto_1 = __importDefault(require("crypto"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const banco_1 = __importDefault(require("../config/banco"));
const orcamentos_1 = __importDefault(require("../models/orcamentos"));
const orcamentoItens_1 = __importDefault(require("../models/orcamentoItens"));
const produtos_1 = require("../models/produtos");
const servicos_1 = __importDefault(require("../models/servicos"));
const solicitacaoOrcamento_1 = __importDefault(require("../models/solicitacaoOrcamento"));
const usuario_1 = require("../models/usuario");
const DIRETORIO_FOTOS = path_1.default.resolve(process.cwd(), "uploads", "solicitacoes-orcamento");
const URL_FOTOS = "/uploads/solicitacoes-orcamento";
class ControllerError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
const obterUsuarioId = (req) => {
    var _a;
    if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
        throw new ControllerError(401, "Usuário não autenticado");
    }
    return req.user.id;
};
const obterIdParametro = (req) => Number(req.params.id);
const mensagemErro = (error) => (error instanceof Error ? error.message : "Erro desconhecido");
const responderErro = (res, error, mensagemPadrao) => {
    if (error instanceof ControllerError) {
        res.status(error.status).json({ message: error.message });
        return;
    }
    const nomeErro = typeof error === "object" && error !== null && "name" in error
        ? String(error.name)
        : "";
    if (nomeErro === "SequelizeUniqueConstraintError") {
        res.status(409).json({ message: "Já existe um orçamento para esta solicitação" });
        return;
    }
    if (nomeErro === "SequelizeForeignKeyConstraintError" ||
        nomeErro === "SequelizeValidationError") {
        res.status(400).json({ message: "Dados relacionados inválidos", error: mensagemErro(error) });
        return;
    }
    console.error(mensagemPadrao, error);
    res.status(500).json({ message: mensagemPadrao });
};
const salvarFoto = (fotos) => __awaiter(void 0, void 0, void 0, function* () {
    if (!fotos) {
        return null;
    }
    const fotoCaminho = [];
    for (const foto of fotos) {
        yield promises_1.default.mkdir(DIRETORIO_FOTOS, { recursive: true });
        const extensao = path_1.default.extname(foto.originalname).toLowerCase();
        const nomeArquivo = `${Date.now()}_${crypto_1.default.randomUUID()}${extensao}`;
        const caminhoArquivo = path_1.default.join(DIRETORIO_FOTOS, nomeArquivo);
        yield promises_1.default.writeFile(caminhoArquivo, foto.buffer);
        fotoCaminho.push(`${URL_FOTOS}/${nomeArquivo}`);
    }
    return fotoCaminho;
});
const removerFoto = (caminhoPublico) => __awaiter(void 0, void 0, void 0, function* () {
    if (!caminhoPublico) {
        return;
    }
    const nomeArquivo = path_1.default.basename(caminhoPublico);
    yield promises_1.default.unlink(path_1.default.join(DIRETORIO_FOTOS, nomeArquivo)).catch(() => undefined);
});
const incluirItens = () => [
    {
        model: produtos_1.produtos,
        as: "produto",
        required: false
    },
    {
        model: servicos_1.default,
        as: "servico",
        required: false
    }
];
const incluirSolicitacao = () => [
    {
        model: usuario_1.User,
        as: "usuario",
        attributes: ["id", "nome", "email", "telefone", "endereco"]
    },
    {
        model: servicos_1.default,
        as: "servico",
        required: false,
        attributes: ["id", "nome", "descricao", "precoBase", "ativo"]
    },
    {
        model: orcamentos_1.default,
        as: "orcamento",
        required: false,
        include: [
            {
                model: orcamentoItens_1.default,
                as: "itens",
                include: incluirItens()
            }
        ]
    }
];
const incluirOrcamento = () => [
    {
        model: solicitacaoOrcamento_1.default,
        as: "solicitacao",
        include: [
            {
                model: servicos_1.default,
                as: "servico",
                required: false,
                attributes: ["id", "nome", "descricao", "precoBase", "ativo"]
            }
        ]
    },
    {
        model: usuario_1.User,
        as: "usuario",
        attributes: ["id", "nome", "email", "telefone", "endereco"]
    },
    {
        model: orcamentoItens_1.default,
        as: "itens",
        include: incluirItens()
    }
];
const normalizarItem = (item) => {
    var _a, _b, _c, _d, _e, _f, _g;
    return ({
        produtoId: (_a = item.produtoId) !== null && _a !== void 0 ? _a : null,
        servicoId: (_b = item.servicoId) !== null && _b !== void 0 ? _b : null,
        quantidade: Number(item.quantidade),
        precoUnitario: Number(item.precoUnitario),
        descricao: (_c = item.descricao) !== null && _c !== void 0 ? _c : null,
        garantia: (_d = item.garantia) !== null && _d !== void 0 ? _d : null,
        prazoEntrega: (_e = item.prazoEntrega) !== null && _e !== void 0 ? _e : null,
        desconto: Number((_f = item.desconto) !== null && _f !== void 0 ? _f : 0),
        frete: Number((_g = item.frete) !== null && _g !== void 0 ? _g : 0)
    });
};
const calcularTotal = (itens) => {
    const total = itens.reduce((soma, item) => {
        var _a, _b;
        const subtotal = Number(item.quantidade) * Number(item.precoUnitario);
        return soma + subtotal - Number((_a = item.desconto) !== null && _a !== void 0 ? _a : 0) + Number((_b = item.frete) !== null && _b !== void 0 ? _b : 0);
    }, 0);
    return Number(total.toFixed(2));
};
const buscarOrcamentoCompleto = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (orcamentos_1.default.findByPk(id, { include: incluirOrcamento() }));
});
// Cliente cria uma solicitação; o orçamento verdadeiro só será criado pelo admin.
const criarSolicitacao = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    console.log("verificando se o codigo chega aqui");
    let fotos = null;
    try {
        const usuarioId = obterUsuarioId(req);
        fotos = yield salvarFoto(req.files);
        const solicitacao = yield solicitacaoOrcamento_1.default.create({
            usuarioId,
            servicoId: (_a = req.body.servicoId) !== null && _a !== void 0 ? _a : null,
            nome: req.body.nome,
            veiculo: req.body.veiculo,
            placa: (_b = req.body.placa) !== null && _b !== void 0 ? _b : null,
            chassi: (_c = req.body.chassi) !== null && _c !== void 0 ? _c : null,
            quilometragem: (_d = req.body.quilometragem) !== null && _d !== void 0 ? _d : null,
            descricao: req.body.descricao,
            urgencia: (_e = req.body.urgencia) !== null && _e !== void 0 ? _e : null,
            foto: fotos,
            status: "novo"
        });
        res.status(201).json({ solicitacao });
    }
    catch (error) {
        if (!fotos) {
            responderErro(res, error, "Erro ao criar solicitação de orçamento");
            return;
        }
        for (const foto of fotos) {
            yield removerFoto(foto);
            responderErro(res, error, "Erro ao criar solicitação de orçamento");
        }
    }
});
exports.criarSolicitacao = criarSolicitacao;
const buscarMinhasSolicitacoes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarioId = obterUsuarioId(req);
        const solicitacoes = yield solicitacaoOrcamento_1.default.findAll({
            where: { usuarioId },
            include: incluirSolicitacao(),
            order: [["createdAt", "DESC"]]
        });
        res.status(200).json({ solicitacoes });
    }
    catch (error) {
        responderErro(res, error, "Erro ao buscar suas solicitações");
    }
});
exports.buscarMinhasSolicitacoes = buscarMinhasSolicitacoes;
const buscarMinhaSolicitacaoPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarioId = obterUsuarioId(req);
        const solicitacao = yield solicitacaoOrcamento_1.default.findOne({
            where: { id: obterIdParametro(req), usuarioId },
            include: incluirSolicitacao()
        });
        if (!solicitacao) {
            throw new ControllerError(404, "Solicitação não encontrada");
        }
        res.status(200).json({ solicitacao });
    }
    catch (error) {
        responderErro(res, error, "Erro ao buscar solicitação");
    }
});
exports.buscarMinhaSolicitacaoPorId = buscarMinhaSolicitacaoPorId;
const buscarSolicitacoesAdmin = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const solicitacoes = yield solicitacaoOrcamento_1.default.findAll({
            include: incluirSolicitacao(),
            order: [["createdAt", "DESC"]]
        });
        res.status(200).json({ solicitacoes });
    }
    catch (error) {
        responderErro(res, error, "Erro ao buscar solicitações");
    }
});
exports.buscarSolicitacoesAdmin = buscarSolicitacoesAdmin;
const buscarSolicitacaoAdminPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const solicitacao = yield solicitacaoOrcamento_1.default.findByPk(obterIdParametro(req), {
            include: [{
                    model: usuario_1.User,
                    as: 'usuario',
                    attributes: ['email', 'telefone', 'endereco']
                },
                {
                    model: servicos_1.default,
                    as: 'servico',
                    attributes: ['id', 'nome']
                }]
        });
        if (!solicitacao) {
            throw new ControllerError(404, "Solicitação não encontrada");
        }
        console.log("Solicitação encontrada:", solicitacao);
        res.status(200).json({ solicitacao });
    }
    catch (error) {
        responderErro(res, error, "Erro ao buscar solicitação");
    }
});
exports.buscarSolicitacaoAdminPorId = buscarSolicitacaoAdminPorId;
const atualizarStatusSolicitacao = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const solicitacao = yield solicitacaoOrcamento_1.default.findByPk(obterIdParametro(req));
        if (!solicitacao) {
            throw new ControllerError(404, "Solicitação não encontrada");
        }
        yield solicitacao.update({ status: req.body.status });
        const atualizada = yield solicitacaoOrcamento_1.default.findByPk(solicitacao.id, {
            include: incluirSolicitacao()
        });
        res.status(200).json({ solicitacao: atualizada });
    }
    catch (error) {
        responderErro(res, error, "Erro ao atualizar status da solicitação");
    }
});
exports.atualizarStatusSolicitacao = atualizarStatusSolicitacao;
const criarOrcamentoDaSolicitacao = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const solicitacaoId = obterIdParametro(req);
        const itens = req.body.itens;
        const orcamentoId = yield banco_1.default.transaction((transaction) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            const solicitacao = yield solicitacaoOrcamento_1.default.findByPk(solicitacaoId, {
                transaction,
                lock: transaction.LOCK.UPDATE
            });
            if (!solicitacao) {
                throw new ControllerError(404, "Solicitação não encontrada");
            }
            const existente = yield orcamentos_1.default.findOne({
                where: { solicitacaoId },
                transaction
            });
            if (existente) {
                throw new ControllerError(409, "Esta solicitação já possui um orçamento");
            }
            const status = ((_a = req.body.status) !== null && _a !== void 0 ? _a : "em analise");
            const orcamento = yield orcamentos_1.default.create({
                solicitacaoId,
                usuarioId: solicitacao.usuarioId,
                respostaAdmin: (_b = req.body.respostaAdmin) !== null && _b !== void 0 ? _b : null,
                quilometragem: (_c = req.body.quilometragem) !== null && _c !== void 0 ? _c : null,
                veiculo: (_d = req.body.veiculo) !== null && _d !== void 0 ? _d : null,
                placa: (_e = req.body.placa) !== null && _e !== void 0 ? _e : null,
                chassi: (_f = req.body.chassi) !== null && _f !== void 0 ? _f : null,
                valorTotal: calcularTotal(itens)
            }, { transaction });
            if (itens.length > 0) {
                yield orcamentoItens_1.default.bulkCreate(itens.map((item) => (Object.assign({ orcamentoId: orcamento.id }, normalizarItem(item)))), { transaction });
            }
            yield solicitacao.update({ status }, { transaction });
            return orcamento.id;
        }));
        const orcamento = yield buscarOrcamentoCompleto(orcamentoId);
        res.status(201).json({ orcamento });
    }
    catch (error) {
        responderErro(res, error, "Erro ao criar orçamento");
    }
});
exports.criarOrcamentoDaSolicitacao = criarOrcamentoDaSolicitacao;
const buscarMeusOrcamentos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarioId = obterUsuarioId(req);
        const orcamentos = yield orcamentos_1.default.findAll({
            where: { usuarioId },
            include: incluirOrcamento(),
            order: [["createdAt", "DESC"]]
        });
        res.status(200).json({ orcamentos });
    }
    catch (error) {
        responderErro(res, error, "Erro ao buscar seus orçamentos");
    }
});
exports.buscarMeusOrcamentos = buscarMeusOrcamentos;
const buscarMeuOrcamentoPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarioId = obterUsuarioId(req);
        const orcamento = yield orcamentos_1.default.findOne({
            where: { id: obterIdParametro(req), usuarioId },
            include: incluirOrcamento()
        });
        if (!orcamento) {
            throw new ControllerError(404, "Orçamento não encontrado");
        }
        res.status(200).json({ orcamento });
    }
    catch (error) {
        responderErro(res, error, "Erro ao buscar orçamento");
    }
});
exports.buscarMeuOrcamentoPorId = buscarMeuOrcamentoPorId;
const buscarOrcamentosAdmin = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orcamentos = yield orcamentos_1.default.findAll({
            include: incluirOrcamento(),
            order: [["createdAt", "DESC"]]
        });
        res.status(200).json({ orcamentos });
    }
    catch (error) {
        responderErro(res, error, "Erro ao buscar orçamentos");
    }
});
exports.buscarOrcamentosAdmin = buscarOrcamentosAdmin;
const buscarOrcamentoAdminPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orcamento = yield buscarOrcamentoCompleto(obterIdParametro(req));
        if (!orcamento) {
            throw new ControllerError(404, "Orçamento não encontrado");
        }
        res.status(200).json({ orcamento });
    }
    catch (error) {
        responderErro(res, error, "Erro ao buscar orçamento");
    }
});
exports.buscarOrcamentoAdminPorId = buscarOrcamentoAdminPorId;
const atualizarOrcamentoAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = obterIdParametro(req);
        yield banco_1.default.transaction((transaction) => __awaiter(void 0, void 0, void 0, function* () {
            const orcamento = yield orcamentos_1.default.findByPk(id, {
                transaction,
                lock: transaction.LOCK.UPDATE
            });
            if (!orcamento) {
                throw new ControllerError(404, "Orçamento não encontrado");
            }
            const alteracoes = {};
            if (req.body.respostaAdmin !== undefined) {
                alteracoes.respostaAdmin = req.body.respostaAdmin;
            }
            if (req.body.validade !== undefined) {
                alteracoes.validade = req.body.validade;
            }
            if (req.body.itens !== undefined) {
                const itens = req.body.itens;
                yield orcamentoItens_1.default.destroy({ where: { orcamentoId: id }, transaction });
                if (itens.length > 0) {
                    yield orcamentoItens_1.default.bulkCreate(itens.map((item) => (Object.assign({ orcamentoId: id }, normalizarItem(item)))), { transaction });
                }
                alteracoes.valorTotal = calcularTotal(itens);
            }
            yield orcamento.update(alteracoes, { transaction });
        }));
        const orcamento = yield buscarOrcamentoCompleto(id);
        res.status(200).json({ orcamento });
    }
    catch (error) {
        responderErro(res, error, "Erro ao atualizar orçamento");
    }
});
exports.atualizarOrcamentoAdmin = atualizarOrcamentoAdmin;
const buscarCatalogoAdmin = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [produtos, servicos] = yield Promise.all([
            produtos_1.produtos.findAll({ order: [["titulo", "ASC"]] }),
            servicos_1.default.findAll({ where: { ativo: true }, order: [["nome", "ASC"]] })
        ]);
        res.status(200).json({ produtos, servicos });
    }
    catch (error) {
        responderErro(res, error, "Erro ao buscar catálogo");
    }
});
exports.buscarCatalogoAdmin = buscarCatalogoAdmin;
// Endpoints antigos preservados para não quebrar telas ainda não migradas.
exports.criarOrcamento = exports.criarSolicitacao;
exports.buscarOrcamentos = exports.buscarSolicitacoesAdmin;
const servico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const servicoEncontrado = yield servicos_1.default.findByPk(req.body.id);
        res.status(200).json({ servico: servicoEncontrado });
    }
    catch (error) {
        responderErro(res, error, "Erro ao buscar serviço");
    }
});
exports.servico = servico;
const buscarCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req.body) === null || _a === void 0 ? void 0 : _a.id;
        if (id === undefined || id === null) {
            throw new ControllerError(400, "ID do usuário não informado");
        }
        const usuario = yield usuario_1.User.findByPk(id, {
            attributes: ["id", "nome", "email", "telefone", "endereco"]
        });
        if (!usuario) {
            throw new ControllerError(404, "Usuário não encontrado");
        }
        res.status(200).json({ usuario });
    }
    catch (error) {
        responderErro(res, error, "Erro ao buscar usuário");
    }
});
exports.buscarCliente = buscarCliente;
//Faz a busca do orçamento pelo id da solicitação, caso exista, e retorna o orçamento encontrado.
const buscarOrcamentoPorSolicitacao = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSolicitacao = Number(req.params.id);
    console.log("ID da solicitação recebida:", idSolicitacao);
    try {
        const orcamento = yield orcamentos_1.default.findOne({
            where: { solicitacaoId: idSolicitacao },
            include: incluirOrcamento()
        });
        if (!orcamento) {
            throw new ControllerError(404, "Orçamento não encontrado para a solicitação informada");
        }
        res.status(200).json({ orcamento });
    }
    catch (error) {
        responderErro(res, error, "Erro ao buscar orçamento pela solicitação");
    }
});
exports.buscarOrcamentoPorSolicitacao = buscarOrcamentoPorSolicitacao;
