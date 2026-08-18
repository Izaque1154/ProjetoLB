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
exports.criarOrcamento = void 0;
const orcamentos_1 = __importDefault(require("../models/orcamentos"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const criarOrcamento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { servicoId, nome, telefone, veiculo, descricao, urgencia, respostaAdmin, placa, chassi } = req.body;
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    let caminhoFoto = null;
    if (!req.body) {
        res.status(400).json({ message: "Dados do orçamento incompletos" });
        return;
    }
    try {
        if (req.file) {
            const foto = req.file;
            const nomeArquivo = `${Date.now()}_${foto.originalname}`;
            const caminho = path_1.default.join(__dirname, '../uploads/orcamentos/', nomeArquivo);
            caminhoFoto = caminho;
            console.log(caminhoFoto);
            yield promises_1.default.writeFile(caminhoFoto, foto.buffer);
        }
        ;
        const orcamento = yield orcamentos_1.default.create({
            usuarioId: id,
            servicoId: Number(servicoId),
            nome,
            telefone,
            veiculo,
            descricao,
            urgencia,
            status: "pendente",
            respostaAdmin,
            placa,
            chassi,
            foto: req.file ? caminhoFoto : null
        });
        res.status(201).json({ message: "Orçamento criado com sucesso", orcamento });
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao criar orçamento", error });
    }
});
exports.criarOrcamento = criarOrcamento;
