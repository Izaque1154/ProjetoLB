import { Router } from "express";
import {
    atualizarOrcamentoAdmin,
    atualizarStatusSolicitacao,
    buscarCatalogoAdmin,
    buscarCliente,
    buscarMeuOrcamentoPorId,
    buscarMinhaSolicitacaoPorId,
    buscarMeusOrcamentos,
    buscarMinhasSolicitacoes,
    buscarOrcamentoAdminPorId,
    buscarOrcamentos,
    buscarOrcamentosAdmin,
    buscarSolicitacaoAdminPorId,
    buscarSolicitacoesAdmin,
    criarOrcamento,
    criarOrcamentoDaSolicitacao,
    criarSolicitacao,
    buscarOrcamentoPorSolicitacao,
    servico
} from "../controllers/budgetControllers";
import middlewares from "../middlewares/middlewareAuth";
import upload from "../middlewares/upload";
import {
    validarAtualizacaoOrcamento,
    validarAtualizacaoStatus,
    validarCriacaoOrcamento,
    validarCriacaoSolicitacao,
    validarIdParametro
} from "../middlewares/validate/budgetSchemas";

const router = Router();

// Solicitações criadas e consultadas pelo cliente autenticado.
router.post(
    "/solicitacoes",
    middlewares.middleware,
    upload.array("fotos", 5),
    validarCriacaoSolicitacao,
    criarSolicitacao
);
router.get(
    "/solicitacoes/minhas",
    middlewares.middleware,
    buscarMinhasSolicitacoes
);
router.get(
    "/solicitacoes/:id",
    middlewares.middleware,
    validarIdParametro,
    buscarMinhaSolicitacaoPorId
);

// Solicitações recebidas no painel administrativo.
router.get(
    "/admin/solicitacoes",
    middlewares.middlewareAdmin,
    buscarSolicitacoesAdmin
);
router.get(
    "/admin/solicitacoes/:id",
    middlewares.middlewareAdmin,
    validarIdParametro,
    buscarSolicitacaoAdminPorId
);
router.patch(
    "/admin/solicitacoes/:id/status",
    middlewares.middlewareAdmin,
    validarIdParametro,
    validarAtualizacaoStatus,
    atualizarStatusSolicitacao
);
router.post(
    "/admin/solicitacoes/:id/orcamento",
    middlewares.middlewareAdmin,
    validarIdParametro,
    validarCriacaoOrcamento,
    criarOrcamentoDaSolicitacao
);

// Orçamentos verdadeiros, criados pela empresa a partir de uma solicitação.
router.get("/orcamentos/meus", middlewares.middleware, buscarMeusOrcamentos);
router.get(
    "/orcamentos/:id",
    middlewares.middleware,
    validarIdParametro,
    buscarMeuOrcamentoPorId
);
router.get(
    "/admin/orcamentos",
    middlewares.middlewareAdmin,
    buscarOrcamentosAdmin
);
router.get(
    "/admin/orcamentos/:id",
    middlewares.middlewareAdmin,
    validarIdParametro,
    buscarOrcamentoAdminPorId
);
router.patch(
    "/admin/orcamentos/:id",
    middlewares.middlewareAdmin,
    validarIdParametro,
    validarAtualizacaoOrcamento,
    atualizarOrcamentoAdmin
);
router.get(
    "/admin/catalogo", 
    middlewares.middlewareAdmin, 
    buscarCatalogoAdmin
);
router.get(
    "/admin/orcamentos/solicitacao/:id",
    middlewares.middlewareAdmin,
    validarIdParametro,
    buscarOrcamentoPorSolicitacao
);

// Endpoints antigos mantidos como aliases durante a transição do frontend.
router.post(
    "/orcamento",
    middlewares.middleware,
    upload.array("fotos", 5),
    validarCriacaoSolicitacao,
    criarOrcamento
);
router.post(
    "/buscarOrcamentos",
    middlewares.middlewareAdmin,
    buscarOrcamentos
);
router.post("/servico", middlewares.middleware, servico);
router.post("/buscarCilente", middlewares.middlewareAdmin, buscarCliente);

export default router;
