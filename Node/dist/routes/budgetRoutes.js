"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const budgetControllers_1 = require("../controllers/budgetControllers");
const middlewareAuth_1 = __importDefault(require("../middlewares/middlewareAuth"));
const upload_1 = __importDefault(require("../middlewares/upload"));
const budgetSchemas_1 = require("../middlewares/validate/budgetSchemas");
const router = (0, express_1.Router)();
// Solicitações criadas e consultadas pelo cliente autenticado.
router.post("/solicitacoes", middlewareAuth_1.default.middleware, upload_1.default.array("fotos", 5), budgetSchemas_1.validarCriacaoSolicitacao, budgetControllers_1.criarSolicitacao);
router.get("/solicitacoes/minhas", middlewareAuth_1.default.middleware, budgetControllers_1.buscarMinhasSolicitacoes);
router.get("/solicitacoes/:id", middlewareAuth_1.default.middleware, budgetSchemas_1.validarIdParametro, budgetControllers_1.buscarMinhaSolicitacaoPorId);
// Solicitações recebidas no painel administrativo.
router.get("/admin/solicitacoes", middlewareAuth_1.default.middlewareAdmin, budgetControllers_1.buscarSolicitacoesAdmin);
router.get("/admin/solicitacoes/:id", middlewareAuth_1.default.middlewareAdmin, budgetSchemas_1.validarIdParametro, budgetControllers_1.buscarSolicitacaoAdminPorId);
router.patch("/admin/solicitacoes/:id/status", middlewareAuth_1.default.middlewareAdmin, budgetSchemas_1.validarIdParametro, budgetSchemas_1.validarAtualizacaoStatus, budgetControllers_1.atualizarStatusSolicitacao);
router.post("/admin/solicitacoes/:id/orcamento", middlewareAuth_1.default.middlewareAdmin, budgetSchemas_1.validarIdParametro, budgetSchemas_1.validarCriacaoOrcamento, budgetControllers_1.criarOrcamentoDaSolicitacao);
// Orçamentos verdadeiros, criados pela empresa a partir de uma solicitação.
router.get("/orcamentos/meus", middlewareAuth_1.default.middleware, budgetControllers_1.buscarMeusOrcamentos);
router.get("/orcamentos/:id", middlewareAuth_1.default.middleware, budgetSchemas_1.validarIdParametro, budgetControllers_1.buscarMeuOrcamentoPorId);
router.get("/admin/orcamentos", middlewareAuth_1.default.middlewareAdmin, budgetControllers_1.buscarOrcamentosAdmin);
router.get("/admin/orcamentos/:id", middlewareAuth_1.default.middlewareAdmin, budgetSchemas_1.validarIdParametro, budgetControllers_1.buscarOrcamentoAdminPorId);
router.patch("/admin/orcamentos/:id", middlewareAuth_1.default.middlewareAdmin, budgetSchemas_1.validarIdParametro, budgetSchemas_1.validarAtualizacaoOrcamento, budgetControllers_1.atualizarOrcamentoAdmin);
router.get("/admin/catalogo", middlewareAuth_1.default.middlewareAdmin, budgetControllers_1.buscarCatalogoAdmin);
router.get("/admin/orcamentos/solicitacao/:id", middlewareAuth_1.default.middlewareAdmin, budgetSchemas_1.validarIdParametro, budgetControllers_1.buscarOrcamentoPorSolicitacao);
// Endpoints antigos mantidos como aliases durante a transição do frontend.
router.post("/orcamento", middlewareAuth_1.default.middleware, upload_1.default.array("fotos", 5), budgetSchemas_1.validarCriacaoSolicitacao, budgetControllers_1.criarOrcamento);
router.post("/buscarOrcamentos", middlewareAuth_1.default.middlewareAdmin, budgetControllers_1.buscarOrcamentos);
router.post("/servico", middlewareAuth_1.default.middleware, budgetControllers_1.servico);
router.post("/buscarCilente", middlewareAuth_1.default.middlewareAdmin, budgetControllers_1.buscarCliente);
exports.default = router;
