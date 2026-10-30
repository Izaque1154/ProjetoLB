"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarAtualizacaoOrcamento = exports.validarCriacaoOrcamento = exports.validarAtualizacaoStatus = exports.validarCriacaoSolicitacao = exports.validarIdParametro = exports.atualizarOrcamentoSchema = exports.criarOrcamentoSchema = exports.orcamentoItemSchema = exports.statusSchema = exports.criarSolicitacaoSchema = void 0;
const zod_1 = require("zod");
const budget_1 = require("../../types/budget");
const textoOpcional = (maximo) => zod_1.z.preprocess((valor) => typeof valor === "string" && valor.trim() === "" ? null : valor, zod_1.z.string().trim().max(maximo).nullable().optional());
const inteiroOpcional = zod_1.z.preprocess((valor) => valor === "" || valor === undefined || valor === null ? null : valor, zod_1.z.coerce.number().int().min(0).nullable().optional());
const servicoIdOpcional = zod_1.z.preprocess((valor) => valor === "" || valor === undefined || valor === null ? null : valor, zod_1.z.coerce.number().int().positive().nullable().optional());
const moeda = zod_1.z.coerce.number().finite().min(0).max(99999999.99);
exports.criarSolicitacaoSchema = zod_1.z.object({
    servicoId: servicoIdOpcional,
    nome: zod_1.z.string().trim().min(2).max(100),
    veiculo: zod_1.z.string().trim().min(2).max(150),
    placa: textoOpcional(20),
    chassi: textoOpcional(50),
    quilometragem: inteiroOpcional,
    descricao: zod_1.z.string().trim().min(5).max(5000),
    urgencia: textoOpcional(50)
});
exports.statusSchema = zod_1.z.object({
    status: zod_1.z.enum(budget_1.ORCAMENTO_STATUS)
});
exports.orcamentoItemSchema = zod_1.z.object({
    id: zod_1.z.coerce.number().int().positive().optional(),
    produtoId: zod_1.z.preprocess((valor) => valor === "" || valor === undefined || valor === null ? null : valor, zod_1.z.coerce.number().int().min(0).nullable().optional()),
    servicoId: servicoIdOpcional,
    quantidade: zod_1.z.coerce.number().int().positive().max(100000),
    precoUnitario: moeda,
    descricao: textoOpcional(1000),
    garantia: textoOpcional(100),
    prazoEntrega: textoOpcional(100),
    desconto: moeda.optional().default(0),
    frete: moeda.optional().default(0)
}).superRefine((item, contexto) => {
    if (item.produtoId === null || item.produtoId === undefined) {
        if (item.servicoId === null || item.servicoId === undefined) {
            contexto.addIssue({
                code: "custom",
                message: "Informe produtoId ou servicoId",
                path: ["produtoId"]
            });
        }
    }
    const subtotalComFrete = item.quantidade * item.precoUnitario + item.frete;
    if (item.desconto > subtotalComFrete) {
        contexto.addIssue({
            code: "custom",
            message: "O desconto não pode deixar o item com valor negativo",
            path: ["desconto"]
        });
    }
});
const validadeSchema = zod_1.z.preprocess((valor) => valor === "" || valor === undefined ? null : valor, zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use validade no formato YYYY-MM-DD").nullable().optional());
exports.criarOrcamentoSchema = zod_1.z.object({
    status: zod_1.z.enum(budget_1.ORCAMENTO_STATUS).optional(),
    respostaAdmin: textoOpcional(5000),
    validade: validadeSchema,
    itens: zod_1.z.array(exports.orcamentoItemSchema).max(500).optional().default([])
});
exports.atualizarOrcamentoSchema = zod_1.z.object({
    respostaAdmin: textoOpcional(5000),
    validade: validadeSchema,
    itens: zod_1.z.array(exports.orcamentoItemSchema).max(500).optional()
}).refine((dados) => dados.respostaAdmin !== undefined || dados.validade !== undefined || dados.itens !== undefined, { message: "Informe ao menos um campo para atualizar" });
const idParamSchema = zod_1.z.object({
    id: zod_1.z.coerce.number().int().positive()
});
const validarCorpo = (schema) => (req, res, next) => {
    const resultado = schema.safeParse(req.body);
    if (!resultado.success) {
        res.status(400).json({
            message: "Dados inválidos",
            detalhes: resultado.error.issues
        });
        return;
    }
    req.body = resultado.data;
    next();
};
const validarIdParametro = (req, res, next) => {
    const resultado = idParamSchema.safeParse(req.params);
    if (!resultado.success) {
        res.status(400).json({
            message: "ID inválido",
            detalhes: resultado.error.issues
        });
        return;
    }
    next();
};
exports.validarIdParametro = validarIdParametro;
exports.validarCriacaoSolicitacao = validarCorpo(exports.criarSolicitacaoSchema);
exports.validarAtualizacaoStatus = validarCorpo(exports.statusSchema);
exports.validarCriacaoOrcamento = validarCorpo(exports.criarOrcamentoSchema);
exports.validarAtualizacaoOrcamento = validarCorpo(exports.atualizarOrcamentoSchema);
